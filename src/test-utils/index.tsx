import * as React from 'react';
import { render } from '@testing-library/react';
import { useI18next } from 'services/i18n/framework/i18next-service';
import { I18nProvider } from 'services/i18n/framework';
import { LogProvider } from 'services/log/framework';
import { loadProductionLog } from 'services/log/framework/production-log-service';

export function renderInsideApp(ui: React.ReactElement) {
    function Wrapper(props: {}) {
        const i18nService = useI18next();
        return (
            <LogProvider logService={loadProductionLog()}>
                <I18nProvider service={i18nService} {...props} />
            </LogProvider>
        );
    }
    return render(ui, { wrapper: Wrapper });
}

export * from '@testing-library/react';
