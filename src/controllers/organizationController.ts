import { Request, Response } from 'express';
import { IUserRepository } from '../repositories/IUserRepository';
import { IOrganizationRepository } from '../repositories/IOrganizationRepository';
import { UserRepository } from '../repositories/mongo/UserRepository';
import { OrganizationRepository } from '../repositories/mongo/OrganizationRepository';
import { handleError } from '../utils/errorHandler';
import { mapUserToDto } from '../utils/mappers';
import { UserDto } from '../dtos/userDto';

const userRepository: IUserRepository = new UserRepository();
const organizationRepository: IOrganizationRepository = new OrganizationRepository();

export const getOrganizations = async (req: Request, res: Response) => {
  try {
    const organizations = await organizationRepository.findAll();
    res.json(organizations);
  } catch (error) {
    handleError(res, error);
  }
};

export const getUsersWithPhoneNumber = async (req: Request, res: Response) => {
    try {
      const organizationId = req.params.organizationId;
      console.log('getUsersWithPhoneNumber Organization ID: ' + organizationId);
  
      // Check if the organization exists
      const existingOrganization = await organizationRepository.findById(organizationId);
      if (!existingOrganization) {
        return res.status(404).json({ error: 'Organization not found.' });
      }
  
      // Find users for the given organizationId and populate the 'phoneNumbers' field
      const users = await userRepository.getUsersWithPhoneNumber(organizationId);

      // Map users to UserDto
      const userDtos: UserDto[] = users.map(mapUserToDto);

      // Send the users as response
      res.json({ users: userDtos });
    } catch (error) {
      // Handle error using custom error handler
      handleError(res, error);   
    }
}