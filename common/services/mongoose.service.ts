import mongoose from 'mongoose';
import debug from 'debug';
const debugLog: debug.IDebugger = debug('mongoose.service');
let count = 0;

const options = {
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    // all other approaches are now deprecated by MongoDB:
    useNewUrlParser: true,
    useUnifiedTopology: true
};

export function connectWithRetry() {
    debugLog('MongoDB connection with retry')
    mongoose.connect("mongodb://localhost:27017/kinoREST", options)
        .then(() => {
            debugLog('MongoDB is connected')
        }).catch(err => {
            debugLog('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
            setTimeout(connectWithRetry, 5000)
        })
};

connectWithRetry();

export { mongoose };

//  export const mongoose : mongoose.Mongoose = mongoose;

// exports.mongoose = mongoose;