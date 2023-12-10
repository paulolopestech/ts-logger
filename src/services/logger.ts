import { LoggerRepository } from "../repositories";
import { Log, LogsFilter } from "../types";

export class LoggerService {
    loggerRepository: LoggerRepository;
    constructor(loggerRepository: LoggerRepository){
        this.loggerRepository = loggerRepository;
    }

    async storeLogInDataBase(log: Log) {
        try {
            const [response, error] = await this.loggerRepository.insertLog(log);
            return [response, error];
        } catch (e) {
            return [null, e];
        }
    }

    async getLogs(filter: LogsFilter, page?: number) {
        try {
            const [response, error] = await this.loggerRepository.getLogs(filter, page);
            return [response, error];
        } catch (e) {
            return [null, e];
        }
    }
}