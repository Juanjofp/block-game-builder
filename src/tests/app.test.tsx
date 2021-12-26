import React from 'react';
import { render, screen } from '@testing-library/react';
import App from 'framework/web';
import { buildConsoleLogService } from 'services/log/framework/console-log-service';

jest.mock('services/log/framework/console-log-service');
const fakeLogService = buildConsoleLogService as jest.Mock;

test('renders App without crash', async () => {
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
