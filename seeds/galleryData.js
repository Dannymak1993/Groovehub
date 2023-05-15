const { Gallery } = require('../models');

const gallerydata = [
    {
        name: 'Electronic',
        playlistId: '5MLf6MBHHs6YDtTERE66RS',
    },
    {
        name: 'Hip Hop',
        playlistId: '2Z2WhCLV5yILWQabtriCiG',
    },
    {
        name: 'Classical',
        playlistId: '3CBWk7vCr7QhbDMAaOF8Ej',
    },
    {
        name: 'Jazz',
        playlistId: '0L1MSYfkwfRMbDrt7p7Dd1',
    },
    {
        name: 'Anime',
        playlistId: '13D1ZGY11YGeUSVGosTy6K',
    },
    {
        name: 'K-pop',
        playlistId: '5X0GlUpZje14AdggmJbPVb',
    },
    {
        name: 'Rock',
        playlistId: '2eH2OlE2CWb50U7GrL2m65',
    },
    {
        name: 'Country',
        playlistId: '25gZy93qSKa7eqwNnWtNao',
    },
    {
        name: 'Disney',
        playlistId: '13YukHnAvQGCVzhEVaXqgY',
    },
];

const seedGallery = () => Gallery.bulkCreate(gallerydata);

module.exports = seedGallery;
