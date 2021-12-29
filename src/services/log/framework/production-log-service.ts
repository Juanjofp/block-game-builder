import { LogService } from 'services/log/log-service';

export function buildProductionService(): LogService {
    return {
        info: () => undefined,
        warn: () => undefined,
        error: () => undefined
    };
}
