const router = require('express').Router();
const { Feed, Comment } = require('../../models');

// Get all songs for feed
router.get('/', async (req, res) => {
    // have this include: Comments.
    try {const feedData = await Feed.findAll({
        include: [{model: Comment, as: 'comment'}]
    });
    res.status(200).json(feedData);
} catch (error) {
    console.error('Error fetching feed data:', error);
    res.status(500).json({ error: 'Error fetching feed data' })
};

});

router.get('/track/:feed_id', async (req,res) => {
    try {
        const feedId = req.params.feed_id
        const feedData = await Feed.findByPk(feedId, {
            include: [{model: Comment, as: 'comment'}]
        });

        res.render('track-details', { feedData })

    } catch (error) {
        console.error('Error fetching track details:', error);
        res.status(500).json({ error: 'Error fetching track details' })
    }
})

router.post('/comment/add/:feed_id', async (req,res) => {
    try {
        const { feedId } = req.params
        const { commentText } = req.body
        const newComment = await Comment.create({
            text: commentText,
            feed_id: feedId
        });

        const updatedFeedData = await Feed.findByPk(feedId, {
            include: [{model: Comment, as: 'comment'}]
        }); 

        res.status(201).json(updatedFeedData);

    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Error adding comment' })
    };
})


module.exports = router;