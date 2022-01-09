import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Provider as ReduxProvider } from 'react-redux';

import { useI18next } from 'services/i18n/framework/i18next-service';
import { I18nProvider } from 'services/i18n/framework';
import { LogProvider } from 'services/log/framework';
import { loadProductionLog } from 'services/log/framework/load-log-service';
import { Routing } from 'services/routing/framework/web';
import { AppError, errorHandler, resetHandler } from './app-error';

import { LogService } from 'services/log/log-service';
import { I18nService } from 'services/i18n/i18n-service';
import { buildStore, ReduxStore } from 'framework/store';

import './styles.css';

export type AppDependenciesProps = {
    children: React.ReactNode;
    reduxStore: ReduxStore;
    logService: LogService;
    i18nService: I18nService;
    CustomError?: React.ComponentType<FallbackProps>;
};

export function AppDependencies({
    children,
    reduxStore,
    logService,
    i18nService,
    CustomError = AppError
}: AppDependenciesProps) {
    return (
        <ReduxProvider store={reduxStore}>
            <LogProvider service={logService}>
                <I18nProvider service={i18nService}>
                    <ErrorBoundary
                        FallbackComponent={CustomError}
                        onError={errorHandler(logService)}
                        onReset={resetHandler(logService)}
                    >
                        {children}
                    </ErrorBoundary>
                </I18nProvider>
            </LogProvider>
        </ReduxProvider>
    );
}

export function App() {
    const i18nService = useI18next();
    const logService = loadProductionLog();
    const store = buildStore({});
    return (
        <AppDependencies
            logService={logService}
            i18nService={i18nService}
            reduxStore={store}
        >
            <BrowserRouter>
                <Routing />
            </BrowserRouter>
        </AppDependencies>
    );
}
export default App;
