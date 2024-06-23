import { Request, Response } from 'express';
import PhoneNumber from '../models/PhoneNumber';
import { handleError } from '../utils/errorHandler';

export const getAvailableNumbers = async (req: Request, res: Response) => {
    try {
        const availableNumbers = await PhoneNumber.find({ allocatedTo: null });
        res.json(availableNumbers);
    } catch (error) {
        handleError(res, error);
    }

};
