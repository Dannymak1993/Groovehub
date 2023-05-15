const sequelize = require('../config/connection');
const seedGallery = require('./galleryData');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedGallery();

    process.exit(0);
};

seedAll();
