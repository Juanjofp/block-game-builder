import * as React from 'react';
import { useI18next } from 'services/i18n/framework/i18next-service';
import { useI18nService, I18nProvider } from 'services/i18n/framework';
import { LogProvider, useLog } from '../../services/log/framework';
import { loadProductionLog } from '../../services/log/framework/production-log-service';

import './styles.css';

export function App() {
    const i18nService = useI18next();
    return (
        <LogProvider logService={loadProductionLog()}>
            <I18nProvider service={i18nService}>
                <MainPage />
            </I18nProvider>
        </LogProvider>
    );
}

export function MainPage() {
    const { t } = useI18nService();
    const { info } = useLog();

    info('App init');
    return (
        <div className='App' data-testid={'app-container'}>
            {t('app_title')}
        </div>
    );
}

export default App;
