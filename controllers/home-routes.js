const router = require('express').Router();
const { User, Feed } = require('../models');
const withAuth = require('../utils/auth');


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

  // route to get profile that shows just the users songs
  router.get('/profile', withAuth, async (req, res) => {
    try {
        const dbSongData = await dbSongData.findAll({
            where: {
                creator: req.session.userId,
            },
            order: [
                ['id', 'DESC'],
            ],
        });
        
        const songdata = serialize(dbSongData);
        res.render('profile', {
            songdata: songdata,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;