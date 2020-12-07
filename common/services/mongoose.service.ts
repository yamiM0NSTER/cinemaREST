import mongoose from 'mongoose';
import debug from 'debug';
import config from '../env.config';
const debugLog: debug.IDebugger = debug('mongoose.service');
let count = 0;

const options = {
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    // all other approaches are now deprecated by MongoDB:
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

export function connectWithRetry() {
    debugLog('MongoDB connection with retry')
    mongoose.connect(config.dbEndpoint, options)
        .then(() => {
            debugLog('MongoDB is connected')
        }).catch(err => {
            debugLog('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
            setTimeout(connectWithRetry, 5000)
        })
};

// connectWithRetry();

export { mongoose };