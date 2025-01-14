import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { IJwtHandler } from "../services/jwtHandler";
import jwtenv from "../env/jwtenv";
import { IUserPayload } from "../services/serviceInterface";

export class JwtTokenService implements IJwtHandler {
  jwtGenerator(payload: IUserPayload): string;
  jwtGenerator(payload: IUserPayload, options: Partial<SignOptions>): string;
  jwtGenerator(payload: IUserPayload, options?: Partial<SignOptions>): string {
    try {
      const signOptions: SignOptions = {
        expiresIn: jwtenv.JWT_EXPIRES_IN * 60,
        algorithm: jwtenv.JWT_ALGORITHM as jwt.Algorithm,
        issuer: jwtenv.JWT_ISSUER,
        ...options,
      };

      const secret = jwtenv.JWT_SECRET;
      return jwt.sign(payload, secret as string, signOptions);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  jwtVerifier(token: string): IUserPayload;
  jwtVerifier(token: string, options: Partial<VerifyOptions>): IUserPayload;
  jwtVerifier(token: string, options?: Partial<VerifyOptions>): IUserPayload {
    try {
      const verifyOptions: VerifyOptions = {
        algorithms: [jwtenv.JWT_ALGORITHM as jwt.Algorithm],
        issuer: jwtenv.JWT_ISSUER,
        ...options,
      };

      const secret = jwtenv.JWT_SECRET;
      return jwt.verify(token, secret as string, verifyOptions) as IUserPayload;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  jwtRefreshGenerator(payload: IUserPayload): string;
  jwtRefreshGenerator(
    payload: IUserPayload,
    options: Partial<SignOptions>
  ): string;
  jwtRefreshGenerator(
    payload: IUserPayload,
    options?: Partial<SignOptions>
  ): string {
    try {
      const signOptions: SignOptions = {
        expiresIn: jwtenv.JWT_REFRESH_EXPIRES_IN * 60,
        algorithm: jwtenv.JWT_ALGORITHM as jwt.Algorithm,
        issuer: jwtenv.JWT_ISSUER,
        ...options,
      };

      const secret = jwtenv.JWT_SECRET;
      return jwt.sign(payload, secret as string, signOptions);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}