import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';

const AppConfig = React.createContext(null);

type AppConfigProps = PropsWithChildren;

export const AppConfigConsumer = AppConfig.Consumer;

export function AppConfigProvider ({ children }: AppConfigProps) {
    const [ config, setConfig ] = useState(null);

    useEffect(() => {
        const cfg = (window as any)['__config__'];

        if (cfg) {
            setConfig(cfg);
        }
    }, []);

    return (
        <AppConfig.Provider value={config}>
            {children}
        </AppConfig.Provider>
    );
}

export function useAppConfig () {
    return useContext(AppConfig);
};
