import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConInstance } from "../postgresCon";

interface RegistrationsAttributes {
  id: number;
  new_user: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
}

interface UserRegistrationsCreationAttributes
  extends Optional<RegistrationsAttributes, "id"> { }

const sequelize = sequelizeConInstance();

class Registrations
  extends Model<
    RegistrationsAttributes,
    UserRegistrationsCreationAttributes
  >
  implements RegistrationsAttributes {
  declare id: number;
  declare new_user: string;
  declare username: string;
  declare email: string;
  declare password: string;
  declare created_at: Date;
}

Registrations.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    new_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUnique: async (value: string) => {
          const user = await Registrations.findOne({
            where: { username: value },
          });
          if (user) {
            throw new Error("Username already in use");
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        isUnique: async (value: string) => {
          const user = await Registrations.findOne({
            where: { email: value },
          });
          if (user) {
            throw new Error("Email already in use");
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "Registrations",
    freezeTableName: true,
    timestamps: false,
  }
);

await sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("UserRegistration table created successfully");
  })
  .catch((err: Error) => {
    console.error("Error creating UserRegistration table:", err);
  });

export default Registrations;
