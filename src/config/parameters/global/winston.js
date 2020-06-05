import { format } from 'winston';

const prettyJson = format.printf(info => {
    let { level, message } = info;
    message = message || info;

    if ('object' === typeof message) {
        message = JSON.stringify(message, null, 4);
    }

    return `${level}: ${message}`;
});

export default {
    "winston": {
        format: format.combine(
            format.colorize(),
            format.simple(),
            prettyJson,
        )
    },
    "file_error": {
        filename: './logs/error.log',
        level: 'error',
        json: true,
        colorize: false,
    },
    "file_all": {
        filename: './logs/all.log',
        json: true,
        handleExceptions: true,
        colorize: false,
    },
    "console_all": {
        handleExceptions: true,
        json: false,
        colorize: true,
    },
    "console_debug": {
        handleExceptions: true,
        json: false,
        colorize: true,
        level: 'debug',
    },
}