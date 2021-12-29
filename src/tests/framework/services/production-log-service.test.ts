import { loadProductionLog } from 'services/log/framework/load-log-service';

describe('loadProductionLog should', () => {
    let spyLog: jest.SpyInstance;
    let currentNodeEnv: string;
    beforeEach(() => {
        currentNodeEnv = process.env.NODE_ENV;
        spyLog = jest.spyOn(console, 'log');
        spyLog.mockImplementation(() => {});
    });
    afterEach(() => {
        spyLog.mockRestore();
        // @ts-ignore
        process.env.NODE_ENV = currentNodeEnv;
    });

    it('load fake log service when production', () => {
        // @ts-ignore
        process.env.NODE_ENV = 'production';
        const log = loadProductionLog();

        log.info('print test message');
        log.warn('print warn message');
        log.error('print error message');

        expect(log).not.toBeUndefined();
        expect(log).not.toBeUndefined();
        expect(spyLog).toHaveBeenCalledTimes(0);
    });

    it('load consoleLogService when test', () => {
        // @ts-ignore
        process.env.NODE_ENV = 'test';
        const log = loadProductionLog();

        log.info('print test message');
        log.warn('print warn message');
        log.error('print error message');

        expect(log).not.toBeUndefined();
        expect(spyLog).toHaveBeenCalledTimes(3);
        expect(spyLog).toHaveBeenNthCalledWith(
            1,
            'INFO',
            '"print test message"'
        );
        expect(spyLog).toHaveBeenNthCalledWith(
            2,
            'WARNING',
            '"print warn message"'
        );
        expect(spyLog).toHaveBeenNthCalledWith(
            3,
            'ERROR',
            '"print error message"'
        );
    });
});
