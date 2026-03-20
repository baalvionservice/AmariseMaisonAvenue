import { Request, Response, NextFunction } from 'express';
import * as response from '../utils/response';

export const validateToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return response.error(res, 'Unauthorized: No token provided', 401);
  }

  // MOCK: In production, verify JWT via firebase-admin auth
  const token = authHeader.split('Bearer ')[1];
  
  if (token === 'mock-jwt-token') {
    req.user = {
      id: 'usr_mock_001',
      role: 'admin',
      email: 'admin@amarise.com'
    };
    return next();
  }

  return response.error(res, 'Unauthorized: Invalid token', 401);
};
