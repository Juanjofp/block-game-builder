import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { useI18next } from 'services/i18n/framework/i18next-service';
import { I18nProvider } from 'services/i18n/framework';
import { LogProvider } from 'services/log/framework';
import { ErrorBoundary } from 'react-error-boundary';
import {
    AppError,
    errorHandler,
    resetHandler
} from '../framework/web/app-error';
import { LogService } from '../services/log/log-service';

type FakeLogService = LogService & {
    info: jest.Mock;
    warn: jest.Mock;
    error: jest.Mock;
};
const fakeLogService: FakeLogService = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
};

export function renderInsideApp(
    ui: React.ReactElement,
    {
        index = 0,
        history = ['/'],
        ...rest
    }: { index?: number; history?: string[] } = {}
) {
    function Wrapper(props: {}) {
        const i18nService = useI18next();
        return (
            <LogProvider service={fakeLogService}>
                <I18nProvider service={i18nService}>
                    <ErrorBoundary
                        FallbackComponent={AppError}
                        onError={errorHandler(fakeLogService)}
                        onReset={resetHandler(fakeLogService)}
                    >
                        <MemoryRouter
                            initialIndex={index}
                            initialEntries={history}
                            {...props}
                        />
                    </ErrorBoundary>
                </I18nProvider>
            </LogProvider>
        );
    }
    const queries = render(ui, { wrapper: Wrapper, ...rest });
    return {
        ...queries,
        fakeLogService
    };
}

export const user = userEvent;
export * from '@testing-library/react';
