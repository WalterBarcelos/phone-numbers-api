import mongoose from 'mongoose';
import PhoneNumber from '../models/PhoneNumber';
import Organization from '../models/Organization';

async function createFakeData() {
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

export const connectToDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/phone-number-management';
    
    mongoose.connect(uri, 
      {
        socketTimeoutMS:45000,
        connectTimeoutMS:45000
      }
    )
      .then(() => createFakeData())
      .catch(err => console.error('MongoDB connection error:', err));

    console.log('Connecting to MongoDB: ' + uri);

  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};
