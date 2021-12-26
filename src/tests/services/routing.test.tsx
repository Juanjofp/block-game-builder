import { renderInsideApp, screen } from 'test-utils';
import { Routing } from 'services/routing/framework';

jest.mock('services/log/framework/console-log-service');
describe('Routing service should', () => {
    it('Render Main Page when path is /', async () => {
        renderInsideApp(<Routing />);

        await screen.findByTestId('main-container');
    });

    it('Render in section one when path is /section-one', async () => {
        renderInsideApp(<Routing />, {
            index: 1,
            history: ['/', '/section-one']
        });

        await screen.findByTestId('section-one-container');
    });
});
