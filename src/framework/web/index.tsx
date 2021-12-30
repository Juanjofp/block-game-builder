import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useI18next } from 'services/i18n/framework/i18next-service';
import { I18nProvider } from 'services/i18n/framework';
import { LogProvider } from 'services/log/framework';
import { loadProductionLog } from 'services/log/framework/load-log-service';
import { Routing } from 'services/routing/framework';
import { AppError, errorHandler, resetHandler } from './app-error';

import './styles.css';
import { LogService } from 'services/log/log-service';
import { I18nService } from 'services/i18n/i18n-service';

export type AppDependenciesProps = {
    children: React.ReactNode;
    logService: LogService;
    i18nService: I18nService;
    CustomError?: React.ComponentType<FallbackProps>;
};
export function AppDependencies({
    children,
    logService,
    i18nService,
    CustomError = AppError
}: AppDependenciesProps) {
    return (
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
    );
}

export function App() {
    const i18nService = useI18next();
    const logService = loadProductionLog();
    return (
        <AppDependencies logService={logService} i18nService={i18nService}>
            <BrowserRouter>
                <Routing />
            </BrowserRouter>
        </AppDependencies>
    );
}
export default App;
