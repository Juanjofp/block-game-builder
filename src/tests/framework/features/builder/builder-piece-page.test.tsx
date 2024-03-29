import { BuilderPiecePageContainer } from 'features/builder/framework/web/builder-piece-page';
import { renderInsideApp, screen, user } from 'test-utils';

describe('Builder Piece Page should', () => {
    async function expectedMatrix(
        testId: string,
        rows: number,
        columns: number
    ) {
        await screen.findByTestId(testId);
        const canvasRow = await screen.findAllByTestId(`${testId}-row`);

        expect(canvasRow).toHaveLength(rows);
        const canvasCell = await screen.findAllByTestId(
            new RegExp(`${testId}-cell-\\d+-\\d+`)
        );
        expect(canvasCell).toHaveLength(rows * columns);
    }

    const paletteScheme = [
        ['white', 'black', 'red', 'green', 'blue', 'yellow', 'transparent'],
        ['purple', 'pink', 'cyan', 'brown', 'grey', 'orange', 'golden']
    ];
    const palette = {
        colors: paletteScheme,
        selectedColor: 'transparent',
        isBucketEnabled: false
    };

    const imageService = {
        generateImageBase64FromSchema: jest.fn()
    };

    beforeEach(() => {
        imageService.generateImageBase64FromSchema.mockClear();
    });

    it('render a default canvas and a default colors palette', async () => {
        renderInsideApp(<BuilderPiecePageContainer />, {
            initialState: { builder: { palette } }
        });

        await expectedMatrix('builder-piece-canvas', 12, 12);
        await expectedMatrix('builder-piece-palette', 2, 7);
    });

    it('set transparent color when no color selected from palette', async () => {
        renderInsideApp(
            <BuilderPiecePageContainer imageService={imageService} />,
            {
                initialState: { builder: { palette } }
            }
        );

        const firstCanvasCellButton = await screen.findByTestId(
            'builder-piece-canvas-cell-0-0'
        );

        await user.click(firstCanvasCellButton);

        expect(firstCanvasCellButton).toHaveStyle(
            `background-color: transparent`
        );
    });

    it('set a color from palette to the canvas', async () => {
        renderInsideApp(
            <BuilderPiecePageContainer imageService={imageService} />,
            {
                initialState: { builder: { palette } }
            }
        );

        const firstColorButton = await screen.findByTestId(
            'builder-piece-palette-cell-0-5'
        );
        const backgroundColor = firstColorButton.style.backgroundColor;
        await user.click(firstColorButton);

        const firstCanvasCellButton = await screen.findByTestId(
            'builder-piece-canvas-cell-0-0'
        );
        const lastCanvasCellButton = await screen.findByTestId(
            'builder-piece-canvas-cell-7-7'
        );
        await user.click(firstCanvasCellButton);
        await user.click(lastCanvasCellButton);

        expect(firstCanvasCellButton).toHaveStyle(
            `background-color: ${backgroundColor}`
        );

        expect(lastCanvasCellButton).toHaveStyle(
            `background-color: ${backgroundColor}`
        );
    });

    it('create an image from canvas with a red cross', async () => {
        const pieceColorSchema = [
            ['transparent', 'red', 'transparent'],
            ['red', 'red', 'red'],
            ['transparent', 'red', 'transparent']
        ];
        const piece = { colors: pieceColorSchema };
        imageService.generateImageBase64FromSchema.mockReturnValue(
            'imageBase64'
        );
        renderInsideApp(
            <BuilderPiecePageContainer imageService={imageService} />,
            {
                initialState: { builder: { palette, piece } }
            }
        );

        const saveImageButton = await screen.findByTestId(
            'builder-piece-page-save-image-button'
        );
        await user.click(saveImageButton);

        await screen.findByTestId('builder-piece-page-image');
    });

    it('set all canvas to red color when using bucket tool', async () => {
        const pieceColorSchema = [
            ['transparent', 'transparent', 'transparent'],
            ['transparent', 'transparent', 'transparent'],
            ['transparent', 'transparent', 'transparent']
        ];
        const piece = { colors: pieceColorSchema };

        renderInsideApp(
            <BuilderPiecePageContainer imageService={imageService} />,
            {
                initialState: { builder: { palette, piece } }
            }
        );

        const colorButton = await screen.findByTestId(
            'builder-piece-palette-cell-0-2'
        );
        await user.click(colorButton);

        const bucketButton = await screen.findByTestId(
            'builder-piece-palette-bucket-button'
        );
        await user.click(bucketButton);

        const firstCanvasCellButton = await screen.findByTestId(
            'builder-piece-canvas-cell-0-0'
        );
        await user.click(firstCanvasCellButton);

        const pieceCanvasCells = await screen.findAllByTestId(
            /builder-piece-canvas-cell-\d-\d/
        );

        expect(pieceCanvasCells).toHaveLength(9);
        for (const cell in pieceCanvasCells) {
            expect(pieceCanvasCells[cell]).toHaveStyle(`background-color: red`);
        }
    });

    it('disable toggle bucket when pressed it again', async () => {
        const pieceColorSchema = [
            ['transparent', 'transparent', 'transparent'],
            ['transparent', 'transparent', 'transparent'],
            ['transparent', 'transparent', 'transparent']
        ];
        const piece = { colors: pieceColorSchema };

        renderInsideApp(
            <BuilderPiecePageContainer imageService={imageService} />,
            {
                initialState: { builder: { palette, piece } }
            }
        );

        const colorButton = await screen.findByTestId(
            'builder-piece-palette-cell-0-3'
        );
        const selectedColor = colorButton.style.backgroundColor;
        await user.click(colorButton);

        const bucketButton = await screen.findByTestId(
            'builder-piece-palette-bucket-button'
        );
        await user.click(bucketButton);
        await user.click(bucketButton);

        const firstCanvasCellButton = await screen.findByTestId(
            'builder-piece-canvas-cell-0-0'
        );
        await user.click(firstCanvasCellButton);

        expect(firstCanvasCellButton).toHaveStyle(
            'background-color: ' + selectedColor
        );
    });
});
