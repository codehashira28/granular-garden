const router = require('express').Router();
const { where } = require('sequelize');
const { Feed, Comment } = require('../../models');

// Get all songs for feed
router.get('/', async (req, res) => {
    // have this include: Comments.
    try {
        const feedData = await Feed.findAll({
            // include: [{model: Comment, as: 'comment'}]
        });
        res.status(200).json(feedData);
    } catch (error) {
        console.error('Error fetching feed data:', error);
        res.status(500).json({ error: 'Error fetching feed data' })
    };

});

router.get('/:creator/:title', async (req, res) => {
    try {
        const feedData = await Feed.findOne({
            where: {
                creator: req.params.creator,
                title: req.params.title
            },
            include: [{ model: Comment, as: 'comments' }],
        });

        res.status(200).json(feedData);

    } catch (error) {
        console.error('Error fetching track details:', error);
        res.status(500).json({ error: 'Error fetching track details' })
    }
})

// Create a new comment
router.post('/:creator/:title/comments', async (req, res) => {
    try {
        const feed = await Feed.findOne({
            where: {
                creator: req.params.creator,
                title: req.params.title
            },
            include: [Comment]
        });

        if (!feed) {
            res.status(404).json({ message: 'No song found.' });
            return;
        }

        const newComment = await Comment.create({
            text: req.body.text,
            creator: req.session.username,
            feed_id: feed.id
        });

        const comment = newComment.get({ plain: true });

        res.status(201).render('comment', { comment, layout: false });

    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Error creating comment' });
    }
});

// Get all comments for a song
router.get('/:creator/:title/comments', async (req, res) => {
    try {
        const feed = await Feed.findOne({
            where: {
                creator: req.params.creator,
                title: req.params.title
            }
        });

        if (!feed) {
            res.status(404).json({ message: 'No song found.' });
            return;
        }

        const comments = await Comment.findAll({
            where: {
                feed_id: feed.id
            }
        });

        res.status(200).json(comments);

    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Error fetching comments' });
    }
});




module.exports = router;