import cors from 'cors';
import express from 'express';
import compress from 'compression';
import helmet from 'helmet';
import httpContext from 'express-http-context';
import { v4 as  uuidv4 } from 'uuid';

import logger from '../helpers/Logger';

class Http {
  public static mount(_express: express.Application): express.Application {
    logger.info('Booting \'HTTP\' middleware');

    _express.use(cors());
    _express.use(compress());
    _express.use(helmet());
    _express.use(express.json({
      limit: '10mb'
    }));

    _express.use(express.urlencoded({
      limit: '10mb',
      extended: true
    }));

    _express.use(httpContext.middleware);

    _express.use((req, res, next) => {
      let requestId = req.headers['x-request-id'] || req.headers['traceid'] || uuidv4();
      res.setHeader('X-Request-Id', requestId);
      httpContext.set('requestId', requestId);
      next();
    });

    return _express;
  }
}

export default Http;
