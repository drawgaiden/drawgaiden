import * as winston from 'winston';
import { join } from 'path';
import config from './config';

export default function Logger(name: string) {
    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                json : false,
                timestamp: true
            }),
            new winston.transports.File({
                json: false,
                timestamp: true,
                filename: join(config.logDirectory, `${name}.debug.log`)
            })
        ],
        exceptionHandlers: [
            new winston.transports.Console({
                json: false,
                timestamp: true
            }),
            new winston.transports.File({
                json: false,
                timestamp: true,
                filename: join(config.logDirectory, `${name}.error.log`)
            })
        ]
    });
}