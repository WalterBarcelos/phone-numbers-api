import express from 'express';
import userRoutes from './routes/userRoutes';
import phoneNumberRoutes from './routes/phoneNumberRoutes';
import organizationRoutes from './routes/organizationRoutes';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON body
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/phone-numbers', phoneNumberRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Phone Number API is running');
});

export default app;