import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from 'framework/web/app-layout';
import { useI18nService } from 'services/i18n/framework';
import { useLog } from 'services/log/framework';
import { BuilderLayoutPage } from 'features/builder/framework/web/layout';
import { BuilderScenePage } from 'features/builder/framework/web/builder-scene-page';
import { BuilderPiecePageContainer } from 'features/builder/framework/web/builder-piece-page';
import { BuilderCharacterPage } from 'features/builder/framework/web/builder-character-page';
import {
    BuilderSection,
    CharacterPath,
    PiecePath
} from 'features/builder/interactor';

export function MainPage() {
    const { t } = useI18nService();
    return (
        <div>
            <div data-testid={'main-page-container'}>{t('main_page')}</div>
        </div>
    );
}

export function Routing() {
    const { info } = useLog();

    info('App init');
    return (
        <Routes>
            <Route path={'/'} element={<AppLayout />}>
                <Route index element={<MainPage />} />
                <Route path={BuilderSection} element={<BuilderLayoutPage />}>
                    <Route index element={<BuilderScenePage />} />
                    <Route
                        path={CharacterPath}
                        element={<BuilderCharacterPage />}
                    />
                    <Route
                        path={PiecePath}
                        element={<BuilderPiecePageContainer />}
                    />
                </Route>
            </Route>
        </Routes>
    );
}
