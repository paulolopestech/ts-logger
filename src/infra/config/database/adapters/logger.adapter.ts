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
    async getLogs(filter: LogsFilter, page: number = 0): Promise<[Log[] | null, any]> {
        try {
            const pageSize = 50;
            const offset = page * pageSize;    
            const pipeline = [
                { $match: filter },
                { $project: { _id: 0, __v: 0 } },
                { $skip: offset },
                { $limit: pageSize }
            ];
            const logs = await LogsModel.aggregate(pipeline);
            return [logs, null];
        } catch (error) {
            return [null, error];
        }
    }
}
