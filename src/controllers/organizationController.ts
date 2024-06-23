import { Request, Response } from 'express';
import PhoneNumber from '../models/Organization';
import { handleError } from '../utils/errorHandler';
import Organization from '../models/Organization';

export const getOrganizations = async (req: Request, res: Response) => {
    try {
        const organizations = await Organization.find({});
        res.json(organizations);
    } catch (error) {
        handleError(res, error);
    }

};