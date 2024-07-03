import app from './app';
import { Database } from './utils/database';
import swaggerSetup from './swagger';

const PORT = process.env.PORT || 3000;

// Swagger setup
swaggerSetup(app);

// Connect to DB and start server
const db = Database.getInstance();
db.connect().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  });