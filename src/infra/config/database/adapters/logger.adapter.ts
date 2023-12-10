import { LoggerRepository } from "../../../../repositories";
import { Log, LogsFilter } from "../../../../types";

export class LoggerAdapter implements LoggerRepository {
    insertLog(log: Log) {
        throw new Error("Method not implemented.");
    }
    getLogs(filter: LogsFilter | null): Log[] {
        throw new Error("Method not implemented.");
    }
}