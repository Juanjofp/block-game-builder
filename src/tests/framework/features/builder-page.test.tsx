import { renderInsideApp, screen, user } from 'test-utils';
import { Routing } from 'services/routing/framework';

describe('Builder page should', () => {
    it('render a TabComponent with 3 options', async () => {
        renderInsideApp(<Routing />, { index: 0, history: ['/builder'] });

        await screen.findByTestId('builder-page-tab-piece-item');
        await screen.findByTestId('builder-page-tab-character-item');
        const toPieceButton = await screen.findByTestId(
            'builder-page-tab-piece-item'
        );
        user.click(toPieceButton);

        await screen.findByTestId('builder-piece-page-container');
    });

    it.each([
        { init: 'scene', target: 'piece', history: ['/builder'] },
        { init: 'piece', target: 'scene', history: ['/builder/piece'] },
        { init: 'scene', target: 'character', history: ['/builder'] },
        { init: 'character', target: 'scene', history: ['/builder/character'] },
        { init: 'piece', target: 'character', history: ['/builder/piece'] },
        { init: 'character', target: 'piece', history: ['/builder/character'] }
    ])(
        'navigate from $init to $target when click in piece tab button',
        async ({ init, target, history }) => {
            renderInsideApp(<Routing />, { index: 0, history });

            await screen.findByTestId(`builder-page-tab-${init}-item-selected`);
            const navigationButton = await screen.findByTestId(
                `builder-page-tab-${target}-item`
            );
            user.click(navigationButton);

            await screen.findByTestId(`builder-${target}-page-container`);
            await screen.findByTestId(
                `builder-page-tab-${target}-item-selected`
            );
        }
    );
});

export {};