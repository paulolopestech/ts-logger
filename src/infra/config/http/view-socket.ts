import * as WebSocket from 'ws';
import * as http from 'http';
import { v4 as uuidv4 } from 'uuid';

interface Client {
  id: string;
  ws: WebSocket;
}

class WebSocketViewServer {
  private server: http.Server;
  private wss: WebSocket.Server;
  static clients: Map<string, Client>;

  constructor() {
    this.server = http.createServer();
    this.wss = new WebSocket.Server({ server: this.server });
    WebSocketViewServer.clients = new Map();

    this.wss.on('connection', this.handleConnection.bind(this));
  }

  private handleConnection(ws: WebSocket) {
    const clientId = uuidv4();
    const client: Client = { id: clientId, ws };

    WebSocketViewServer.clients.set(clientId, client);

    console.log(`Cliente ${clientId} conectado`);

    ws.on('message', (message) => {
      console.log(`Cliente ${clientId} enviou mensagem: ${message}`);
      ws.send(`Você disse: ${message}`);
    });

    ws.on('close', () => {
      console.log(`Cliente ${clientId} desconectado`);
      WebSocketViewServer.clients.delete(clientId);
    });
  }

  static sendMessageToAllClients(message: string) {
    WebSocketViewServer.clients.forEach((client) => {
      if (client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(message);
      } else {
        console.log(`Cliente ${client.id} não está pronto para receber mensagens.`);
      }
    });
  }

  public start() {
    const PORT = process.env.VIEW_PORT || 3003;
    this.server.listen(PORT, () => {
      console.log(`Servidor WebSocket View está ouvindo na porta ${PORT}`);
    });
  }
}

export default WebSocketViewServer;
