import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../.env') });

import App from './infra/providers/setup/App';

App.loadConfiguration();
App.loadDatabase();
App.loadServer();
