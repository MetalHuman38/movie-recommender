'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie.init({
    movie_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    genres: DataTypes.STRING,
    user: DataTypes.INTEGER,
    imdb_id: DataTypes.STRING,
    tmdb_id: DataTypes.STRING,
    poster_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};