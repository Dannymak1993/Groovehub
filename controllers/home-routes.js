const router = require('express').Router();
const { Gallery } = require('../models');

router.get('/', async (req, res) => {
    try {
        const dbGalleryData = await Gallery.findAll();

        const galleries = dbGalleryData.map((gallery) => {
            const galleryObj = gallery.get({ plain: true });
            return {
                ...galleryObj,
                imageSrc: `/images/${galleryObj.name}.jpg`, // Add image source path
            };
        });

        const showPlaylist = Array(galleries.length).fill(false);

        res.render('homepage', {
            galleries,
            showPlaylist,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
