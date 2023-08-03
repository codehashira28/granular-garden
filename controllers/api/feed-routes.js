const router = require('express').Router();
const { Feed } = require('../../models');

router.get('/', async (req, res) => {
    // have this include: Comments.
    const feedData = await Feed.findAll();

    res.status(200).json(feedData);
})


module.exports = router;