import { AllocatePhoneNumberDTO } from '../dtos/allocatePhoneNumberDto';
import { UserDocument } from '../models/User';

export interface IUserRepository {
  findByPassportAndName(idPassport: string, name: string, surname: string): Promise<UserDocument | null>;
  create(userDto: AllocatePhoneNumberDTO): Promise<UserDocument>;
  deleteByIdPassport(idPassport: string): Promise<void>;
  findUserById(userId: string): Promise<UserDocument | null>;
  findUserByIdPassport(idPassport: string): Promise<UserDocument | null>;
  getUsersWithPhoneNumber(organizationId: string): Promise<UserDocument[]>;
}