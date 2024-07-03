import { IUserRepository } from '../IUserRepository';
import { AllocatePhoneNumberDTO } from '../../dtos/allocatePhoneNumberDto';
import User, { UserDocument } from '../../models/User';
import { PhoneNumberRepository } from './PhoneNumberRepository';

export class UserRepository implements IUserRepository {
    async findByPassportAndName(idPassport: string, name: string, surname: string): Promise<UserDocument | null> {
        return User.findOne({ idPassport, name, surname }).exec();
      }

    async create(userDto: AllocatePhoneNumberDTO): Promise<UserDocument> {
      const newUser = new User({
        idPassport: userDto.idPassport,
        name: userDto.name,
        surname: userDto.surname,
        organizationId: userDto.organizationId,
        phoneNumber: userDto.phoneNumber, // Store single phone number
      });

      console.log("NEW USER", newUser);
  
      return newUser.save(); // Use save() to trigger Mongoose middleware (like validators)
    }
  
    async deleteByIdPassport(idPassport: string): Promise<void> {
      await User.deleteOne({ idPassport }).exec();
    }

    async findUserByIdPassport(idPassport: string): Promise<UserDocument | null> {
      return User.findOne({ idPassport }).exec();
    }

    async findUserById(userId: string): Promise<UserDocument | null> {
      return User.findById(userId).exec();
    }

    async getUsersWithPhoneNumber(organizationId: string): Promise<UserDocument[]> {
      return User.find({ organizationId }).exec();
    }
}
