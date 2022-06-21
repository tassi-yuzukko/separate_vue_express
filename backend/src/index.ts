// this project is consited by 'Bulletproof node.js project architecture'
// to see detail follows : https://github.com/santiq/bulletproof-nodejs/blob/master/src/loaders/agenda.ts
// 日本語サイトはこちら : https://qiita.com/baby-degu/items/f1489dd94becd46ab523

import config from './config';
import express from 'express';
import Logger from './loaders/logger';

async function startServer() {
    const app = express();

    /**
     * A little hack here
     * Import/Export can only be used in 'top-level code'
     * Well, at least in node 10 without babel and at the time of writing
     * So we are using good old require.
     **/
    await require('./loaders').default({ expressApp: app });

    app.listen(config.port, () => {
        Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    }).on('error', err => {
        Logger.error(err);
        process.exit(1);
    });
}

startServer();