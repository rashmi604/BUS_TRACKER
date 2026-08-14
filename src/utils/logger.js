export const LogLevel = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

export class Logger {
  constructor(name) {
    this.name = name;
  }

  log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      name: this.name,
      message,
      data,
    };
    console.log(JSON.stringify(logEntry));
  }

  debug(message, data) {
    this.log(LogLevel.DEBUG, message, data);
  }

  info(message, data) {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message, data) {
    this.log(LogLevel.WARN, message, data);
  }

  error(message, data) {
    this.log(LogLevel.ERROR, message, data);
  }
}
