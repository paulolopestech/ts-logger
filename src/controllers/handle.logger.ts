import { WebSocketViewServer } from "../infra/config/http";
import { LoggerService } from "../services";
import { Log, WsLogInput } from "../types";
import { handleLogPriority } from "../utils/handleLogPriority";

export class HandleLogger {
    logger: LoggerService
    constructor(logger: LoggerService) {
        this.logger = logger;
    }
    async handleLoggerMessage(input: WsLogInput) {
        const timestamp = new Date().getTime();
        const logPriority = handleLogPriority(input.type);
        const log: Log = {
            connectionID: input.connectionID,
            applicationID: input.applicationID,
            message: input.message,
            priority: logPriority,
            type: input.type,
            timestamp: timestamp,
        }
        const [response, error] = await this.logger.storeLogInDataBase(log);
        const message: string = JSON.stringify(log);
        WebSocketViewServer.sendMessageToAllClients(message);
        return [response, error];
    }
}