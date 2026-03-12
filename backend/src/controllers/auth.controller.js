import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
import { sendEmail } from "../services/mail.service.js";

const createAuthToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || "dev_secret_change_me",
    {
      expiresIn: "7d",
    },
  );
};

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if user already exists
    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or username already in use" });
    }
    // Create new user
    const newUser = await userModel.create({ username, email, password });

    // email verification token (optional, can be used for email verification flow)
    const emailVerificationToken = jwt.sign(
      { email: newUser.email },
      process.env.JWT_SECRET || "dev_secret_change_me",
      { expiresIn: "7d" },
    );

    // Send welcome email without blocking signup success.
    try {
      await sendEmail({
        to: newUser.email,
        subject: "Welcome to Our App",
        html: `<p>Hi ${newUser.username},</p>
      <p>Welcome to our app! We're glad to have you on board.</p>
      <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify your email</a>
      <p>Best regards,<br>The Team</p>`,
      });
    } catch (mailError) {
      console.error("Welcome email failed:", mailError.message);
    }

    return res
      .status(201)
      .json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.error("Error in register:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

async function verifyEmail(req, res) {
  try {
    const { token } = req.query;
    if (!token) {
      return res
        .status(400)
        .json({ message: "Verification token is required" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }
    user.verified = true;
    await user.save();
    const html = `
  <h1>Email Verified ✅</h1>
  <p>Thank you, ${user.username}!</p>
  <p>Your email has been successfully verified.</p>
  <a href="http://localhost:5173/login">Login Now</a>
`;
    return res.send(html);
  } catch (error) {
    console.error("Error in verifyEmail:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    // Find user by email
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (!user.verified) {
      return res.status(400).json({
        message: "Please verify your email first",
      });
    }
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Generate token
    const token = createAuthToken(user._id);
    // Set cookie
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export { register, login, verifyEmail };
