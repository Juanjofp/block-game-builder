import { useI18nService } from 'services/i18n/framework';
import * as React from 'react';
import { LogService } from 'services/log/log-service';
import { FallbackProps } from 'react-error-boundary';

export function AppError({ error, resetErrorBoundary }: FallbackProps) {
    const { t } = useI18nService();
    return (
        <div data-testid={'app-error-container'}>
            <div>{t('app_error_message')}</div>
            <button
                onClick={() => resetErrorBoundary(error)}
                data-testid={'app-error-reset-button'}
            >
                {t('app_error_reset_button_text')}
            </button>
        </div>
    );
}
export const errorHandler =
    (logService: LogService) =>
    (error: Error, info: { componentStack: string }) => {
        logService.error(error.name, error.message, info.componentStack);
    };
export const resetHandler = (logService: LogService) => (error: any) => {
    if (!!error && error instanceof Object) {
        const name = 'name' in error ? error.name : 'Unknown error';
        const message =
            'message' in error ? error.message : JSON.stringify(error);
        logService.info(name, message);
    } else {
        logService.info('Unknown error', error);
    }
};
