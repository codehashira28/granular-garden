const router = require('express').Router();
const { Feed, Comment } = require('../models');
const withAuth = require('../utils/auth');

const serialize = (data) => JSON.parse(JSON.stringify(data));


// Home Page
router.get('/', (req, res) => {
    res.render('homepage', { pageTitle: 'Home' });
});

// Login Page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/feed');
      return;
    }
  
    res.render('login', { pageTitle: 'Login', loggedIn: req.session.loggedIn });
  });

// Signup Page
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/feed');
        return;
    }

    res.render('signup', { pageTitle: 'Signup', loggedIn: req.session.loggedIn, signup: true });
});

// Upload Page
router.get('/upload', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        try {
            res.render('upload', { pageTitle: 'Upload', loggedIn: req.session.loggedIn });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

// Feed Page
router.get('/feed', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        try {
            const dbSongData = await Feed.findAll();
            const songs = dbSongData.map(feed => feed.get({ plain: true }));

            res.render('feed', { songs, pageTitle: 'Feed', loggedIn: req.session.loggedIn, feed: true });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

router.get('/feed/:creator/:title', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        try {
            const dbSongData = await Feed.findOne({
                where: {
                    creator: req.params.creator,
                    title: req.params.title
                },
                order: [[{ model: Comment }, 'id', 'DESC']],
                include: [Comment]
            });

            if (!dbSongData) {
                // Handle case when song is not found
                res.status(404).render('404', { pageTitle: 'Not Found' });
                return;
            }

            const song = dbSongData.get({ plain: true });

            res.render('track-details', { song, pageTitle: 'Track Details', loggedIn: req.session.loggedIn, trackDetails: true });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});


// Profile Page (requires authentication)
router.get('/profile', withAuth, async (req, res) => {
    try {
        const dbSongData = await Feed.findAll({
            where: {
                creator: req.session.userId,
            },
            order: [['id']],
        });

        const songdata = serialize(dbSongData); 
        res.render('profile', {
            songdata,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
