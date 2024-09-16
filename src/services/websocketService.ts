import WebSocket, { Server } from 'ws';

class WebSocketService {
    private wss: Server;
    private port: number;




    constructor(port: number = 8080) {
        this.port = port;
        this.wss = new WebSocket.Server({ port: this.port });
    }


    generateUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    start() {


    
        this.wss.on('connection', (ws: WebSocket) => {
            const socketId = this.generateUID();
            console.log(`Client connected. Client ID : ${socketId} `);
            ws.on('message', this.handleMessage.bind(this));
            ws.on('close', () => {
                console.log(`Client closed. Client ID : ${socketId}`)
            })
        });

        console.log(`WebSocket server is running on ws://localhost:${this.port}`);

    }

    private handleMessage(data: WebSocket.MessageEvent) {
        let message: string;
        if (data instanceof Buffer) {
            message = data.toString('utf-8'); // veya uygun encoding
        } else {
            message = data.toString(); // Varsayılan olarak string'e çevir
        }

        let parsedMessage;
        try {
            parsedMessage = JSON.parse(message);  // JSON formatındaysa parse edelim
        } catch (e) {
            parsedMessage = message;  // Değilse direkt string olarak kabul edelim
        }




        console.log('Received message:', parsedMessage);


        const messageObject = { type: 'text', content: parsedMessage };
        this.wss.clients.forEach((client: any) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(messageObject));
            }
        })
    }
}

export default WebSocketService;
