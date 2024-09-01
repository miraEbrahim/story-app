import { createLogger, format, transports } from "winston";
const { combine, json, splat, timestamp } = format;


//logger
const logger = createLogger({
    format: combine(timestamp(), splat(), json()),
});

const consoleW = new transports.Console({
    level: "debug",
});

logger.add(consoleW);

export const writeError = (msg) => {
    logger.error(msg);
};

export const infoLog = (msg) => {
    logger.info(msg);
};

export const warningLog = (msg) => {
    logger.warn(msg);
};
