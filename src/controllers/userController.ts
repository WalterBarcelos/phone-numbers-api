import { Request, Response } from 'express';
import User from '../models/User';
import { handleError } from '../utils/errorHandler';
import jwt from 'jsonwebtoken';
import PhoneNumber from '../models/PhoneNumber';
import Organization from '../models/Organization';

export const login = (req: Request, res: Response) => {
    // For simplicity, assume username and password are sent in the request body
    const { username, password } = req.body;
    // Getting fake data from env vars to simulate user check
    // It should come from DB or even better, using an external service like keycloak
    if (username === process.env.JWT_USERNAME && password === process.env.JWT_PASSWORD) {
      // Mock user data for demonstration
      const user = {
        id: 1,
        username: 'user',
        email: 'user@example.com',
      };
  
      // Generate JWT token
      const token = jwt.sign({ user }, process.env.JWT_SECRET || 'defaultjwtsecret', { expiresIn: '1h' });
  
      // Respond with token
      res.json({ token });
    } else {
      // Unauthorized
      res.status(401).json({ message: 'Invalid credentials' });
    }
  };

  export const getUsersWithPhoneNumber = async (req: Request, res: Response) => {
    try {
        const { organizationId } = req.body;

        // Check if the organization exists
        const existingOrganization = await Organization.findById(organizationId);
        if (!existingOrganization) {
            return res.status(404).json({ error: 'Organization not found.' });
        }

        // Find users for the given organizationId and populate the 'phoneNumbers' field
        const users = await User.find({ organizationId }).populate('phoneNumbers').exec();

        // Send the users with populated phone numbers as response
        res.json({ users });
    } catch (error) {
        // Handle error using custom error handler
        handleError(res, error);
    }
};

export const allocatePhoneNumber = async (req: Request, res: Response) => {
    try {
        const { idPassport, name, surname, organizationId } = req.body;

        const existingOrganization = await Organization.findOne({ organizationId });
        if (existingOrganization) {
            throw new Error('Organization not found.');
        }

        const existingUser = await User.findOne({ idPassport, name, surname });
        if (existingUser) {
            throw new Error('User already has a number allocated.');
        }

        const phoneRecord = await PhoneNumber.findOne({ allocatedTo: null });
        if (!phoneRecord) {
            throw new Error('No available phone numbers.');
        }

        await User.create({ idPassport, name, surname, organizationId, phoneNumbers: [phoneRecord._id] });
        await PhoneNumber.findByIdAndUpdate(phoneRecord._id, { allocatedTo: idPassport });
    
        res.json({ message: 'Phone number allocated successfully.' });

    } catch (error) {
        handleError(res, error);
    }
};

export const deallocatePhoneNumber = async (req: Request, res: Response) => {
    const idPassport = req.params.idPassport;

    try {
        const existingUser = await User.findOne({ idPassport });
        if (! existingUser) {
            throw new Error('User not found.');
        }

        const phoneRecord = await PhoneNumber.findOne({ allocatedTo: idPassport });
        if (!phoneRecord) {
            throw new Error('No allocated number found for this user.');
        }
        // Deallocate phone number logic
        await PhoneNumber.updateOne({allocatedTo:idPassport}, { $set: { allocatedTo: null } });
        await User.deleteOne({ idPassport });

        res.json({ message: 'Phone number deallocated successfully' });
    } catch (error) {
        handleError(res, error);
    }
};
