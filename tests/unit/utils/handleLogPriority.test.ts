import { handleLogPriority } from "../../../src/utils/handleLogPriority"

describe('Handle Log Priority Test', () => {
    test('Connection log should have priority 3', () => {
        const response = handleLogPriority('connection');
        expect(response).toBe(3);
    })

    test('Disonnection log should have priority 0', () => {
        const response = handleLogPriority('disconnection');
        expect(response).toBe(0);
    })

    test('Exception log should have priority 1', () => {
        const response = handleLogPriority('exception');
        expect(response).toBe(1);
    })

    test('Warning log should have priority 2', () => {
        const response = handleLogPriority('warning');
        expect(response).toBe(2);
    })

    test('Info log should have priority 2', () => {
        const response = handleLogPriority('info');
        expect(response).toBe(3);
    })

    test('Not Maped logs should have priority 3', () => {
        const response = handleLogPriority('other');
        expect(response).toBe(3);
    })
})