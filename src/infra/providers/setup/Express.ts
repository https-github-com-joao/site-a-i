import 'reflect-metadata';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import cors from 'cors';

import { config } from '../../../config';
import { initContainer } from '../../../core/container';
import Routes from './Routes';
import Bootstrap from '../../../common/middlewares/Bootstrap';
import ExceptionHandler from '../../../common/exception/Handler';
import logger from '../../../common/helpers/Logger';

const dirControllers = __dirname + '/../../../adapter/controllers';

let paths = readdirSync(dirControllers)
  .filter(i => {
    return lstatSync(join(dirControllers, i)).isFile() && /Controller\...$/.test(i);
  });

paths.map((i: string) => require(`${dirControllers}/${i}`));

class Express {
  private mountDependencies (): express.Application {
    let container = initContainer();
    let server = new InversifyExpressServer(container)
      .setConfig(app => {
        app.use(cors());
        app.use(express.json({
          limit: '10mb'
        }));
    
        app.use(express.urlencoded({
          limit: '10mb',
          extended: true
        }));
      })
      .build();

    return server;
  }

  private mountMiddlewares (express: express.Application): express.Application {
    return Bootstrap.init(express);
  }

  private mountRoutes (express: express.Application): express.Application {
    return Routes.mountApi(express);
  }

  public init (): any {
    const port: number = config.port as number;
    
    let express = this.mountDependencies();

    this.mountMiddlewares(express);
    this.mountRoutes(express);

    express.use(ExceptionHandler.logErrors);
    express.use(ExceptionHandler.clientErrorHandler);
    express.use(ExceptionHandler.errorHandler);

    express = ExceptionHandler.notFoundHandler(express);

    express.listen(port, () => {
      logger.info(`Express server listening on port ${port} : ${config.environment}`);

      console.log('------------------------------------------------------------');
      console.log(`Express server listening on port ${port} : ${config.environment}`);
      console.log('------------------------------------------------------------');
    });
  }
}

export default new Express();
