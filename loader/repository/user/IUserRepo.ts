// ** User Repository Interface ** //
import { INewUser, IUser } from "./UserInterface";

export interface IUserRepo {
  createUser(user: INewUser): Promise<INewUser>;
  upsertUser(user: IUser): Promise<IUser>;
  findUserByEmail(email: string): Promise<any>;
  findUserName(username: string): Promise<any>;
  loginUser(email: string, password: string): Promise<INewUser>;
  verifyUser(email: string, password: string): Promise<any>;
  logOutUser(): Promise<any>;
}