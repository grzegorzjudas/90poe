import React from 'react';
import ReactDOMServer from 'react-dom/server'
import { type Express } from 'express';

import Config from '../lib/config';

import App from '../../client/components/App';

export default function (app: Express) {
    app.get('/', (req, res) => {
        res.socket.on('error', (error) => {
            console.log('Fatal', error);
        });

        let didError = false;
        const stream = ReactDOMServer.renderToPipeableStream(
            <App />,
            {
                bootstrapScripts: ['/static/index.js'],
                onShellReady: () => {
                    res.statusCode = didError ? 500 : 200,
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
