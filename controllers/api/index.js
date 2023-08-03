const router = require('express').Router();

const userRoutes = require('./user-routes');
// add more const here 

const feedRoutes = require('./feed-routes');

router.use('/users', userRoutes);
// add more router.use here

router.use('/feed', feedRoutes);

module.exports = router;