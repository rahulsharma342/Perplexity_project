import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";        // ✅ Redux se padhne ke liye
import { useAuth } from "../hook/useAuth";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { handleRegister } = useAuth();            // ✅ destructure kiya

  // ✅ Redux store se lo — local state hata diya
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleRegister(formData);  // error/loading sab useAuth handle karega
      navigate("/login");
    } catch (error) {
      // error Redux mein already set ho gaya — yahan kuch nahi karna
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-24 bottom-10 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-12 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />

      <section className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#262f4a] bg-[#0f1424]/80 shadow-2xl shadow-black/30 backdrop-blur lg:grid-cols-2">

        {/* ── Form Side ── */}
        <div className="order-2 bg-linear-to-br from-white/5 to-transparent p-6 sm:p-10 lg:order-1">

          {/* ✅ Redux error UI */}
          {error && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-[#cfd6ee]"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Choose a username"
                className="w-full rounded-xl border border-[#2b3555] bg-[#0a1020] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#cfd6ee]"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#2b3555] bg-[#0a1020] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#cfd6ee]"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a strong password"
                className="w-full rounded-xl border border-[#2b3555] bg-[#0a1020] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            {/* ✅ Redux loading button pe */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-linear-to-r from-cyan-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1424] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-[#9ca7c7]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#7d9bff] hover:text-[#a8bcff]"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {/* ── Info Side ── */}
        <div className="order-1 flex flex-col justify-between p-6 sm:p-10 lg:order-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9ca7c7]">
              Join Perplexity Project
            </p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Create your account in a few quick steps.
            </h1>
            <p className="mt-4 max-w-sm text-sm text-[#9ca7c7] sm:text-base">
              Username, email, password, and you are ready to start building and
              chatting faster.
            </p>
          </div>

          <div className="mt-10 hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-[#c7d0ea] lg:block">
            <p className="font-medium">One clean flow</p>
            <p className="mt-2 text-[#9ca7c7]">
              Designed to feel modern on desktop and polished on mobile.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;