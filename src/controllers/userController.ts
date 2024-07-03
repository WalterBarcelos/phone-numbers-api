// src/controllers/userController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AllocatePhoneNumberDTO } from '../dtos/allocatePhoneNumberDto';
import { DeallocatePhoneNumberDTO } from '../dtos/deallocatePhoneNumberDto';
import { PhoneNumberService } from '../services/phoneNumberService';
import { handleError } from '../utils/errorHandler';

const phoneNumberService = new PhoneNumberService();

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (username === process.env.JWT_USERNAME && password === process.env.JWT_PASSWORD) {
      const user = {
        id: 1,
        username: 'user',
        email: 'user@example.com',
      };

      const token = jwt.sign({ user }, process.env.JWT_SECRET || 'defaultjwtsecret', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export const allocatePhoneNumber = async (req: Request, res: Response) => {
  try {
    const dto: AllocatePhoneNumberDTO = req.body;
    await phoneNumberService.allocatePhoneNumber(dto);
    res.json({ message: 'Phone number allocated successfully.' });
  } catch (error) {
    handleError(res, error);
  }
};

export const deallocatePhoneNumber = async (req: Request, res: Response) => {
  try {
    const idPassport = req.params.idPassport;
    const dto: DeallocatePhoneNumberDTO = { idPassport };
    await phoneNumberService.deallocatePhoneNumber(dto);
    res.json({ message: 'Phone number deallocated successfully' });
  } catch (error) {
    handleError(res, error);
  }
};
