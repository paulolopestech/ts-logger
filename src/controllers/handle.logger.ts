import { WebSocketViewServer } from "../infra/config/http";
import { Logger } from "../services/logger";
import { Log, WsLogInput } from "../types";

export class HandleLogger {
   async  handleLoggerConnection(input: WsLogInput, logger: Logger) {
        const timestamp = new Date().getTime();
        const connectionPriority = 2;
        const connectionType = 'start';
        const log: Log = {
            connectionID: input.connectionID,
            applicationID: input.applicationID,
            message: input.message,
            priority: connectionPriority,
            type: connectionType,
            timestamp: timestamp,
        }
        const [response, error] = await logger.storeLogInDataBase(log);
        const message: string = JSON.stringify(log);
        WebSocketViewServer.sendMessageToAllClients(message);
        return [response, error];
    }
}