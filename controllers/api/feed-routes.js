const router = require('express').Router();
const { Feed } = require('../../models');

router.get('/feed', async (req, res) => {
    // have this include: Comments.
    const feedData = await Feed.findAll();

    const feeds = feedData.map(feed => feed.get({ plain: true }));

    res.render('Add the handlebars page name here?', { feeds });
})


