import * as React from 'react';
import { LogService } from '../log-service';

export const defaultLogService: LogService = {
    info: () => undefined,
    warn: () => undefined,
    error: () => undefined
};

const LogContext = React.createContext<LogService>(defaultLogService);

export type LogProviderProps = {
    logService?: LogService;
    children: React.ReactNode;
};
export function LogProvider({ logService, ...props }: LogProviderProps) {
    const service = logService ?? defaultLogService;
    return <LogContext.Provider value={service} {...props} />;
}

export function useLog(): LogService {
    return React.useContext(LogContext);
}
