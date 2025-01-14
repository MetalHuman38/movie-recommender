// loader/factory/authFactory.ts
import { SequelizeUserRepo } from "@/loader/repository/user/SequelizeUserRepo";
import { BcryptPasswordHandler } from "@/loader/services/bcryptPasswordHandler";
import { JwtTokenService } from "@/loader/services/jwtTokenService";
import { LoginUserUseCase, RegisgertUserUseCase, VerifyUserUseCase } from "@/loader/repository/user/UserUseCase";


// ** Factory function to create the RegisterUserUseCase ** //
export const makeRegisterUserUseCase = () => {
  const userRepo = new SequelizeUserRepo();
  const passwordHasher = new BcryptPasswordHandler();
  const jwtHandler = new JwtTokenService();

  return new RegisgertUserUseCase(userRepo, passwordHasher, jwtHandler);
};

export const makeSignInUserUseCase = () => {
  const userRepo = new SequelizeUserRepo();
  const passwordHasher = new BcryptPasswordHandler();
  const jwtHandler = new JwtTokenService();

  return new LoginUserUseCase(userRepo, passwordHasher, jwtHandler);
};


// ** Factory function to create the VerifyUserUseCase ** //
export const makeVerifyUserUseCase = () => {
  const userRepo = new SequelizeUserRepo();
  const passwordHasher = new BcryptPasswordHandler();
  const jwtHandler = new JwtTokenService();

  return new VerifyUserUseCase(userRepo, passwordHasher, jwtHandler);
};
