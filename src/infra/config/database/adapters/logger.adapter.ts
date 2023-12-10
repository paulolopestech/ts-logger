import { LoggerRepository } from "../../../../repositories";
import { Log, LogsFilter } from "../../../../types";
import { LogsModel } from "../database"
export class LoggerAdapter implements LoggerRepository {
    async insertLog(log: Log) {
        try {
            const createdLog = await LogsModel.create(log);
            return [createdLog, null]
        } catch (error) {
            return [null, error]
        }
    }
    async getLogs(filter: LogsFilter | null) {
        try {
            const logs = await LogsModel.find({ filter });
            return [logs, null];
        } catch (error) {
            return [null, error];
        }
    }
}
