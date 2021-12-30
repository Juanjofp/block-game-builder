import { LogService } from 'services/log/log-service';
import { buildSentryLogService } from './sentry-log-service';

export function buildProductionService(): LogService {
    return buildSentryLogService();
}
