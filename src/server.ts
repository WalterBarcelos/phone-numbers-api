import app from './app';
import { connectToDatabase } from './services/dataBaseService';
import swaggerSetup from './swagger';

const PORT = process.env.PORT || 3000;

// Swagger setup
swaggerSetup(app);

// Connect to MongoDB and start server
connectToDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  });