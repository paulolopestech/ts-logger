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
        return [response, error];
    }
}