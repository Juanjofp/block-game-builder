import * as React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useI18next } from 'services/i18n/framework/i18next-service';
import { I18nProvider } from 'services/i18n/framework';
import { LogProvider } from 'services/log/framework';
import { loadProductionLog } from 'services/log/framework/production-log-service';

export function renderInsideApp(
    ui: React.ReactElement,
    {
        index = 0,
        history = ['/'],
        ...rest
    }: { index?: number; history?: string[] } = {}
) {
    function Wrapper(props: {}) {
        const i18nService = useI18next();
        return (
            <LogProvider logService={loadProductionLog()}>
                <I18nProvider service={i18nService}>
                    <MemoryRouter
                        initialIndex={index}
                        initialEntries={history}
                        {...props}
                    />
                </I18nProvider>
            </LogProvider>
        );
    }
    return render(ui, { wrapper: Wrapper, ...rest });
}

export * from '@testing-library/react';
