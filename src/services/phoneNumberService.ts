import { AllocatePhoneNumberDTO } from '../dtos/allocatePhoneNumberDto';
import { DeallocatePhoneNumberDTO } from '../dtos/deallocatePhoneNumberDto';
import { IUserRepository } from '../repositories/IUserRepository';
import { IPhoneNumberRepository } from '../repositories/IPhoneNumberRepository';
import { IOrganizationRepository } from '../repositories/IOrganizationRepository';
import { OrganizationRepository } from '../repositories/mongo/OrganizationRepository';
import { UserRepository } from '../repositories/mongo/UserRepository';
import { PhoneNumberRepository } from '../repositories/mongo/PhoneNumberRepository';

export class PhoneNumberService {
  private userRepository: IUserRepository;
  private phoneNumberRepository: IPhoneNumberRepository;
  private organizationRepository: IOrganizationRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.phoneNumberRepository = new PhoneNumberRepository();
    this.organizationRepository = new OrganizationRepository();
  }

  async allocatePhoneNumber(dto: AllocatePhoneNumberDTO): Promise<void> {
    const { idPassport, name, surname, organizationId } = dto;

    // Check if the organization exists
    const existingOrganization = await this.organizationRepository.findById(organizationId);
    if (!existingOrganization) {
      throw new Error('Organization not found.');
    }

    // Check if the user already exists
    const existingUser = await this.userRepository.findUserByIdPassport(idPassport);
    if (existingUser) {
      throw new Error('User already has a number allocated.');
    }

    // Get the first available phone number
    const phoneRecord = await this.phoneNumberRepository.findFirstAvailable();
    if (!phoneRecord) {
      throw new Error('No available phone numbers.');
    }

    const dtoCreate: AllocatePhoneNumberDTO = {
      idPassport: idPassport,
      name: name,
      surname: surname,
      organizationId: organizationId,
      phoneNumber: phoneRecord.number
    };

    // Insert new user and update phone number with new user id
    await this.userRepository.create(dtoCreate);
    await this.phoneNumberRepository.updateAllocation(phoneRecord.number, idPassport);
  }

  async deallocatePhoneNumber(dto: DeallocatePhoneNumberDTO): Promise<void> {
    const idPassport = dto.idPassport;

    // Check if the user exists
    const existingUser = await this.userRepository.findUserByIdPassport(idPassport);
    if (!existingUser) {
      throw new Error('User not found.' + idPassport);
    }

    // Deallocate phone number
    if (existingUser.phoneNumber) {
      await this.phoneNumberRepository.updateAllocation(existingUser.phoneNumber, null);
      await this.userRepository.deleteByIdPassport(idPassport);
    } else {
      throw new Error('The user does not have a phone number allocated.');
    }
    
  }
}
