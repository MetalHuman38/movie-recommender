// ** User Use Case Interface ** //
import { IPasswordHasher } from "@/loader/services/serviceInterface";
import { IUserRepo } from "./IUserRepo";
import { INewUser, IUser } from "./UserInterface";
import IJwtHandler from "@/loader/services/jwtHandler";
import { generateAvatarUrl } from "@/loader/services/avatar";

export class RegisgertUserUseCase {
  constructor(
    private userRepo: IUserRepo,
    private passwordHasher: IPasswordHasher,
    private jwtHandler: IJwtHandler
  ) { }


  async createUser(user: INewUser) {

    try {
      const existingUser = await this.userRepo.findUserByEmail(user.email);
      if (existingUser) {
        throw new Error("User already exists");
      }
      // ** Check if email is valid ** //
      if (!user.email.includes("@")) {
        throw new Error("Invalid email address");
      }

      // ** Validate username if already exists ** //
      const usernameExists = await this.userRepo.findUserName(
        user.username
      );
      if (usernameExists) {
        throw new Error("Username already exists");
      }

      // ** Validate Password ** //
      this.passwordHasher.validatePassword(user.password);

      // ** Hash the password ** //
      const hashedPassword = await this.passwordHasher.hashPassword(
        user.password
      );
      user.password = hashedPassword;

      // ** Create User ** //
      const newUser = await this.userRepo.createUser({
        ...user,
        password: hashedPassword,
      });
      console.log("New User from userUseCase", newUser);
      if (!newUser) {
        throw new Error("User creation failed");
      }

      // ** Generate JWT token ** //
      const token = this.jwtHandler.jwtGenerator({
        id: newUser.id as number,
        role: "user",
      });
      if (!token) {
        throw new Error("Token generation failed");
      }

      // ** Update User Table ** //
      await new UpdateUserUseCase(this.userRepo).UpdateUser(
        newUser,
        hashedPassword
      );

      return {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        token,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}

// ** Update user table with extracted details from registerUserUseCase ** //
export class UpdateUserUseCase {
  constructor(private userRepo: IUserRepo,) { }

  async UpdateUser(newUser: INewUser, hashedPassword: string): Promise<void> {
    try {
      const spaceIndex = newUser.new_user.indexOf(" ");
      const first_name =
        spaceIndex != -1
          ? newUser.new_user.slice(0, spaceIndex)
          : newUser.new_user;
      const last_name =
        spaceIndex != -1 ? newUser.new_user.slice(spaceIndex + 1) : "";
      const avatarUrl = generateAvatarUrl(first_name, last_name);

      const userRecord: IUser = {
        first_name: first_name,
        last_name: last_name,
        user_id: newUser.id as number,
        username: newUser.username,
        email: newUser.email,
        password: hashedPassword,
        reset_password_token: "",
        reset_password_expires: new Date(),
        status: "active",
        bio: "The world is yours for the taking",
        joined_date: new Date(),
        last_login: new Date(),
        last_logout: new Date(),
        last_activity: new Date(),
        role: "user",
        avatarUrl: avatarUrl,
        profile_picture: avatarUrl,
        user_registration_id: newUser.id as number,
        created_at: new Date(),
        updated_at: new Date(),
      };

      await this.userRepo.upsertUser(userRecord);
    } catch (error) {
      // ** Log and handle specific errors ** //
      if (error instanceof Error) {
        console.error("Error updating user:", error.message);
        throw error; // ** Rethrow specific errors for upper layers to handle ** //
      }
      // ** Fallback for unexpected errors ** //
      console.error("Unexpected error during user update:", error);
      throw new Error("An unexpected error occurred during user update.");
    }
  }
}


// ** User Login UseCase ** //
export class LoginUserUseCase {
  constructor(
    private userRepo: IUserRepo,
    private passwordHasher: IPasswordHasher,
    private jwtHandler: IJwtHandler
  ) { }

  async loginUser(email: string, password: string) {
    try {
      const user = await this.userRepo.findUserByEmail(email);
      if (!user) {
        throw new Error("User not found in the database");
      }

      // ** Verify Password ** //
      const isPasswordValid = await this.passwordHasher.comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      // ** Generate JWT token ** //
      const token = this.jwtHandler.jwtGenerator({
        id: user.id as number,
        role: "user",
      });
      if (!token) {
        throw new Error("Token generation failed");
      }
      return {
        id: user.id,
        email: user.email,
        new_user: user.new_user,
        token,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}

// ** User UserCase to verify user ** //
export class VerifyUserUseCase {
  constructor(
    private userRepo: IUserRepo,
    private passwordHasher: IPasswordHasher,
    private jwtHandler: IJwtHandler
  ) { }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.userRepo.verifyUser(email, password);
      if (!user) {
        throw new Error("User not found");
      }

      // ** Verify Password ** //
      const isPasswordValid = await this.passwordHasher.comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      // ** Generate JWT token ** //
      const token = this.jwtHandler.jwtGenerator({
        id: user.id as number,
        role: "user",
      });
      if (!token) {
        throw new Error("Token generation failed");
      }
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        token,
      }; // Return user details and token
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}