import React from 'react';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { ApolloProvider } from '@apollo/client';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import theme from '../../lib/theme';
import { createApolloClient } from '../../lib/graphql';
import { AppConfigConsumer, AppConfigProvider } from '../AppConfig';
import { RepoListView } from '../../views/RepoListView';

export type AppProps = {
    inlineScripts?: string[];
}

export function App ({ inlineScripts = [] }: AppProps) {
    const cache = createCache({ key: 'css' });
    // const prefersDarkMode = useMediaQuery(`(prefers-color-scheme: dark)`);
    // const theme = useMemo(() => , [prefersDarkMode]);

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" href="favicon.ico" />
                <title>90POE</title>
                {inlineScripts.map((script, scriptIndex) => (
                    <script key={scriptIndex} dangerouslySetInnerHTML={{ __html: script }} />
                ))}
            </head>
            <body>
                <StyledEngineProvider injectFirst>
                    <AppConfigProvider>
                        <AppConfigConsumer>
                            {(config) => {
                                if (!config) return null;

                                return (
                                    <>
                                        <ApolloProvider client={createApolloClient(config.GITHUB_TOKEN)}>
                                            <CacheProvider value={cache}>
                                                <ThemeProvider theme={theme}>
                                                    <CssBaseline />
                                                    <SnackbarProvider maxSnack={5} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                                                        <RepoListView />
                                                    </SnackbarProvider>
                                                </ThemeProvider>
                                            </CacheProvider>
                                        </ApolloProvider>
                                    </>
                                );
                            }}
                        </AppConfigConsumer>
                    </AppConfigProvider>
                </StyledEngineProvider>
            </body>
        </html>
    )
}

export default App;
