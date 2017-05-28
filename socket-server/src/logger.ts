import * as winston from 'winston';

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
                filename: `logs/${name}.debug.log`
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
                filename: `logs/${name}.error.log`
            })
        ]
    });
}