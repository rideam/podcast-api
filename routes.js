const express = require('express');
const router = express.Router();
const podcastRoutes = require('./podcasts/podcast.route');

router.use('/podcasts', podcastRoutes);


module.exports = router;
