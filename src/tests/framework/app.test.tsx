import React from 'react';
import { render, screen } from 'test-utils';
import App from 'framework/web';
import { buildConsoleLogService } from 'services/log/framework/console-log-service';

jest.mock('services/log/framework/console-log-service');
const fakeLogService = buildConsoleLogService as jest.Mock;

describe('App should', () => {
    it('renders App without crash and call info', async () => {
        const info = jest.fn();
        fakeLogService.mockReturnValue({
            info
        });
        render(<App />);

        expect(await screen.findByTestId('app-container')).toBeInTheDocument();
        await screen.findByText('Block Builder Game');
        expect(info).toHaveBeenCalledTimes(1);
        expect(info).toHaveBeenNthCalledWith(1, 'App init');
    });

    it('Render App in main section by default', async () => {
        render(<App />);

        await screen.findByTestId('main-page-container');
    });
});
