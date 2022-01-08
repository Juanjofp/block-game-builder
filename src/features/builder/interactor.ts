export const BuilderSection = 'builder';
export const ScenePath = '';
export const CharacterPath = 'character';
export const PiecePath = 'piece';

export type BuilderSection = 'builder';
export type BuilderPaths = '' | 'character' | 'piece';
export type MenuKeys = 'character' | 'piece' | 'scene';
export type ValidMenuKeys = MenuKeys | undefined;
export const menuKeys = ['character', 'piece', 'scene'];

export type MenuElement = {
    path: `/${BuilderSection}/${BuilderPaths}`;
    lastPath: BuilderPaths;
    key: MenuKeys;
};

export const menus: MenuElement[] = [
    {
        path: `/${BuilderSection}/${ScenePath}`,
        lastPath: ScenePath,
        key: 'scene'
    },
    {
        path: `/${BuilderSection}/${CharacterPath}`,
        lastPath: CharacterPath,
        key: 'character'
    },
    {
        path: `/${BuilderSection}/${PiecePath}`,
        lastPath: PiecePath,
        key: 'piece'
    }
];

function isValidMenuKey(key: string): key is MenuKeys {
    return menuKeys.includes(key);
}

function containsValidPath(path: string): ValidMenuKeys {
    if (isValidMenuKey(path)) return path;
}

function removeFinalSlash(path: string): string {
    let endPath = path;
    while (endPath.endsWith('/')) {
        endPath = endPath.slice(0, -1);
    }
    return endPath;
}

export function buildBuilderInteractor() {
    function loadMenuFromPath(path: string): ValidMenuKeys {
        const endPath = removeFinalSlash(path);
        const segments = endPath.split('/');
        const lastPath = segments.pop() || '';
        const section = segments.pop();

        if (segments.length > 1) return undefined;

        if (lastPath === BuilderSection) {
            return 'scene';
        }

        if (section !== BuilderSection) {
            return undefined;
        }

        return containsValidPath(lastPath);
    }

    return {
        buildMenuFromPath: loadMenuFromPath
    };
}
