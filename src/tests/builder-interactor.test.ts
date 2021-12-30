import { buildBuilderInteractor } from 'features/builder/interactor';

describe('Builder Interactor should', () => {
    it.each([
        { section: '/builder', path: 'scene', key: '', menuIndex: 0 },
        { section: '/builder/', path: 'scene', key: '', menuIndex: 0 },
        {
            section: '/builder/',
            path: 'character',
            key: 'character',
            menuIndex: 1
        },
        {
            section: '/builder/',
            path: 'piece',
            key: 'piece',
            menuIndex: 2
        }
    ])(
        'build the menu and select $path path',
        ({ section, key, menuIndex }) => {
            const interactor = buildBuilderInteractor();
            const path = section + key;

            const menu = interactor.buildMenuFromPath(path);

            expect(menu.length).toBe(3);

            const sceneMenu = menu[menuIndex];
            expect(sceneMenu.selected).toBe(true);
        }
    );

    it.each([
        { path: '' },
        { path: '/builder/noway' },
        { path: '/play' },
        { path: '/play/level-one' }
    ])(
        'build the menu and select nothing when invalid path "$path"',
        ({ path }) => {
            const interactor = buildBuilderInteractor();

            const menu = interactor.buildMenuFromPath(path);

            expect(menu.length).toBe(3);

            menu.forEach(item => {
                expect(item.selected).toBe(false);
            });
        }
    );
});
