import { WebSocketServer } from "ws";
import type { WebSocket} from "ws";

const wss = new WebSocketServer({ port: 8080 });


interface User{
    roomId: string;
    socket: WebSocket;
}

let allSockets: User[] = [];
wss.on("connection", (socket: WebSocket) => {
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message.toString());

        if(parsedMessage.type === "join"){
            const {roomId} = parsedMessage;
            allSockets.push({ roomId, socket: socket });
            console.log(`A user joined room: ${roomId}`);
        }

        if (parsedMessage.type === "message") {
            const recipients = allSockets.filter(user => user.roomId === parsedMessage.roomId);
            recipients.forEach(user => {
                if(user.socket !== socket){
                    user.socket.send(JSON.stringify({
                        type: "message",
                        content: parsedMessage.text,
                        roomId: parsedMessage.roomId
                    }));
                }
            });

        }

    });
    
})

console.log("WebSocket server is running on ws://localhost:8080");
