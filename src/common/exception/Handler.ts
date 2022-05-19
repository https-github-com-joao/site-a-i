import express from 'express';
import logger from '../helpers/Logger';

class Handler {
  public static notFoundHandler(_express: express.Application): any {
    _express.use('*', (req, res) => {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

      logger.error(`${req.method} ${req.originalUrl} : route not found : [IP: '${ip}']`);

      return res.send(`Cannot ${req.method} ${req.originalUrl}`);
    });

    return _express;
  }

  public static clientErrorHandler(err: any, req: any, res: any, next: any): any {
    logger.error(err.stack);

    if (req.xhr) {
      return res.status(500).send({ error: 'Something went wrong!' });
    } else {
      return next(err);
    }
  }

  public static errorHandler(err: any, req: any, res: any, next: any): any {
    logger.error(err.stack);
    res.status(500);

    if (err.name && err.name === 'UnauthorizedError') {
      const innerMessage = err.inner && err.inner.message ? err.inner.message : undefined;
      return res.json({
        error: [
          'invalid_token',
          innerMessage
        ]
      });
    }

    return res.json({
      error: err
    });
  }

  public static logErrors(err: any, req: any, res: any, next: any): any {
    logger.error(err.stack);

    return next(err);
  }
}

export default Handler;
