const express = require('express');
const router = express.Router();
const podcastController = require('./podcast.controller');

router.post('/', podcastController.addPodcast);
router.get('/', podcastController.findPodcasts);
router.get('/:id', podcastController.findPodcastById);
router.put('/:id', podcastController.updatePodcast);
router.delete('/:id', podcastController.deleteById);

module.exports = router;
