// ** User Use Case Interface ** //
import { IUserRepo } from "./IUserRepo";
import { INewUser, IUser } from "./UserInterface";
import { generateAvatarUrl } from "@/loader/services/avatar";

export class RegisgertUserUseCase {
  constructor(
    private userRepo: IUserRepo,
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
      const spaceIndex = newUser.fullName.indexOf(" ");
      const first_name =
        spaceIndex != -1
          ? newUser.fullName.slice(0, spaceIndex)
          : newUser.fullName;
      const last_name =
        spaceIndex != -1 ? newUser.fullName.slice(spaceIndex + 1) : "";
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
  ) { }

  async loginUser(email: string, password: string) {
    try {
      const user = await this.userRepo.findUserByEmail(email);
      if (!user) {
        throw new Error("User not found in the database");
      }
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
  ) { }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.userRepo.verifyUser(email, password);
      if (!user) {
        throw new Error("User not found");
      }

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}

// ** User UseCase to logout user ** //
export class LogOutUserUseCase {
  constructor(private userRepo: IUserRepo) { }

  async logOutUser() {
    try {
      await this.userRepo.logOutUser();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}