const sequelize = require('../config/connection');
const { User,  } = require('../models');
const seedFeed = require('./songData');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await seedFeed();

    process.exit(0);
};

seedDatabase();