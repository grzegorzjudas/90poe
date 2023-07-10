import os from 'os';
import {
    type LeveledLogMethod,
    type Logger,
    createLogger,
    format,
    transports
} from 'winston';

import Config from './config';
import { TransformableInfo } from 'logform';

interface CustomLogger extends Logger {
    failure: LeveledLogMethod;
    error: LeveledLogMethod;
    warning: LeveledLogMethod;
    info: LeveledLogMethod;
    debug: LeveledLogMethod;
}

const LOG_COLORS = {
    failure: '\x1b[31m',
    error: '\x1b[38;5;208m',
    warning: '\x1b[33m',
    info: '\x1b[34m',
    debug: '\x1b[0m'
};

function getMetadata () {
    return process.env.NODE_ENV === 'production' ? {
        service: process.env.APP_NAME,
        host: os.hostname(),
        environment: process.env.NODE_ENV
    } : {};
}

function getParsedMetadata () {
    const metadata = getMetadata();

    if (Object.keys(metadata).length === 0) return '';

    return Object.entries(metadata).map(([ key, value ]) => `[${key}=${value}]`).join(' ') + ' ';
}

function getMessage (message: any) {
    if (typeof message === 'object' && message !== null) return JSON.stringify(message);

    return message;
}

function colorize (level: TransformableInfo['level'], text: string) {
    return `${LOG_COLORS[level as keyof typeof LOG_COLORS]}${text}\x1b[0m`;
}

function getFormattedMessage (text: TransformableInfo) {
    return colorize(text.level, `[${text.timestamp}] [${text.level.toUpperCase()}] ${getParsedMetadata()}${getMessage(text.message)}`);
}

function getDevFormatter () {
    return format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.simple(),
        format.printf((text) => {
            return getFormattedMessage(text);
        })
    );
}

export default <CustomLogger>createLogger({
    level: Config.LOG_LEVEL,
    defaultMeta: getMetadata(),
    levels: {
        failure: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    transports: [
        new transports.Console({
            level: Config.LOG_LEVEL,
            format: process.env.NODE_ENV === 'production' ? format.json() : getDevFormatter(),
            silent: Config.LOG_SILENT
        })
    ]
})
