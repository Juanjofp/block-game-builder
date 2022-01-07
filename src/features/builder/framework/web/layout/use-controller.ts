import { buildBuilderInteractor } from '../../../interactor';
import { useI18nService } from '../../../../../services/i18n/framework';
import { useLocation } from 'react-router-dom';

export function useController(
    interactor: ReturnType<typeof buildBuilderInteractor>
) {
    const { t } = useI18nService();
    const location = useLocation();
    const menus = interactor.buildMenuFromPath(location.pathname);

    return { menus, t };
}
