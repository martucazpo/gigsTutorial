const router = require('express').Router();
const gigRoute = require('./gigs');

router.use('/', gigRoute);

module.exports = router;