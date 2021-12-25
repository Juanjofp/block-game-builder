import * as React from 'react';
import { useI18next } from 'services/i18n/framework/i18next-service';
import { useI18nService, I18nProvider } from 'services/i18n/framework';
import './styles.css';

export function App() {
    const i18nService = useI18next();
    return (
        <I18nProvider service={i18nService}>
            <MainPage />
        </I18nProvider>
    );
}

export function MainPage() {
    const { t } = useI18nService();
    return (
        <div className='App' data-testid={'app-container'}>
            {t('app_title')}
        </div>
    );
}

export default App;
