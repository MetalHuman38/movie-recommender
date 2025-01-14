import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConInstance } from "../postgresCon";
import Movies from "./movie-model";

interface LinksAttributes {
  id: number;
  movie_id: number;
  imdb_id: number;
  tmdb_id: number;
  created_at: Date;
  updated_at: Date;
}

interface LinksCreationAttributes extends Optional<LinksAttributes, "id"> {
  movie_id: number;
  imdb_id: number;
  tmdb_id: number;
}

const sequelize = sequelizeConInstance();

class Links
  extends Model<LinksAttributes, LinksCreationAttributes>
  implements LinksAttributes {
  declare id: number;
  declare movie_id: number;
  declare imdb_id: number;
  declare tmdb_id: number;
  declare created_at: Date;
  declare updated_at: Date;
}

Links.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Movies",
        key: "id",
      },
    },
    imdb_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tmdb_id: {
      type: DataTypes.INTEGER,
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
    tableName: "Links",
    timestamps: false,
    freezeTableName: true,
  }
);

await sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("Links table created successfully");
  })
  .catch((err) => {
    console.log("Error Syncing Tags table", err);
  });


export default Links;


