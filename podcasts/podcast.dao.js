const db = require('../database');
const initModels = require("../models");
const models = initModels(db);

let podcastDao = {
  findAll,
  create,
  findById,
  deleteById,
  updatePodcast
}


function findAll() {
  return models.Podcast.findAll();
}

function findById(pk) {
  return models.Podcast.findByPk(pk);
}

function deleteById(pk) {
  return models.Podcast.destroy({where: {pk: pk}});
}

function create(podcast) {
  let newPodcast = new models.Podcast(podcast);
  return newPodcast.save();
}

function updatePodcast(podcast, pk) {
  let data = {
    title: podcast.title,
    link: podcast.link,
    presenter: podcast.presenter
  };
  return models.Podcast.update(data, {where: {pk: pk}});
}

module.exports = podcastDao;
