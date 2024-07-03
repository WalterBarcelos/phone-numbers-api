import PhoneNumber, { PhoneNumberDocument } from '../../models/PhoneNumber';
import { IPhoneNumberRepository } from '../IPhoneNumberRepository';

export class PhoneNumberRepository implements IPhoneNumberRepository {
  async findFirstAvailable(): Promise<PhoneNumberDocument | null> {
    return PhoneNumber.findOne({ allocatedTo: null }).exec();
  }

  async findByNumber(number: string): Promise<PhoneNumberDocument | null> {
    return PhoneNumber.findOne({ number: number }).exec();
  }

  async findAllAvailable(): Promise<PhoneNumberDocument[] | null> {
    return PhoneNumber.find({ allocatedTo: null }).exec();
  }

  async updateAllocation(phoneNumber: string, idPassport: string | null): Promise<void> {
    await PhoneNumber.updateOne({ number: phoneNumber }, { allocatedTo: idPassport }).exec();
  }
}