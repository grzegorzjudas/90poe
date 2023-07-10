import React, { Suspense, lazy } from 'react';
import { CircularProgress } from '@mui/material';

const RepoList = lazy(() => import('../RepoList'));

export function App () {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" href="favicon.ico" />
                <link rel="stylesheet" href="static/style.css" />
                <title>90POE</title>
            </head>
            <body>
                <Suspense fallback={<CircularProgress size={20} />}>
                    <RepoList />
                </Suspense>
            </body>
        </html>
    )
}

export default App;
