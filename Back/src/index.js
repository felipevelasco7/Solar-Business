require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./config/db');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
  // sync models - use alter to update existing tables to match models (adds new columns safely)
  await sequelize.sync({ alter: true }); // for dev: use migrations in production
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Unable to start server', err);
    process.exit(1);
  }
})();