import * as React from 'react';
import { useI18nService } from 'services/i18n/framework';

export function BuilderCharacterPage() {
    const { t } = useI18nService();
    return (
        <div data-testid={'builder-character-page-container'}>
            {t('builder_character_page_title')}
        </div>
    );
}
