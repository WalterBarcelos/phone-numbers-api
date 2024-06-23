import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: { [key: string]: any }; // We could add more fields here
}
