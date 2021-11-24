const podcastDao = require('./podcast.dao')

let podcastController = {
  addPodcast,
  findPodcasts,
  findPodcastById,
  updatePodcast,
  deleteById
}

function addPodcast(req, res) {
  let podcast = req.body;
  podcastDao.create(podcast).then((data) => {
    res.send(data);
  })
    .catch((error) => {
      console.log(error);
    });
}

function findPodcastById(req, res) {
  podcastDao.findById(req.params.id).then((data) => {
    res.send(data);
  })
    .catch((error) => {
      console.log(error);
    });
}

function deleteById(req, res) {
  podcastDao.deleteById(req.params.id)
    .then((data) => {
    res.status(200).json({
      message: "Podcast deleted successfully",
      status: data
    })
  })
    .catch((error) => {
      console.log(error);
    });
}

function updatePodcast(req, res) {
  podcastDao.updatePodcast(req.body, req.params.id).then((data) => {
    res.status(200).json({
      message: "Podcast updated successfully",
      podcast: data
    })
  })
    .catch((error) => {
      console.log(error);
    });
}

function findPodcasts(req, res) {
  podcastDao.findAll().then((data) => {
    res.send(data);
  })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = podcastController;
