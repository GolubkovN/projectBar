import { json } from 'express';
import winston, {createLogger, format, transports} from 'winston';

export const logger = createLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.json(),
});