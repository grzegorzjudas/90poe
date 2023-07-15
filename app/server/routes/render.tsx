import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StatusCodes } from 'http-status-codes';
import { type Express } from 'express';

import Config, { FrontendConfig } from '../lib/config';

import App from '../../client/components/App';

function injectConfig () {
    const injectable = Object.entries(FrontendConfig).reduce((acc, [ key, value ]) => {
        acc[key] = value;

        return acc;
    }, {} as Record<string, any>);

    return `window.__config__ = ${JSON.stringify(injectable)};`;
}

export default function (app: Express) {
    app.get('/', (req, res) => {
        res.socket.on('error', (error) => {
            console.log('Fatal', error);
        });

        let didError = false;
        const stream = ReactDOMServer.renderToPipeableStream(
            <App inlineScripts={[ injectConfig() ]} />,
            {
                bootstrapScripts: [ '/static/index.js' ],
                onShellReady: () => {
                    res.statusCode = didError ? StatusCodes.INTERNAL_SERVER_ERROR : StatusCodes.OK;
                    res.setHeader('Content-Type', 'text/html');
                    stream.pipe(res);
                },
                onError: (error) => {
                    didError = true;

                    console.log(error);
                }
            }
        );

        setTimeout(() => stream.abort(), Config.SERVER_SIDE_RENDER_TIMEOUT);
    });
}
