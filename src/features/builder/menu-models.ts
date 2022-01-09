import {
    BuilderSection,
    BuilderScenePath,
    BuilderPaths,
    BuilderCharacterPath,
    BuilderPiecePath
} from 'services/routing/models';

export type MenuKeys = 'character' | 'piece' | 'scene';
export type ValidMenuKeys = MenuKeys | undefined;

export type MenuElement = {
    path: `/${BuilderSection}/${BuilderPaths}`;
    lastPath: BuilderPaths;
    key: MenuKeys;
};

export const MenuSection = BuilderSection;
export const menuKeys = ['character', 'piece', 'scene'];

export const menus: MenuElement[] = [
    {
        path: `/${BuilderSection}/${BuilderScenePath}`,
        lastPath: BuilderScenePath,
        key: 'scene'
    },
    {
        path: `/${BuilderSection}/${BuilderCharacterPath}`,
        lastPath: BuilderCharacterPath,
        key: 'character'
    },
    {
        path: `/${BuilderSection}/${BuilderPiecePath}`,
        lastPath: BuilderPiecePath,
        key: 'piece'
    }
];

export function isValidMenuKey(key: string): key is MenuKeys {
    return menuKeys.includes(key);
}

export function containsValidPath(path: string): ValidMenuKeys {
    if (isValidMenuKey(path)) return path;
}
