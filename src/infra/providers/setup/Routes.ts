import { Application } from 'express';
import { config } from '../../../config';
import logger from '../../../common/helpers/Logger';

class Routes {
  public mountApi(_express: Application) {
    logger.info('Routes : Mounting API Routes');

    //_express.use(${config.apiPrefix}, apiRouter);

    _express.get('/', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({});
    });

    _express.get('/favicon.ico', function(req, res) { 
      res.status(204);
      res.end();    
    });

    return _express;
  }
}

export default new Routes;
