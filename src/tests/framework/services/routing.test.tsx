import { renderInsideApp, screen } from 'test-utils';
import { Routing } from 'services/routing/framework/web';

describe('Routing service should', () => {
    it('Render Main Page when path is /', async () => {
        renderInsideApp(<Routing />);

        await screen.findByTestId('main-page-container');
    });

    it('Render in BuilderScenePage when path is /builder', async () => {
        renderInsideApp(<Routing />, {
            index: 1,
            history: ['/', '/builder']
        });

        await screen.findByTestId('builder-page-container');
        await screen.findByTestId('builder-scene-page-container');
    });

    it('Render in Piece when path is /builder/piece', async () => {
        renderInsideApp(<Routing />, {
            index: 2,
            history: ['/', '/builder', '/builder/piece']
        });

        await screen.findByTestId('builder-page-container');
        await screen.findByTestId('builder-piece-page-container');
    });

    it('Render in Character when path is /builder/character', async () => {
        renderInsideApp(<Routing />, {
            index: 2,
            history: ['/', '/builder', '/builder/character']
        });

        await screen.findByTestId('builder-page-container');
        await screen.findByTestId('builder-character-page-container');
    });
});
