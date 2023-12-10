export function handleLogPriority(type: string): number {
    switch (type) {
        case 'connection':
            return 3;
        case 'disconnection':
            return 0;
        case 'exception':
            return 1;
        case 'warning':
            return 2;
        case 'info':
            return 3;
        default:
            return 3;
    }
}