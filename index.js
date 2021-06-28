'use strict'

require('async-to-gen/register');

const createServer = require('./app');

async function run() {
    try {
        await createServer();
    }catch(e) {
        console.error(e);
    }
}

run();