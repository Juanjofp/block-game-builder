import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useI18next } from 'services/i18n/framework/i18next-service';
import { I18nProvider } from 'services/i18n/framework';
import { LogProvider } from '../../services/log/framework';
import { loadProductionLog } from '../../services/log/framework/production-log-service';
import { Routing } from 'services/routing/framework';
import './styles.css';

export function App() {
    const i18nService = useI18next();
    return (
        <LogProvider logService={loadProductionLog()}>
            <I18nProvider service={i18nService}>
                <BrowserRouter>
                    <Routing />
                </BrowserRouter>
            </I18nProvider>
        </LogProvider>
    );
}

export default App;
