const express = require('express');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/tasks');
const sequelize = require('./lib/db');

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());

// Veritabanı bağlantısı
sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.error('Database connection failed:', err));

// Modelleri senkronize et
sequelize.sync({ alter: true })
  .then(() => console.log('Database synced!'))
  .catch((err) => console.error('Failed to sync database:', err));

// Routes
app.use('/api/tasks', tasksRouter);

// Sunucu başlat
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
