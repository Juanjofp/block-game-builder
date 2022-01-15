import { renderInsideApp, screen, user } from 'test-utils';
import { PaletteColor } from 'features/builder/framework/web/builder-piece-page/palette-color';

describe('Index should', () => {
    const paletteScheme = [
        ['white', 'black', 'red', 'green', 'blue', 'yellow', 'transparent'],
        ['purple', 'pink', 'cyan', 'brown', 'grey', 'orange', 'golden']
    ];
    const palette = {
        colors: paletteScheme,
        selectedColor: 'transparent',
        isBucketEnabled: false
    };

    it('disable toggle bucket when pressed it twice', async () => {
        const pieceColorSchema = [
            ['transparent', 'transparent', 'transparent'],
            ['transparent', 'transparent', 'transparent'],
            ['transparent', 'transparent', 'transparent']
        ];
        const piece = { colors: pieceColorSchema };

        renderInsideApp(<PaletteColor />, {
            initialState: { builder: { palette, piece } }
        });

        const bucketButton = await screen.findByTestId(
            'builder-piece-palette-bucket-button'
        );
        user.click(bucketButton);
        await screen.findByTestId(
            'builder-piece-palette-bucket-button-selected'
        );
        user.click(bucketButton);
        await screen.findByTestId('builder-piece-palette-bucket-button');
    });
});
