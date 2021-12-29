import { LogService } from 'services/log/log-service';
import { buildSentryLogService } from 'services/log/framework/sentry-log-service';

describe('SentryLogService', () => {
    let service: LogService;

    beforeEach(() => {
        service = buildSentryLogService();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
