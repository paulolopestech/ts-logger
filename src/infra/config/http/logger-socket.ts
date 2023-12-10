import * as WebSocket from 'ws';
import * as http from 'http';
import { generateUUID } from '../../../utils/generateUUID';

interface Client {
  connectionID: string;
  applicationID?: string;
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

  private handleConnection(ws: WebSocket, request: http.IncomingMessage) {
    const connectionID = generateUUID();

    const clientIdFromUrl = request.url ? request.url.substring(1) : undefined;

    const applicationID = clientIdFromUrl || generateUUID();

    const client: Client = { connectionID, applicationID, ws };

    this.clients.set(connectionID, client);

    console.log(`Cliente ${applicationID} conectado com ID de conexão ${connectionID}`);

    ws.on('message', (message) => {
      console.log(`Cliente ${applicationID} enviou mensagem: ${message}`);

      ws.send(`Você disse: ${message}`);
    });

    ws.on('close', () => {
      console.log(`Cliente ${applicationID} com ID do servidor ${connectionID} desconectado`);
      this.clients.delete(connectionID);
    });
  }

  public sendMessageToAllClientInstances(applicationID: string, message: string) {
    const client = this.clients.get(applicationID);

    if (client && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(message);
    } else {
      console.log(`Cliente ${applicationID} não encontrados ou não estão prontos para receber mensagens.`);
    }
  }

  public sendMessageToClient(connectionID: string, message: string) {
    const client = this.clients.get(connectionID);

    if (client && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(message);
    } else {
      console.log(`Cliente ${connectionID} não encontrado ou não está pronto para receber mensagens.`);
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
