import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useI18next } from 'services/i18n/framework/i18next-service';
import { I18nProvider } from 'services/i18n/framework';
import { LogProvider } from 'services/log/framework';
import { loadProductionLog } from 'services/log/framework/load-log-service';
import { Routing } from 'services/routing/framework';
import { AppError, errorHandler, resetHandler } from './app-error';

import './styles.css';

export function App() {
    const i18nService = useI18next();
    const logService = loadProductionLog();

    return (
        <LogProvider service={logService}>
            <I18nProvider service={i18nService}>
                <ErrorBoundary
                    FallbackComponent={AppError}
                    onError={errorHandler(logService)}
                    onReset={resetHandler(logService)}
                >
                    <BrowserRouter>
                        <Routing />
                    </BrowserRouter>
                </ErrorBoundary>
            </I18nProvider>
        </LogProvider>
    );
}

export default App;
