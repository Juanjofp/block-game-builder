import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { TabNavigator } from './tab-navigator';
import { useController } from './use-controller';
import { buildBuilderInteractor } from 'features/builder/interactor';

export function BuilderLayoutPage() {
    const interactor = buildBuilderInteractor();
    const { menus, t } = useController(interactor);
    return (
        <div data-testid={'builder-page-container'}>
            <h2>{t('builder_page_title')}</h2>
            <TabNavigator menus={menus} />
            <Outlet />
        </div>
    );
}
