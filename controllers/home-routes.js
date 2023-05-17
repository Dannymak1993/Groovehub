const router = require('express').Router();
const { Gallery } = require('../models');
const withAuth = require('../utils/auth');

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
       
        res.render('homepage', {
            galleries,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get one gallery
router.get('/gallery/:id', withAuth, async (req, res) => {
    try {
        const dbGalleryData = await Gallery.findByPk(req.params.id, {});
        const gallery = dbGalleryData.get({ plain: true });
        console.log(gallery);
        res.render('playlist', { gallery, loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err+"this is the problem");
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
