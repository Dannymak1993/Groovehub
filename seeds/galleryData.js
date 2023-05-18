const { Gallery } = require('../models');

const gallerydata = [
    {
        name: 'Anime',
        playlistId: '13D1ZGY11YGeUSVGosTy6K',
        genre: 'Anime',
    },
    {
        name: 'Classical',
        playlistId: '3CBWk7vCr7QhbDMAaOF8Ej',
        genre: 'Classical',
    },
    {
        name: 'Country',
        playlistId: '25gZy93qSKa7eqwNnWtNao',
        genre: 'Country',
    },
    {
        name: 'Disney',
        playlistId: '13YukHnAvQGCVzhEVaXqgY',
        genre: 'Disney',
    },
    {
        name: 'Electronic',
        playlistId: '5MLf6MBHHs6YDtTERE66RS',
        genre: 'Electronic',
    },
    {
        name: 'Hip Hop',
        playlistId: '2Z2WhCLV5yILWQabtriCiG',
        genre: 'Hip Hop',
    },
    {
        name: 'Jazz',
        playlistId: '0L1MSYfkwfRMbDrt7p7Dd1',
        genre: 'Jazz',
    },
    {
        name: 'K-pop',
        playlistId: '5X0GlUpZje14AdggmJbPVb',
        genre: 'K-pop',
    },
    {
        name: 'Rock',
        playlistId: '2eH2OlE2CWb50U7GrL2m65',
        genre: 'Rock',
    },
];

const seedGallery = () => Gallery.bulkCreate(gallerydata);

module.exports = seedGallery;
