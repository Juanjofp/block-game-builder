import { useI18nService } from 'services/i18n/framework';
import * as React from 'react';

export function BuilderPiecePage() {
    const { t } = useI18nService();
    return (
        <div data-testid={'builder-piece-page-container'}>
            <div>{t('builder_piece_page_title')}</div>
        </div>
    );
}
