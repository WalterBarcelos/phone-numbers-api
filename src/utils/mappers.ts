import { UserDocument } from '../models/User';
import { UserDto } from '../dtos/userDto';

export function mapUserToDto(user: UserDocument): UserDto {
  return {
    idPassport: user.idPassport,
    name: user.name,
    surname: user.surname,
    phoneNumber: user.phoneNumber ? user.phoneNumber.toString() : '', // Convert ObjectId to string
  };
}