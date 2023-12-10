// import jest from 'jest';
import { MockLogger } from "./mocks/mock";
import { Logger } from "../../src/services/logger";
import { Log } from "../../src/types";

jest.mock('./mocks/mock.ts');
const MockRepository = MockLogger as jest.MockedClass<typeof MockLogger>;
const log: Log = {
    connectionID: '473407a6-868e-4fca-9b24-ff2d8851cda0',
    applicationID: '447d2363-87f8-4d6e-b032-39b0348996fe',
    message: 'connection',
    type: 'info',
    priority: 2,
    timestamp: 1702176060000
}

describe('Testing insert log in database', () => {
    test('Should return valid response if insert succeed', async () => {
        MockRepository.mockImplementationOnce(()=> ({
            insertLog: jest.fn().mockReturnValue([true, null]),
            getLogs: jest.fn().mockReturnValue([null, null])
        }))

        const logger = new Logger(new MockRepository);
        const response = await logger.storeLogInDataBase(log);
        expect(response[0]).toBe(true);
        expect(!response[1]).toBe(true);
    });
});
