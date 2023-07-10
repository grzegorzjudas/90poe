import React from 'react';
import ReactDOMServer from 'react-dom/server'
import express from 'express';

import App from './components/App';

const app = express();

app.use('/static', async (req, res, next) => {
    if (req.url.endsWith('.js')) {
        await new Promise((resolve) => setTimeout(resolve, 4000));
    }

    express.static('static/')(req, res, next);
});

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

    setTimeout(() => stream.abort(), 3000);
});

app.listen(8080, () => {
    console.log('Listening...');
}).on('error', (error) => {
    console.error(error);
});
