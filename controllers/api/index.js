const router = require('express').Router();

const userRoutes = require('./user-routes');
const feedRoutes = require('./feed-routes');
const uploadRoutes = require('./upload-route')

router.use('/users', userRoutes);
router.use('/feed', feedRoutes);
router.use('/upload', uploadRoutes)

module.exports = router;