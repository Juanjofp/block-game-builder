import { Index } from 'features/builder/framework/web/builder-piece-page';
import { renderInsideApp, screen, user } from 'test-utils';

describe('Builder Piece Page should', () => {
    async function expectedMatrix(
        testId: string,
        rows: number,
        columns: number
    ) {
        await screen.findByTestId(testId);
        const canvasRow = await screen.findAllByTestId(`${testId}-row`);

        expect(canvasRow).toHaveLength(8);
        const canvasCell = await screen.findAllByTestId(
            new RegExp(`${testId}-cell-\\d+-\\d+`)
        );
        expect(canvasCell).toHaveLength(rows * columns);
    }

    it('render a default canvas and a colors palette', async () => {
        renderInsideApp(<Index />);

        await expectedMatrix('builder-piece-canvas', 8, 8);
        await expectedMatrix('builder-piece-palette', 8, 2);
    });

    it('set transparent color when no color selected from palette', async () => {
        renderInsideApp(<Index />);

        const firstCanvasCellButton = await screen.findByTestId(
            'builder-piece-canvas-cell-0-0'
        );

        user.click(firstCanvasCellButton);

        expect(firstCanvasCellButton).toHaveStyle(
            `background-color: transparent`
        );
    });

    it('set a color from palette to the canvas', async () => {
        renderInsideApp(<Index />);

        const firstColorButton = await screen.findByTestId(
            'builder-piece-palette-cell-0-0'
        );
        const backgroundColor = firstColorButton.style.backgroundColor;

        const firstCanvasCellButton = await screen.findByTestId(
            'builder-piece-canvas-cell-0-0'
        );
        const lastCanvasCellButton = await screen.findByTestId(
            'builder-piece-canvas-cell-7-7'
        );

        user.click(firstColorButton);
        user.click(firstCanvasCellButton);
        user.click(lastCanvasCellButton);

        expect(firstCanvasCellButton).toHaveStyle(
            `background-color: ${backgroundColor}`
        );

        expect(lastCanvasCellButton).toHaveStyle(
            `background-color: ${backgroundColor}`
        );
    });
});
