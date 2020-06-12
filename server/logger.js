const winston = require('winston');
const path = require('path');
const moment = require('moment');
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const log = winston.createLogger({
    format: combine(
        label({ label: 'SERVER' }),
        timestamp(),
        myFormat
    ),
    transports: [
        // info console log
        new winston.transports.Console({
            level: 'info',
            name: 'info-console',
            colorize: true,
            timestamp: true,
        }),
        // info log file
        new winston.transports.File({
            level: 'info',
            name: 'info-file',
            filename: path.resolve(__dirname, '../.', 'server/storage/logs', 'info.log'),
            timestamp: () => moment().format('YYYY-MM-DD HH-mm-ss'),
            formatter: options => `[${options.timestamp()}]: ${options.message || ''}`,
            json: false
        }),
        // errors console log
        new winston.transports.Console({
            level: 'error',
            name: 'error-console',
            colorize: true,
            timestamp: () => moment().format('YYYY-MM-DD HH-mm-ss'),
            formatter: options => `[${options.timestamp()}]: ${options.message || ''}`
        }),
        // errors log file
        new winston.transports.File({
            level: 'error',
            name: 'error-file',
            filename: path.resolve(__dirname, '../.', 'server/storage/logs', 'error.log'),
            timestamp: () => moment().format('YYYY-MM-DD HH-mm-ss'),
            formatter: options => `[${options.timestamp()}]: ${options.message || ''}`,
            json: false
        })
    ]
});

module.exports = log;