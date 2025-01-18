// Postgres Repo
import { db } from "@/database/drizzle";
import { registrations, users } from "@/database/schema";
import { IUserRepo } from "./IUserRepo";
import { INewUser, IUser } from "./UserInterface";
import { eq, and } from "drizzle-orm";

export class PostresRepo implements IUserRepo {
  // ** This method is used to create a new user ** //
  async createUser(user: INewUser): Promise<INewUser> {
    const [newUser] = await db
      .insert(registrations)
      .values({
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        password: user.password,
      })
      .returning(); // Return the inserted record
    return {
      id: newUser.id as unknown as number,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      password: user.password,
    };
  }

  // ** This method is used to find user by email ** //
  async upsertUser(user: any): Promise<IUser> {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.userId, user.userId))
      .execute();

    if (existingUser.length > 0) {
      // Update the user if they exist
      await db
        .update(users)
        .set(user)
        .where(eq(users.userId, user.userId))
        .execute();
    } else {
      // Insert the user if they don't exist
      await db.insert(users).values(user).execute();
    }
    return user as IUser;
  }

  // ** This method is used to find user by username ** //
  async findUserByEmail(email: string): Promise<INewUser | null> {
    const [user] = await db
      .select()
      .from(registrations)
      .where(eq(registrations.email, email.toLowerCase()))
      .execute();
    return { ...user, id: user.id as unknown as number } as INewUser;
  }

  // ** This method is used to login user ** //
  async findUserName(username: string): Promise<INewUser | null> {
    const [user] = await db
      .select()
      .from(registrations)
      .where(eq(registrations.username, username.toLowerCase()))
      .execute();
    return { ...user, id: user.id as unknown as number } as INewUser;
  }

  // ** This method is used to login a user ** //
  async loginUser(email: string, password: string): Promise<INewUser> {
    const [user] = await db
      .select()
      .from(registrations)
      .where(and(eq(registrations.email, email), eq(registrations.password, password)))
      .execute();
    return { ...user, id: user.id as unknown as number } as INewUser;
  }

  // ** This method is used to verify user ** //
  async verifyUser(email: string, password: string): Promise<INewUser | null> {
    const [user] = await db
      .select()
      .from(registrations)
      .where(and(eq(registrations.email, email), eq(registrations.password, password)))
      .execute();
    return { ...user, id: user.id as unknown as number } as INewUser;
  }

  // ** This method is used to logout a user ** //
  async logOutUser(): Promise<void> {
    // No implementation needed in the repository
    return;
  }

}

// ** Export the PostgresRepo class ** //
export default {
  PostresRepo,
}