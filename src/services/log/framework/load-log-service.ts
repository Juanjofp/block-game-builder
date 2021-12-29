import { buildConsoleLogService } from './console-log-service';
import { buildProductionService } from './production-log-service';

export function loadProductionLog() {
    return process.env.NODE_ENV === 'production'
        ? buildProductionService()
        : buildConsoleLogService();
}
