// loader/factory/authFactory.ts
import { PostresRepo } from "@/loader/repository/user/PostgresRepo";
import { LoginUserUseCase, LogOutUserUseCase, RegisgertUserUseCase, VerifyUserUseCase } from "@/loader/repository/user/UserUseCase";


// ** Factory function to create the RegisterUserUseCase ** //
export const makeRegisterUserUseCase = () => {
  const userRepo = new PostresRepo();

  return new RegisgertUserUseCase(userRepo);
};

export const makeSignInUserUseCase = () => {
  const userRepo = new PostresRepo();

  return new LoginUserUseCase(userRepo);
};


// ** Factory function to create the VerifyUserUseCase ** //
export const makeVerifyUserUseCase = () => {
  const userRepo = new PostresRepo();

  return new VerifyUserUseCase(userRepo);
};

// ** Factory function to create the LogoutUserUseCase ** //
export const makeLogoutUserUseCase = () => {
  const userRepo = new PostresRepo();
  return new LogOutUserUseCase(userRepo);
};
