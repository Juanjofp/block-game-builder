import { LogService } from 'services/log/log-service';

function parseMessages(msg: string | {}) {
    return JSON.stringify(msg);
}
export function buildConsoleLogService(): LogService {
    return {
        info: (...args) => console.log('INFO', ...args.map(parseMessages)),
        warn: (...args) => console.log('WARNING', ...args.map(parseMessages)),
        error: (...args) => console.log('ERROR', ...args.map(parseMessages))
    };
}
