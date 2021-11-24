const DataTypes = require("sequelize").DataTypes;
const _Podcast = require("./podcasts/podcast.model");

function initModels(sequelize) {
  const Podcast = _Podcast(sequelize, DataTypes)
  return {
    Podcast
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
