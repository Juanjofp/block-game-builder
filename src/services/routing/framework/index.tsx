import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from 'framework/web/app-layout';
import { useI18nService } from 'services/i18n/framework';
import { useLog } from 'services/log/framework';

export function MainPage() {
    const { t } = useI18nService();
    return <div data-testid={'main-container'}>{t('main_page')}</div>;
}

export function SectionOnePage() {
    const { t } = useI18nService();
    return (
        <div data-testid={'section-one-container'}>{t('section_one_page')}</div>
    );
}

export function Routing() {
    const { info } = useLog();

    info('App init');
    return (
        <Routes>
            <Route path={'/'} element={<AppLayout />}>
                <Route index element={<MainPage />} />
                <Route path={'section-one'} element={<SectionOnePage />} />
            </Route>
        </Routes>
    );
}
