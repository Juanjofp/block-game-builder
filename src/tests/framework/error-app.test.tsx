import React from 'react';
import { renderInsideApp, screen, user } from 'test-utils';

describe('App should', () => {
    let spyLog: jest.SpyInstance;
    beforeEach(() => {
        spyLog = jest.spyOn(console, 'error');
        spyLog.mockImplementation(() => {});
    });
    afterEach(() => {
        spyLog.mockRestore();
    });

    it('Render App catch an error and show the error page', async () => {
        function BoomView({ shouldFails = true }: { shouldFails: boolean }) {
            if (shouldFails) throw new Error('BooM');
            return <div>BoomView do not explode!</div>;
        }

        const { fakeLogService } = renderInsideApp(
            <BoomView shouldFails={true} />
        );

        await screen.findByTestId('app-error-container');
        expect(fakeLogService.error).toHaveBeenCalledTimes(1);
        expect(fakeLogService.error).toHaveBeenNthCalledWith(
            1,
            'Error',
            'BooM',
            expect.any(String)
        );

        user.click(await screen.findByTestId('app-error-reset-button'));

        expect(fakeLogService.error).toHaveBeenCalledTimes(2);
        expect(fakeLogService.info).toHaveBeenCalledTimes(1);
        expect(fakeLogService.info).toHaveBeenNthCalledWith(1, 'Error', 'BooM');
    });
});
