import { Link } from 'react-router-dom';
import { useI18nService } from 'services/i18n/framework';
import * as React from 'react';

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

type BuilderTabNavigationProps = {
    menus: { key: string; path: string; selected: boolean }[];
};
export function TabNavigator({ menus }: BuilderTabNavigationProps) {
    const { t } = useI18nService();
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
