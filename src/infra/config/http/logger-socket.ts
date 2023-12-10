import * as WebSocket from 'ws';
import * as http from 'http';
import { v4 as uuidv4 } from 'uuid';

interface Client {
  serverId: string;
  clientId?: string;
  ws: WebSocket;
}

class WebSocketLoggerServer {
  private server: http.Server;
  private wss: WebSocket.Server;
  private clients: Map<string, Client>;

  constructor(port: number) {
    this.server = http.createServer();
    this.wss = new WebSocket.Server({ server: this.server });
    this.clients = new Map();

    this.wss.on('connection', this.handleConnection.bind(this));
  }

  private generateServerId(): string {
    return uuidv4();
  }

  private handleConnection(ws: WebSocket, request: http.IncomingMessage) {
    const serverId = this.generateServerId();

    const clientIdFromUrl = request.url ? request.url.substring(1) : undefined;

    const clientId = clientIdFromUrl || uuidv4();

    const client: Client = { serverId, clientId, ws };

    this.clients.set(serverId, client);

    console.log(`Cliente ${clientId} conectado com ID do servidor ${serverId}`);

    ws.on('message', (message) => {
      console.log(`Cliente ${clientId} enviou mensagem: ${message}`);

      ws.send(`Você disse: ${message}`);
    });

    ws.on('close', () => {
      console.log(`Cliente ${clientId} com ID do servidor ${serverId} desconectado`);
      this.clients.delete(serverId);
    });
  }

  public sendMessageToAllClientInstances(clientId: string, message: string) {
    const client = this.clients.get(clientId);

    if (client && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(message);
    } else {
      console.log(`Cliente ${clientId} não encontrados ou não estão prontos para receber mensagens.`);
    }
  }

  public sendMessageToClient(serverId: string, message: string) {
    const client = this.clients.get(serverId);

    if (client && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(message);
    } else {
      console.log(`Cliente ${serverId} não encontrado ou não está pronto para receber mensagens.`);
    }
  }

  public start() {
    const PORT = process.env.PORT || 3000;
    this.server.listen(PORT, () => {
      console.log(`Servidor WebSocket está ouvindo na porta ${PORT}`);
    });
  }
}

export default WebSocketLoggerServer;
