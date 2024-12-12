const sequelize = require('./lib/db');
const Task = require('./models/Task');

const syncDB = async () => {
  await sequelize.sync({ alter: true });
  console.log('Database synced!');
};

syncDB();
