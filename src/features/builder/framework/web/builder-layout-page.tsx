import * as React from 'react';
import { useI18nService } from 'services/i18n/framework';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { buildBuilderInteractor } from '../../interactor';

type MenuNavigationElementProps = {
    path: string;
    selected: boolean;
    dataTestId?: string;
    title: string;
};
function MenuNavigationElement({
    path,
    selected,
    dataTestId,
    title
}: MenuNavigationElementProps) {
    return (
        <Link to={path} data-testid={dataTestId}>
            {selected ? '*' : ''}
            {title}
        </Link>
    );
}
function BuilderTabNavigator() {
    const { t } = useI18nService();
    const location = useLocation();
    const interactor = buildBuilderInteractor();
    const menus = interactor.buildMenuFromPath(location.pathname);

    return (
        <div>
            {menus.map(menu => (
                <MenuNavigationElement
                    key={menu.key}
                    path={menu.path}
                    selected={menu.selected}
                    title={t(`builder_${menu.key}_page_tab_item_title`)}
                    dataTestId={`builder-${menu.key}-page-tab-item${
                        menu.selected ? '-selected' : ''
                    }`}
                />
            ))}
        </div>
    );
}
export function BuilderLayoutPage() {
    const { t } = useI18nService();
    return (
        <div data-testid={'builder-page-container'}>
            <h2>{t('builder_page_title')}</h2>
            <BuilderTabNavigator />
            <Outlet />
        </div>
    );
}
