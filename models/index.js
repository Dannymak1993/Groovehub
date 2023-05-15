const User = require('./User');
const Gallery = require('./Gallery');

Gallery.hasMany(User, {
    foreignKey: 'gallery_id',
});

User.belongsTo(Gallery, {
    foreignKey: 'gallery_id',
});

module.exports = { User, Gallery };

