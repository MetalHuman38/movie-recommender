// lib/actions/auth.ts
"use server";

import { makeRegisterUserUseCase, makeSignInUserUseCase } from "@/loader/factory/authFactory";


export const signUp = async (params: AuthCredentials) => {
  const { new_user, username, email, password } = params;
  // Input validation
  if (!new_user || !username || !email || !password) {
    throw new Error("All fields are required");
  }

  try {
    // Instantiate the use case
    const registerUserUseCase = makeRegisterUserUseCase();

    // Call the use case to create the user
    const token = await registerUserUseCase.createUser({
      new_user,
      username,
      email,
      password,
    });

    // Automatically sign in the user after sign-up
    const signInUserUseCase = makeSignInUserUseCase();
    const user = await signInUserUseCase.loginUser(email, password);

    return {
      new_user,
      username,
      email,
      token,
      user,
    }


  } catch (error) {
    if (error instanceof Error) {
      console.error("Sign-up error:", error.message);
    } else {
      console.error("Sign-up error:", error);
    }
    if (error instanceof Error) {
      throw new Error(error.message || "Sign-up failed");
    } else {
      throw new Error("Sign-up failed");
    }
  }
};

export const signIn = async (params: AuthLogin) => {
  const { email, password } = params;
  // Input validation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    // Instantiate the use case
    const signInUserUseCase = makeSignInUserUseCase();

    // Call the use case to verify the user
    const user = await signInUserUseCase.loginUser(email, password);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    return user;

  } catch (error) {
    if (error instanceof Error) {
      console.error("Sign-in error:", error.message);
    } else {
      console.error("Sign-in error:", error);
    }
    if (error instanceof Error) {
      throw new Error(error.message || "Sign-in failed");
    } else {
      throw new Error("Sign-in failed");
    }
  }
};


