import jwt from 'jsonwebtoken';
import { config } from '../../config';

export const getTokenFromRequest = (req: any): string | undefined => {
  const authorization = req.header('authorization');
  if (!authorization) {
    return;
  }
  return authorization.split(' ')[1]; // Bearer
};

export const getPayload = (req: any): any => {
  const token = getTokenFromRequest(req);
  return token ? jwt.decode(token) : {};
};

export const getUserId = (req: any): any => {
  const data = getPayload(req);
  return data?.sub || null;
};

export const generateToken = (user: any): string => {
  const payload = {
    sub: user.id,
    data: {
      name: user.name,
    },
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, config.appSecretKey, options);
};

export const generateTokenForgotPassword = (email: any): string => {
  const payload = {
    data: {
      email: email,
    },
  };

  const options = {
    expiresIn: 6 * 60 * 60,
  };

  return jwt.sign(payload, config.appSecretKey, options);
};

export const getEmailForgotPassword = (token: string): string | undefined => {
  try {
    const decoded = <any>jwt.verify(token, config.appSecretKey);
    return decoded?.data?.email;
  } catch (err) {
    return;
  }
};

export const middleware = (req: any, res: any, next: () => void) => {
  const token = getTokenFromRequest(req);
  if (token && token.length > 0) {
    jwt.verify(token, config.appSecretKey, (err: any, decoded: any) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          res.status(403).json({ error: 'token_expired' });
        } else {
          res
            .status(401)
            .json({ error: err.message.split(' ').join('_').toLowerCase() });
        }
        return false;
      }
      next();
    });
  } else {
    res.status(401).json({ error: 'no_token' });
    return false;
  }
};
