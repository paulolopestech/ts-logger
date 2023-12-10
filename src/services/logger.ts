import { LoggerRepository } from "../repositories";
import { Log } from "../types";

export class Logger {
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
}