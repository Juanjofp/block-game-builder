import React from 'react';
import { renderInsideApp, screen, user } from 'test-utils';
import { FallbackProps } from 'react-error-boundary';
import { useI18nService } from '../../services/i18n/framework';

describe('App should', () => {
    let spyLog: jest.SpyInstance;
    beforeEach(() => {
        spyLog = jest.spyOn(console, 'error');
        spyLog.mockImplementation(() => {});
    });
    afterEach(() => {
        spyLog.mockRestore();
    });

    function BoomView({ shouldFails = true }: { shouldFails: boolean }) {
        if (shouldFails) throw new Error('BooM');
        return <div>BoomView do not explode!</div>;
    }

    it('Render App catch an error and show the error page', async () => {
        const { mockLogService } = renderInsideApp(
            <BoomView shouldFails={true} />
        );

        await screen.findByTestId('app-error-container');
        expect(mockLogService.error).toHaveBeenCalledTimes(1);
        expect(mockLogService.error).toHaveBeenNthCalledWith(
            1,
            'Error',
            'BooM',
            expect.any(String)
        );

        user.click(await screen.findByTestId('app-error-reset-button'));

        expect(mockLogService.error).toHaveBeenCalledTimes(2);
        expect(mockLogService.info).toHaveBeenCalledTimes(1);
        expect(mockLogService.info).toHaveBeenNthCalledWith(1, 'Error', 'BooM');
    });

    async function prepareCustomErrorPage(error: unknown) {
        function CustomError({ resetErrorBoundary }: FallbackProps) {
            const { t } = useI18nService();
            return (
                <div data-testid={'app-error-container'}>
                    <div>{t('app_error_message')}</div>
                    <button
                        onClick={() => resetErrorBoundary(error)}
                        data-testid={'app-error-reset-button'}
                    >
                        {t('app_error_reset_button_text')}
                    </button>
                </div>
            );
        }

        const { mockLogService } = renderInsideApp(
            <BoomView shouldFails={true} />,
            { CustomError }
        );

        await screen.findByTestId('app-error-container');
        expect(mockLogService.error).toHaveBeenCalledTimes(1);
        expect(mockLogService.error).toHaveBeenNthCalledWith(
            1,
            'Error',
            'BooM',
            expect.any(String)
        );

        user.click(await screen.findByTestId('app-error-reset-button'));

        expect(mockLogService.error).toHaveBeenCalledTimes(2);
        expect(mockLogService.info).toHaveBeenCalledTimes(1);
        return mockLogService;
    }

    it('Render App catch an error and show a custom error page and no error', async () => {
        const mockLogService = await prepareCustomErrorPage(undefined);
        expect(mockLogService.info).toHaveBeenNthCalledWith(
            1,
            'Unknown error',
            undefined
        );
    });

    it('Render App catch an error and show a custom error page and custom error', async () => {
        const mockLogService = await prepareCustomErrorPage({
            error: 'Custom error'
        });

        expect(mockLogService.info).toHaveBeenNthCalledWith(
            1,
            'Unknown error',
            '{"error":"Custom error"}'
        );
    });
});
