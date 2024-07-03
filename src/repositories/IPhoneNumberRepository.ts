import { PhoneNumberDocument } from '../models/PhoneNumber';

export interface IPhoneNumberRepository {
  findByNumber(number: string): Promise<PhoneNumberDocument | null>;
  findAllAvailable(): Promise<PhoneNumberDocument[] | null>;
  findFirstAvailable(): Promise<PhoneNumberDocument | null>;
  updateAllocation(phoneNumber: string, idPassport: string | null): Promise<void>;
}