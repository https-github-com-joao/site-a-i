import winston from 'winston';
import TraceService from '../utils/TraceService';
import { config } from '../../config';

class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp({
          format: 'YYYY-MM-DDTHH:mm:ss.sss'
        }),
        winston.format.align(),
        winston.format.printf(info => {
          return `${info.timestamp} [${info.level}] ${info.stack || info.message} ${(info.data && Object.keys(info.data).length > 0) ? JSON.stringify(info.data) : ''}`;
        })
      ),
      // format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      transports: [
        new winston.transports.File({
          level: 'debug',
          filename: 'log/log.log'
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true
        })
      ],
      exitOnError: false
    });

    if (config.environment !== 'production') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.simple()
      }));
    }
  }

  public info (msg: string, data = {}) {
    this.logger.info(msg, Object.assign({ data: data }, { transactionId: TraceService.getRequestId() }));
  }
  
  public error (msg: string, data = {}) {
    this.logger.error(msg, Object.assign({ data: data }, { transactionId: TraceService.getRequestId() }));
  }
  
  public warn (msg: string, data = {}) {
    this.logger.warn(msg, Object.assign({ data: data }, { transactionId: TraceService.getRequestId() }));
  }
  
  public debug (msg: string, data = {}) {
    this.logger.debug(msg, Object.assign({ data: data }, { transactionId: TraceService.getRequestId() }));
  }
}

export default new Logger();
