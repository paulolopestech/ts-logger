import { Log, LogsFilter } from "../types";

export interface LoggerRepository {
    insertLog(log: Log): any;
    getLogs(filter: LogsFilter | null): Log[];
}