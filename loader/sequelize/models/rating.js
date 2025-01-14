'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rating.init({
    user_id: DataTypes.INTEGER,
    movie_id: DataTypes.INTEGER,
    rating: DataTypes.DECIMAL,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};