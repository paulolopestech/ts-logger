import { LoggerRepository } from "../../../../src/repositories";
import { Log, LogsFilter } from "../../../../src/types";

export class MockLogger implements LoggerRepository {
    insertLog(log: Log): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
    getLogs(filter: LogsFilter | null): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
}