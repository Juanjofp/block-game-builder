import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppLayout } from 'framework/web/app-layout';
import { useI18nService } from 'services/i18n/framework';
import { useLog } from 'services/log/framework';
import { BuilderLayoutPage } from 'features/builder/framework/web/layout';
import { BuilderScenePage } from 'features/builder/framework/web/builder-scene-page';
import { BuilderPiecePageContainer } from 'features/builder/framework/web/builder-piece-page';
import { BuilderCharacterPage } from 'features/builder/framework/web/builder-character-page';
import {
    BuilderSection,
    BuilderCharacterPath,
    BuilderPiecePath
} from 'services/routing/models';
import { useAppDispatch } from 'framework/store/hooks';
import { thunkUpdateRoute } from '../reducers';

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

    const location = useLocation();
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(thunkUpdateRoute(location.pathname));
    }, [dispatch, location.pathname]);

    info('App init');
    return (
        <Routes>
            <Route path={'/'} element={<AppLayout />}>
                <Route index element={<MainPage />} />
                <Route path={BuilderSection} element={<BuilderLayoutPage />}>
                    <Route index element={<BuilderScenePage />} />
                    <Route
                        path={BuilderCharacterPath}
                        element={<BuilderCharacterPage />}
                    />
                    <Route
                        path={BuilderPiecePath}
                        element={<BuilderPiecePageContainer />}
                    />
                </Route>
            </Route>
        </Routes>
    );
}
