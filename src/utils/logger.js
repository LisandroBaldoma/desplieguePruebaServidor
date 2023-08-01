import winston from "winston";

const myCustonlevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    http: 3,
    debug: 4,
  },
};

const winstonLoggerDev = winston.createLogger({
  levels: myCustonlevels.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
    }),
  ],
});

const winstonLoggerProd = winston.createLogger({
  levels: myCustonlevels.levels,
  transports: [
    new winston.transports.File({
      level: "debug",
      filename: "events.log",
    }),
  ],
});

export let winstonLogger;

if (process.env.ENTORNO_DESARROLLO === "developer") {
  winstonLogger = winstonLoggerDev;
} else {
  winstonLogger = winstonLoggerProd;
}
