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

// Dynamic gallery route
router.get('/:galleryName', (req, res) => {
    const galleryName = req.params.galleryName;

    res.render('gallery-details', {
        galleryName,
        currentGalleryUrl: `/${galleryName.toLowerCase()}`,
    });
});

module.exports = router;
