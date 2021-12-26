import { useI18nService } from 'services/i18n/framework';
import * as React from 'react';
import { LogService } from 'services/log/log-service';

export function AppError() {
    const { t } = useI18nService();
    console.log('Showme As Error');
    return (
        <div data-testid={'error-container'}>
            <div>{t('error_message')}</div>
            <button>{t('error_button_text')}</button>
        </div>
    );
}
export const errorHandler = (logService: LogService) => () => {
    logService.error();
};
export const resetHandler = (logService: LogService) => () => {
    logService.error();
};
