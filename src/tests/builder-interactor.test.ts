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

    it('update only one color in the schema when not bucket enabled', () => {
        const interactor = buildBuilderInteractor();

        const sourceSchema = [['transparent', 'red', 'blue', 'green']];
        const newColor = 'yellow';
        const position: [number, number] = [0, 0];
        const schema = interactor.updatePieceColorScheme(
            position,
            newColor,
            sourceSchema
        );

        expect(schema[0][0]).toBe(newColor);
    });

    it('update all colors in the schema when bucket enabled and all cells are transparent', () => {
        const interactor = buildBuilderInteractor();

        const sourceSchema = [
            ['transparent', 'transparent', 'transparent', 'transparent'],
            ['transparent', 'transparent', 'transparent', 'transparent']
        ];
        const newColor = 'yellow';
        const position: [number, number] = [1, 2];
        const schema = interactor.updatePieceColorScheme(
            position,
            newColor,
            sourceSchema,
            true
        );

        schema.forEach(row =>
            row.forEach(color => expect(color).toBe(newColor))
        );
    });

    it('update color only in the right half of cell', () => {
        const interactor = buildBuilderInteractor();

        const sourceSchema = [
            ['transparent', 'black', 'transparent'],
            ['transparent', 'black', 'transparent'],
            ['transparent', 'black', 'transparent'],
            ['transparent', 'black', 'transparent']
        ];
        const newColor = 'yellow';
        const position: [number, number] = [0, 0];

        const schema = interactor.updatePieceColorScheme(
            position,
            newColor,
            sourceSchema,
            true
        );

        expect(schema).toEqual([
            ['yellow', 'black', 'transparent'],
            ['yellow', 'black', 'transparent'],
            ['yellow', 'black', 'transparent'],
            ['yellow', 'black', 'transparent']
        ]);
    });

    it('update all colors except black column', () => {
        const interactor = buildBuilderInteractor();

        const sourceSchema = [
            ['transparent', 'black', 'transparent'],
            ['transparent', 'black', 'transparent'],
            ['transparent', 'black', 'transparent'],
            ['transparent', 'transparent', 'transparent']
        ];
        const newColor = 'yellow';
        const position: [number, number] = [0, 0];

        const schema = interactor.updatePieceColorScheme(
            position,
            newColor,
            sourceSchema,
            true
        );

        expect(schema).toEqual([
            ['yellow', 'black', 'yellow'],
            ['yellow', 'black', 'yellow'],
            ['yellow', 'black', 'yellow'],
            ['yellow', 'yellow', 'yellow']
        ]);
    });

    it('update all colors except top right quarter', () => {
        const interactor = buildBuilderInteractor();

        const sourceSchema = [
            ['transparent', 'black', 'transparent'],
            ['transparent', 'black', 'black'],
            ['transparent', 'black', 'transparent'],
            ['transparent', 'transparent', 'transparent']
        ];
        const newColor = 'yellow';
        const position: [number, number] = [0, 0];

        const schema = interactor.updatePieceColorScheme(
            position,
            newColor,
            sourceSchema,
            true
        );

        expect(schema).toEqual([
            ['yellow', 'black', 'transparent'],
            ['yellow', 'black', 'black'],
            ['yellow', 'black', 'yellow'],
            ['yellow', 'yellow', 'yellow']
        ]);
    });

    it('update all colors on left side of matrix', () => {
        const interactor = buildBuilderInteractor();

        const sourceSchema = [
            ['black', 'transparent', 'transparent'],
            ['transparent', 'black', 'transparent'],
            ['transparent', 'transparent', 'black']
        ];
        const newColor = 'yellow';
        const position: [number, number] = [2, 0];

        const schema = interactor.updatePieceColorScheme(
            position,
            newColor,
            sourceSchema,
            true
        );

        expect(schema).toEqual([
            ['black', 'transparent', 'transparent'],
            ['yellow', 'black', 'transparent'],
            ['yellow', 'yellow', 'black']
        ]);
    });

    it('update all colors on left side of matrix when it has a color', () => {
        const interactor = buildBuilderInteractor();

        const sourceSchema = [
            ['black', 'transparent', 'transparent'],
            ['yellow', 'black', 'transparent'],
            ['yellow', 'yellow', 'black']
        ];
        const newColor = 'blue';
        const position: [number, number] = [2, 0];

        const schema = interactor.updatePieceColorScheme(
            position,
            newColor,
            sourceSchema,
            true
        );

        expect(schema).toEqual([
            ['black', 'transparent', 'transparent'],
            ['blue', 'black', 'transparent'],
            ['blue', 'blue', 'black']
        ]);
    });
});
