import { Log, LogsFilter } from "../types";

export interface LoggerRepository {
    insertLog(log: Log): Promise<any[]>;
    getLogs(filter?: LogsFilter | null, page?: number): Promise<any[]>;
}