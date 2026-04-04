import dotenv from "dotenv";
dotenv.config(); 
// 👉 .env file ka data load karta hai (PORT, DB URL etc.)

import app from "./src/app.js";
// 👉 Express app (routes, middleware yaha defined honge)

import connectDB from "./src/config/db.js";
// 👉 MongoDB connect karne ka function

import http from "http";
// 👉 Normal express ko socket ke saath use karne ke liye http server banana padta hai

import { initSocket } from "./src/sockets/server.socket.js";
// 👉 Yaha tu ne alag file me :contentReference[oaicite:0]{index=0} ka setup rakha hai (good practice 👍)


// 🔌 MongoDB connect
connectDB();
// 👉 Server start hone se pehle DB connect ho jayega


// 🌐 Express app ko http server me convert kiya
const httpServer = http.createServer(app);
// 👉 Ye important hai kyuki Socket.IO http server ke upar chalta hai


// ⚡ Socket.IO initialize
initSocket(httpServer);
// 👉 Ye function andar se `io` banayega aur events handle karega


// 📌 Port set
const PORT = process.env.PORT || 3000;


// 🚀 Server start
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});