export const BuilderPath = 'builder';
export const ScenePath = '';
export const CharacterPath = 'character';
export const PiecePath = 'piece';

export type BuilderPath = 'builder';
export type BuilderPaths = '' | 'character' | 'piece';

export type BuilderMenuElement = {
    path: `/${BuilderPath}/${BuilderPaths}`;
    lastPath: BuilderPaths;
    key: 'character' | 'piece' | 'scene';
    selected: boolean;
};
export function buildBuilderInteractor() {
    const menus: BuilderMenuElement[] = [
        {
            path: `/${BuilderPath}/${ScenePath}`,
            lastPath: ScenePath,
            selected: true,
            key: 'scene'
        },
        {
            path: `/${BuilderPath}/${CharacterPath}`,
            lastPath: CharacterPath,
            selected: false,
            key: 'character'
        },
        {
            path: `/${BuilderPath}/${PiecePath}`,
            lastPath: PiecePath,
            selected: false,
            key: 'piece'
        }
    ];
    function buildMenuFromPath(path: string): BuilderMenuElement[] {
        const segments = path.split('/');
        const lastPath = segments.pop();
        const section = segments.pop();

        if (lastPath === 'builder') {
            menus[0].selected = true;
            return menus.slice();
        }

        if (section !== BuilderPath) {
            return menus.slice().map(menu => {
                menu.selected = false;
                return menu;
            });
        }
        return menus.slice().map(menu => {
            menu.selected = menu.lastPath === lastPath;
            return menu;
        });
    }

    return {
        buildMenuFromPath
    };
}
