import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConInstance } from "../postgresCon";
import Ratings from "./ratings-model";
import Tags from "./tags-model";
import Links from "./links-model";

interface MovieAttributes {
  id: number;
  movie_id: number;
  genres: string;
  user: string;
  imdb_id: string;
  tmdb_id: string;
  poster_url: string;
  description: string;
  title: string;
  year: number;
  rating: number;
  genre: string;
  director: string;
  plot: string;
  created_at: Date;
  updated_at: Date;
}

interface MovieCreationAttributes extends Optional<MovieAttributes, "id"> {
  title: string;
  year: number;
  rating: number;
  genre: string;
  director: string;
  plot: string;
  poster: string;
}

const sequelize = sequelizeConInstance();

class Movies
  extends Model<MovieAttributes, MovieCreationAttributes>
  implements MovieAttributes {
  declare id: number;
  declare movie_id: number;
  declare genres: string;
  declare user: string;
  declare imdb_id: string;
  declare tmdb_id: string;
  declare poster_url: string;
  declare description: string;
  declare title: string;
  declare year: number;
  declare rating: number;
  declare genre: string;
  declare director: string;
  declare plot: string;
  declare poster: string;
  declare created_at: Date;
  declare updated_at: Date;
}

Movies.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imdb_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tmdb_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poster_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plot: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Movies",
    timestamps: false,
    freezeTableName: true,
  }
);


await sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("Movies table created successfully");
  })
  .catch((err: Error) => {
    console.error("Error syncing Movies table:", err);
  });

export default Movies;