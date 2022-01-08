import { buildBuilderInteractor } from 'features/builder/interactor';

describe('Builder Interactor should', () => {
    it.each([
        { path: '/builder', key: 'scene' },
        { path: '/builder/', key: 'scene' },
        { path: '/builder//', key: 'scene' },
        {
            path: '/builder/character',
            key: 'character'
        },
        {
            path: '/builder/piece',
            key: 'piece'
        },
        {
            path: '/builder/character/',
            key: 'character'
        },
        {
            path: '/builder/piece/',
            key: 'piece'
        }
    ])('select the menu $key for $path path', ({ path, key }) => {
        const interactor = buildBuilderInteractor();

        const menu = interactor.buildMenuFromPath(path);

        expect(menu).toBe(key);
    });

    it.each([
        { path: '' },
        { path: '/builder/noway' },
        { path: '/play' },
        { path: '/play/level-one' },
        { path: '/play/level-one/' },
        { path: '/play/level-one/level-two/level-three' }
    ])('select undefined when invalid path "$path"', ({ path }) => {
        const interactor = buildBuilderInteractor();

        const menu = interactor.buildMenuFromPath(path);

        expect(menu).toBe(undefined);
    });
});
