const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');
const common = require('../common')
require("winston-daily-rotate-file");

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const customFormat = format.combine(
  format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
  format.align(),
  format.label({ label: path.basename(process.mainModule.filename) }),
  format.printf((info) => `${common.formatTime('dateTime', info.timestamp, true)} ${info.level} ${info.message.replaceAll('\t', '')}`),
)

const defaultOptions = {
  format: customFormat,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
}
const filename = path.join(logDir, `${common.formatTime('date', new Date(), true)}.log`)

const logger = createLogger({
  // change level if in dev environment versus production
  level: env === 'production' ? 'info' : 'debug',
  format: customFormat,
  transports: [
    new transports.Console({
      ...customFormat
    }),
    new transports.File({
      filename,
      ...defaultOptions
    })
  ]
});

module.exports = logger;