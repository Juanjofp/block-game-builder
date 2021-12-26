import { loadProductionLog } from '../../services/log/framework/production-log-service';

describe('loadProductionLog should', () => {
    it('load undefined when production', () => {
        // @ts-ignore
        process.env.NODE_ENV = 'production';
        expect(loadProductionLog()).toBeUndefined();
    });

    it('load consoleLogProvider when test', () => {
        // @ts-ignore
        process.env.NODE_ENV = 'test';
        expect(loadProductionLog()).not.toBeUndefined();
    });
});
