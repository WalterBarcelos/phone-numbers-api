import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../customTypes';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultjwtsecret';

export const jwtAuthMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { [key: string]: any };
    req.user = decoded; // Decoded token to be used in controllers or routes
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Failed to authenticate' });
  }
};
