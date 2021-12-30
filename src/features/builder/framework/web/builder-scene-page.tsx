import { useI18nService } from 'services/i18n/framework';
import * as React from 'react';

export function BuilderScenePage() {
    const i18n = useI18nService();
    return (
        <div data-testid={'builder-scene-page-container'}>
            {i18n.t('builder_scene_page_title')}
        </div>
    );
}
