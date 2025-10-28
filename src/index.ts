import { WebSocketServer } from "ws";
import type WebSocket from "ws";

const wss = new WebSocketServer({ port: 8080 });


let allSockets: WebSocket[] = [];
wss.on("connection", (socket: WebSocket) => {
    allSockets.push(socket);
    socket.on("message", (message) => {
        console.log("Received:", message.toString());
        allSockets.forEach((socket)=>{socket.send(message.toString()+" from server")});

    });
    
})

console.log("WebSocket server is running on ws://localhost:8080");
