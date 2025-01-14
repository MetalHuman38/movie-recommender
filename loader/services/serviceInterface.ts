export interface IPasswordHasher {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;
  validatePassword(password: string): void;
}

// ** jwt payload types ** //
export type IUserPayload = {
  id: number;
  role: string;
  signOptins?: Partial<string>;
};

// ** jwt email verification payload types ** //
export type IEmailVerificationPayload = {
  email: string;
  token: string;
  signOptins?: Partial<string>;
  type: string;
};