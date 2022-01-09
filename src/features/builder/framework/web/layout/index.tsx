import * as React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { TabNavigator } from './tab-navigator';
import { useI18nService } from 'services/i18n/framework';
import {
    getMenu,
    thunkSelectMenuOptionFromPath
} from 'features/builder/framework/reducers';
import { useAppDispatch, useAppSelector } from 'framework/store/hooks';

export function useController() {
    const { t } = useI18nService();
    const location = useLocation();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(thunkSelectMenuOptionFromPath(location.pathname));
    }, [dispatch, location.pathname]);

    const menus = useAppSelector(getMenu);

    return { menus, t };
}

export function BuilderLayoutPage() {
    const { menus, t } = useController();
    return (
        <div data-testid={'builder-page-container'}>
            <h2>{t('builder_page_title')}</h2>
            <TabNavigator menus={menus} />
            <Outlet />
        </div>
    );
}
