import { buildConsoleLogService } from './console-log-service';

export function loadProductionLog() {
    return process.env.NODE_ENV === 'production'
        ? undefined
        : buildConsoleLogService();
}
