const router = require('express').Router();

const userRoutes = require('./user-routes');
// add more const here 

router.use('/users', userRoutes);
// add more router.use here

module.exports = router;