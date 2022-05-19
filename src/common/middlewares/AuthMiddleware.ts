import * as express from 'express';
import * as JwtHelper from '../helpers/JwtHelper';

function authMiddlewareFactory() {
  return (config?: { role: string | string[] }) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      (async () => {
        JwtHelper.middleware(req, res, next);
      })();
    };
  };
}

const authMiddleware = authMiddlewareFactory();

export { authMiddleware };
