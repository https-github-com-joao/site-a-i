import Express from './Express';
import { Database } from './Database';

import logger from '../../../common/helpers/Logger';

class App {
  public loadConfiguration (): void {
    logger.info('Configuration : loading');
  }

  public loadDatabase (): void {
    logger.info('Database : loading');

    Database.init();
  }

  public loadServer (): void {
    logger.info('Server : loading');

    Express.init();
  }
}

export default new App;
