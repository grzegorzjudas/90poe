import express from 'express';
import { type AddressInfo } from 'net';

import Config from './lib/config';
import Log from './lib/log';

import middlewares from './middleware';
import routes from './routes';

const app = express();

for (const middleware of middlewares) {
    app.use(...middleware as any);
}

for (const route of routes) {
    route(app);
}

const instance = app.listen(Config.PORT, () => {
    const { address, port } = instance.address() as AddressInfo;

    Log.info(`Server listening on ${address}:${port}`);
}).on('error', (error) => {
    Log.failure(`Could not start server: ${error.message}`);
});
