import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConInstance } from "../postgresCon";
import Movies from "./movie-model";
import Users from "./user-model";

interface TagsAttributes {
  id: number;
  user_id: number;
  movie_id: number;
  tag: string;
  timestamp: Date;
  created_at: Date;
  updated_at: Date;
}

interface TagsCreationAttributes extends Optional<TagsAttributes, "id"> {
  user_id: number;
  movie_id: number;
  tag: string;
}

const sequelize = sequelizeConInstance();

class Tags
  extends Model<TagsAttributes, TagsCreationAttributes>
  implements TagsAttributes {
  declare id: number;
  declare user_id: number;
  declare movie_id: number;
  declare tag: string;
  declare timestamp: Date;
  declare created_at: Date;
  declare updated_at: Date;
}

Tags.init(
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
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Tags",
    timestamps: false,
    freezeTableName: true,
  }
);


await sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("Tags table created");
  })
  .catch((err) => {
    console.log("Error creating Tags table", err);
  });

export default Tags;
