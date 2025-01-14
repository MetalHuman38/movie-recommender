// ** user repository implementation using sequelize ORM ** //
import Registrations from "../../sequelize/models/user-reg-model";
import { IUserRepo } from "./IUserRepo";
import { INewUser, IUser } from "./UserInterface";
import RegistrationsAttributes from "../../sequelize/models/user-reg-model";
import UserAttributes from "../../sequelize/models/user-model";
import Users from "@/loader/sequelize/models/user-model";

export class SequelizeUserRepo implements IUserRepo {
  // ** This method is used to create a new user ** //
  async createUser(user: INewUser): Promise<Registrations> {
    const newUser = await Registrations.create({
      new_user: user.new_user,
      username: user.username,
      email: user.email,
      password: user.password,
      created_at: new Date(),
    });
    return newUser.toJSON() as RegistrationsAttributes;
  }

  // ** This method is used to update user ** //
  async upsertUser(user: UserAttributes): Promise<any> {
    await Users.upsert(user as UserAttributes);
  }

  // ** This method is used to find user by email ** //
  async findUserByEmail(email: string): Promise<INewUser> {
    const user = await Registrations.findOne({
      where: { email },
    });
    return user?.toJSON() as INewUser;
  }

  // ** This method is used to find user by username ** //
  async findUserName(username: string): Promise<INewUser> {
    const user = await Registrations.findOne({
      where: { username },
    });
    return user?.toJSON() as INewUser;
  }

  // ** This method is used to login user ** //
  async loginUser(email: string, password: string): Promise<INewUser> {
    const user = await Registrations.findOne({
      where: { email, password },
    });
    return user?.toJSON() as INewUser;
  }

  // ** This method is used to verify user ** //
  async verifyUser(email: string, password: string): Promise<INewUser> {
    const user = await Registrations.findOne({
      where: { email, password },
    });
    return user?.toJSON() as INewUser;
  }
}
