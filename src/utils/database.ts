import mongoose from 'mongoose';
import PhoneNumber from '../models/PhoneNumber';
import Organization from '../models/Organization';

export class Database {
  private static instance: Database;

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  /**
   * Create some fake data on DB so we can test the endpoints
   */
  private async createFakeData() {
    // Init fake data
    const exists = await PhoneNumber.countDocuments();
    if (exists === 0) {
      const phoneNumbers = [
        { number: '123-456-7890', allocatedTo: null },
        { number: '123-456-7891', allocatedTo: null },
        { number: '123-456-7892', allocatedTo: null },
      ];
      await PhoneNumber.insertMany(phoneNumbers);
    } else {
      console.log('Phone numbers already initialized');
    }

    const existOrgs = await Organization.countDocuments();
    if (existOrgs === 0) {
      const organizations = [
        { name:'Org1' },
        { name:'Org2' },
        { name:'Org3' },
      ];
      await Organization.insertMany(organizations);
    } else {
      console.log('Organizations already initialized');
    }

  }

  async connect(): Promise<void> {
    try {

      const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/phone-number-management';

      await mongoose.connect(uri, {
        socketTimeoutMS:45000,
        connectTimeoutMS:45000
      }).then(() => this.createFakeData());

      console.log('Database connected successfully');

    } catch (err) {
      console.error('Database connection error:', err);
    }
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }

}
