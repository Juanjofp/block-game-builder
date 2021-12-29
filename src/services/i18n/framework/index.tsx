import React from 'react';
import { I18nService } from 'services/i18n/i18n-service';

export const defaultI18nService: I18nService = {
    t: (key: string) => key,
    changeLanguage: () => undefined,
    currentLanguage: 'en'
};

export const DefaultTranslate: React.FC = ({ children }) => <>{children}</>;
const I18nContext = React.createContext<I18nService>(defaultI18nService);
let TranslateComponent = DefaultTranslate;

export const I18nProvider: React.FC<{
    service?: I18nService;
    Translate?: React.FC;
}> = ({ service, Translate, ...props }) => {
    const translationService = service ?? defaultI18nService;
    TranslateComponent = Translate ?? DefaultTranslate;
    return <I18nContext.Provider value={translationService} {...props} />;
};

export const useI18nService = () => {
    return React.useContext(I18nContext);
};

export function Trans(props: Record<string, any>) {
    return <TranslateComponent {...props} />;
}
