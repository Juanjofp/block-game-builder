import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { useI18next } from 'services/i18n/framework/i18next-service';
import { FallbackProps } from 'react-error-boundary';
import { AppError } from 'framework/web/app-error';
import { LogService } from 'services/log/log-service';
import { AppDependencies } from 'framework/web';
import { buildStore, ReduxPreloadState } from 'framework/store';

type MockLogService = LogService & {
    info: jest.Mock;
    warn: jest.Mock;
    error: jest.Mock;
};
const mockLogService: MockLogService = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
};

export function renderInsideApp(
    ui: React.ReactElement,
    {
        initialState = {},
        index = 0,
        history = ['/'],
        CustomError = AppError,
        ...rest
    }: {
        initialState?: ReduxPreloadState;
        index?: number;
        history?: string[];
        CustomError?: React.ComponentType<FallbackProps>;
    } = {}
) {
    const store = buildStore(initialState);
    function Wrapper(props: {}) {
        const i18nService = useI18next();

        return (
            <AppDependencies
                reduxStore={store}
                logService={mockLogService}
                i18nService={i18nService}
                CustomError={CustomError}
            >
                <MemoryRouter
                    initialIndex={index}
                    initialEntries={history}
                    {...props}
                />
            </AppDependencies>
        );
    }
    const queries = render(ui, { wrapper: Wrapper, ...rest });
    return {
        ...queries,
        mockLogService,
        store
    };
}

export const user = userEvent;
export * from '@testing-library/react';
