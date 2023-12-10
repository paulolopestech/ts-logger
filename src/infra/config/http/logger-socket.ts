import * as WebSocket from 'ws';
import * as http from 'http';
import { generateUUID } from '../../../utils/generateUUID';
import { LoggerService } from '../../../services/logger';
import { HandleLogger } from '../../../controllers/handle.logger';
import { WsLogInput } from '../../../types';

interface Client {
  connectionID: string;
  applicationID?: string;
  ws: WebSocket;
}

class WebSocketLoggerServer {
  private server: http.Server;
  private wss: WebSocket.Server;
  private clients: Map<string, Client>;
  static loggerService: LoggerService;

  constructor(loggerService: LoggerService) {
    this.server = http.createServer();
    this.wss = new WebSocket.Server({ server: this.server });
    this.clients = new Map();
    WebSocketLoggerServer.loggerService = loggerService;
    this.wss.on('connection', this.handleConnection.bind(this));
  }

  private handleConnection(ws: WebSocket, request: http.IncomingMessage) {
    const connectionID = generateUUID();

    const clientIdFromUrl = request.url ? request.url.substring(1) : undefined;

    const applicationID = clientIdFromUrl || generateUUID();

    const client: Client = { connectionID, applicationID, ws };

    this.clients.set(connectionID, client);

    console.log(`Cliente ${applicationID} conectado com ID de conexão ${connectionID}`);

    const handleInput: WsLogInput = {
      connectionID: connectionID,
      applicationID: applicationID,
      message: 'Application Connected',
      type: 'connection',
    }

    const handleLogger = new HandleLogger(WebSocketLoggerServer.loggerService);
    handleLogger.handleLoggerMessage(handleInput);

    ws.on('message', (data) => {
      try {
        console.log(`Message from ${applicationID} - ${connectionID}: ${data}`);
        const formatedData = JSON.parse(data.toString());
        const input: WsLogInput = {
          connectionID: connectionID,
          applicationID: applicationID,
          message: formatedData.message,
          type: formatedData.type,
        }
        handleLogger.handleLoggerMessage(input);
      } catch (e) {
        const input: WsLogInput = {
          connectionID: connectionID,
          applicationID: applicationID,
          message: `Received invalid data from client! - ${e}`,
          type: 'exception',
        }
        handleLogger.handleLoggerMessage(input);
      }
    });

    ws.on('close', () => {
      console.log(`Cliente ${applicationID} com ID do servidor ${connectionID} desconectado`);
      const input: WsLogInput = {
        connectionID: connectionID,
        applicationID: applicationID,
        message: 'Client connection is down!',
        type: 'disconnection',
      }
      handleLogger.handleLoggerMessage(input);
      this.clients.delete(connectionID);      
    });
  }

  public start() {
    const PORT = process.env.LOGGER_PORT || 3001;
    this.server.listen(PORT, () => {
      console.log(`WebSocket Logger Server Listening at port ${PORT}`);
    });
  }
}

export default WebSocketLoggerServer;
