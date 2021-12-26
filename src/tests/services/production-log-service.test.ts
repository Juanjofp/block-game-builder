import { loadProductionLog } from '../../services/log/framework/production-log-service';

describe('loadProductionLog should', () => {
    let spyLog: jest.SpyInstance;
    beforeEach(() => {
        spyLog = jest.spyOn(console, 'log');
        spyLog.mockImplementation(() => {});
    });
    afterEach(() => {
        spyLog.mockRestore();
    });

    it('load undefined when production', () => {
        // @ts-ignore
        process.env.NODE_ENV = 'production';
        const log = loadProductionLog();

        expect(log).toBeUndefined();
    });

    it('load consoleLogService when test', () => {
        // @ts-ignore
        process.env.NODE_ENV = 'test';
        const log = loadProductionLog();

        log?.info('print test message');

        expect(log).not.toBeUndefined();
        expect(spyLog).toHaveBeenCalledTimes(1);
        expect(spyLog).toHaveBeenNthCalledWith(
            1,
            'INFO',
            '"print test message"'
        );
    });
});
