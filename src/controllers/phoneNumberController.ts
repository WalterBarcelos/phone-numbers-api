import { Request, Response } from 'express';
import { IPhoneNumberRepository } from '../repositories/IPhoneNumberRepository';
import { PhoneNumberRepository } from '../repositories/mongo/PhoneNumberRepository';
import { handleError } from '../utils/errorHandler';

const phoneNumberRepository: IPhoneNumberRepository = new PhoneNumberRepository();

export const getAvailableNumbers = async (req: Request, res: Response) => {
  try {
    const availableNumbers = await phoneNumberRepository.findAllAvailable();
    // Mapping results to return only phone numbers instead of objects
    const numbers = availableNumbers == null ? [] : availableNumbers.map((phoneNumber) => phoneNumber.number);
    res.json(numbers);
  } catch (error) {
    handleError(res, error);
  }
};