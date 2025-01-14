import bcrypt from "bcrypt";
import { IPasswordHasher } from "./serviceInterface";


// ** Implementation of the IPasswordHasher interface using bcrypt ** //
export class BcryptPasswordHandler implements IPasswordHasher {
  // ** Hash Password ** //
  async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      console.error("Error hashing password", error);
      throw new Error("Error hashing password");
    }
  }

  // ** Compare Password ** //
  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.error("Error comparing password", error);
      throw new Error("Error comparing password");
    }
  }

  // ** Validate Password ** //
  validatePassword(password: string): Promise<boolean> {
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character");
    }
    // Prevent too many identical characters
    if (/([a-zA-Z0-9])\1\1/.test(password)) {
      throw new Error("Password must not contain more than two identical characters in a row");
    }
    return Promise.resolve(true);
  }
}

export default { BcryptPasswordHandler };
