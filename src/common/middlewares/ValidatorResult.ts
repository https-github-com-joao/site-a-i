import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { HTTP_STATUS_RESPONSES } from '../helpers/HttpStatusResponse';
import logger from '../helpers/Logger';

export const validatorResult = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('ValidationError', { result: errors.array(), status: HTTP_STATUS_RESPONSES.UNPROCESSABLE_ENTITY });

    return res
      .status(HTTP_STATUS_RESPONSES.UNPROCESSABLE_ENTITY)
      .json({ message: 'Invalid request.', errors: errors.array() });
  }
  return next();
};
