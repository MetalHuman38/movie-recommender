import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConInstance } from "../postgresCon";
import Movies from "./movie-model";
import Users from "./user-model";

interface RatingsAttributes {
  id: number;
  user_id: number;
  movie_id: number;
  timestamp: Date;
  rating: number;
  created_at: Date;
  updated_at: Date;
}

interface RatingsCreationAttributes extends Optional<RatingsAttributes, "id"> {
  user_id: number;
  movie_id: number;
  rating: number;
}

const sequelize = sequelizeConInstance();

class Ratings
  extends Model<RatingsAttributes, RatingsCreationAttributes>
  implements RatingsAttributes {
  declare id: number;
  declare user_id: number;
  declare movie_id: number;
  declare timestamp: Date;
  declare rating: number;
  declare created_at: Date;
  declare updated_at: Date;
}

Ratings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Movies",
        key: "id",
      },
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rating: {
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
    tableName: "Ratings",
    timestamps: false,
    freezeTableName: true,
  }
);

await sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("Ratings table created successfully");
  })
  .catch((err: Error) => {
    console.error("Error syncing Ratings table:", err);
  });

export default Ratings;


