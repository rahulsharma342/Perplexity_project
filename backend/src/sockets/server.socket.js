import { Server } from 'socket.io';
// 👉 :contentReference[oaicite:0]{index=0} ka server part import

let io;
// 👉 global variable (poore project me same io use hoga)

export function initSocket(httpServer){
    // 👉 http server ko Socket.IO ke saath connect kar rahe ho

    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            // 👉 sirf frontend (React/Vite) ko allow kar rahe ho

            credentials: true
        }
    });

    console.log('Socket.io initialized');

    // 👉 jab bhi koi user connect kare
    io.on('connection', (socket) => {

        console.log('New client connected:', socket.id);
        // 👉 har user ka unique id hota hai

        // (yaha tu future me events add karega)
        // socket.on("send_message", ...) etc.
    });
}


// 👉 kahin bhi io use karna ho (controller etc.)
export function getIO(){
    if(!io){
        throw new Error('Socket.io not initialized');
        // 👉 agar initSocket call nahi hua to error
    }
    return io;
}