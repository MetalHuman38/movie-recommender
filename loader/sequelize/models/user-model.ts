import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConInstance } from "../postgresCon";
import Registrations from "./user-reg-model";
import Ratings from "./ratings-model";
import Tags from "./tags-model";


interface UserAttributes {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  reset_password_token: string;
  reset_password_expires: Date;
  status: string;
  bio: string;
  joined_date: Date;
  last_login: Date;
  last_logout: Date;
  last_activity: Date;
  role: string;
  avatarUrl: string;
  profile_picture: string;
  user_registration_id: number;
  created_at: Date;
  updated_at: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {
  username: string;
  email: string;
  bio: string;
}

const sequelize = sequelizeConInstance();

class Users
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  declare id: number;
  declare first_name: string;
  declare last_name: string;
  declare user_id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare reset_password_token: string;
  declare reset_password_expires: Date;
  declare status: string;
  declare bio: string;
  declare joined_date: Date;
  declare last_login: Date;
  declare last_logout: Date;
  declare last_activity: Date;
  declare role: string;
  declare avatarUrl: string;
  declare profile_picture: string;
  declare user_registration_id: number;
  declare created_at: Date;
  declare updated_at: Date;

  static async generateAvatarUrl(
    firstName: string,
    lastName: string
  ): Promise<string> {
    const name = `${firstName} ${lastName}`;
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");
    return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff`;
  }

  // ** Static method to get the user by id ** //
  static async getUserById(id: number): Promise<Users | null> {
    return Users.findByPk(id);
  }
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUnique: async (value: string) => {
          const user = await Users.findOne({ where: { username: value } });
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
          const user = await Users.findOne({ where: { email: value } });
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
    reset_password_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reset_password_expires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Write something about yourself",
    },
    joined_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    last_logout: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    last_activity: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("user", "admin", "superadmin"),
      allowNull: false,
      defaultValue: "user",
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_registration_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Registrations",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "Users",
    freezeTableName: true,
    timestamps: false,
  }
);

// User associations
Users.belongsTo(Registrations, {
  foreignKey: "user_registration_id",
  as: "registration",
});

Users.hasMany(Ratings, {
  foreignKey: "user_id",
  as: "ratings",
});

Users.hasMany(Tags, {
  foreignKey: "user_id",
  as: "tags",
});

await sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("User table created successfully");
  })
  .catch((err: Error) => {
    console.error("Error Syncing User table:", err);
  });

export default Users;
