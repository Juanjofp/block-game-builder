import { useI18nService } from 'services/i18n/framework';
import { Outlet } from 'react-router-dom';
import * as React from 'react';

export function AppLayout() {
    const { t } = useI18nService();
    return (
        <div className='App' data-testid={'app-container'}>
            {t('app_title')}
            <Outlet />
        </div>
    );
}
