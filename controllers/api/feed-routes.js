const router = require('express').Router();
const { Feed, Comment } = require('../../models');

// Get all songs for feed
router.get('/', async (req, res) => {
    // have this include: Comments.
    const feedData = await Feed.findAll({
        include: [Comment]
});

    res.status(200).json(feedData);
})


module.exports = router;