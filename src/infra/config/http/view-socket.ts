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
  private clients: Map<string, Client>;

  constructor(port: number) {
    this.server = http.createServer();
    this.wss = new WebSocket.Server({ server: this.server });
    this.clients = new Map();

    this.wss.on('connection', this.handleConnection.bind(this));
  }

  private handleConnection(ws: WebSocket) {
    const clientId = uuidv4();
    const client: Client = { id: clientId, ws };

    this.clients.set(clientId, client);

    console.log(`Cliente ${clientId} conectado`);

    ws.on('message', (message) => {
      console.log(`Cliente ${clientId} enviou mensagem: ${message}`);
      ws.send(`Você disse: ${message}`);
    });

    ws.on('close', () => {
      console.log(`Cliente ${clientId} desconectado`);
      this.clients.delete(clientId);
    });
  }

  public sendMessageToClient(clientId: string, message: string) {
    const client = this.clients.get(clientId);

    if (client && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(message);
    } else {
      console.log(`Cliente ${clientId} não encontrado ou não está pronto para receber mensagens.`);
    }
  }

  public start() {
    const PORT = process.env.PORT || 3000;
    this.server.listen(PORT, () => {
      console.log(`Servidor WebSocket está ouvindo na porta ${PORT}`);
    });
  }
}

export default WebSocketViewServer;
