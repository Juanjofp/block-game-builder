import * as React from 'react';
import { render, screen } from 'test-utils';
import {
    I18nProvider,
    useI18nService,
    Trans as Translate
} from 'services/i18n/framework';
import user from '@testing-library/user-event';
import { useI18next, Trans } from 'services/i18n/framework/i18next-service';

function I18nView() {
    const { t, currentLanguage } = useI18nService();
    return (
        <>
            <div>
                {currentLanguage} - {navigator.language}
            </div>
            <div>{t('test_message')}</div>
            <Trans i18nKey='test_description_message'>
                Edit <code>My file</code> to get <b>powers</b>
            </Trans>
        </>
    );
}

function I18nViewES() {
    const { t, changeLanguage, currentLanguage } = useI18nService();
    return (
        <>
            <div>
                {currentLanguage} - {navigator.language}
            </div>
            <div>{t('test_message')}</div>
            <Trans i18nKey='test_description_message'>
                Edit <code>My file</code> to get <b>powers</b>.
            </Trans>
            <button onClick={() => changeLanguage('es-ES')}>Change</button>
        </>
    );
}

function renderI18nService(ui: React.ReactElement) {
    const Wrapper = (props: {}) => {
        const i18nService = useI18next();

        return (
            <I18nProvider
                service={i18nService}
                Translate={Translate}
                {...props}
            />
        );
    };
    return render(ui, { wrapper: Wrapper });
}

describe('I18n should', () => {
    let languageGetter: jest.SpyInstance;
    beforeEach(() => {
        languageGetter = jest.spyOn(window.navigator, 'language', 'get');
        languageGetter.mockReturnValue('sv-SV');
    });
    afterEach(() => {
        languageGetter.mockRestore();
    });

    it('use default i18n service when not provided', async () => {
        render(<I18nViewES />, { wrapper: I18nProvider });

        expect(await screen.findByText(/sv-SV/)).toBeInTheDocument();
        expect(await screen.findByText('test_message')).toBeInTheDocument();
        expect(screen.getByText(/^Edit.*\.$/)).toBeInTheDocument();

        const btnChangeLanguage = await screen.findByText('Change');
        user.click(btnChangeLanguage);

        expect(await screen.findByText('test_message')).toBeInTheDocument();
        expect(screen.getByText(/^Edit.*\.$/)).toBeInTheDocument();
    });

    it('use en language when find and unsupported language', async () => {
        renderI18nService(<I18nView />);

        expect(await screen.findByText(/sv-SV/)).toBeInTheDocument();
        expect(await screen.findByText('Test message!')).toBeInTheDocument();
        expect(screen.getByText(/^Edit.*now\.$/)).toBeInTheDocument();
    });

    it('translate a simple text', () => {
        renderI18nService(<I18nView />);
        expect(screen.getByText('Test message!')).toBeInTheDocument();
        expect(screen.getByText(/^Edit.*now\.$/)).toBeInTheDocument();
    });

    it('translate in a different language', async () => {
        renderI18nService(<I18nViewES />);

        const btnChangeLanguage = await screen.findByText('Change');
        user.click(btnChangeLanguage);

        expect(
            await screen.findByText('(ES)Test message!')
        ).toBeInTheDocument();
        expect(screen.getByText(/^\(ES\)Edit.*now\.$/)).toBeInTheDocument();
    });
});
