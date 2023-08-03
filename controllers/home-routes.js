const router = require('express').Router();
const { User, Feed } = require('../models');

router.get('/', async (req, res) => {
    res.render('homepage', { pageTitle: 'Home' });
});

router.get('/login', async (req, res) => {
    res.render('login', { pageTitle: 'Login' });
});

router.get('/signup', async (req, res) => {
    res.render('signup', { pageTitle: 'Signup' });
});

router.get('/feed', async (req, res) => {
    try {
      const dbSongData = await Feed.findAll();
  
      const songs = dbSongData.map((feed) =>
        feed.get({ plain: true })
      );
  
      res.render('feed', { songs, pageTitle: 'Feed' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;