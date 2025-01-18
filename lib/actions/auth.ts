"use server";

import { db } from "@/database/drizzle";
import { registrations } from "@/database/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";


export const signInWithCredentials = async (params: Pick<AuthCredentials, "email" | "password">) => {
  const { email, password } = params;
  console.log("email", email);

  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  try {
    const user = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    console.log("user", user);
    if (user?.error) {
      return { success: false, error: user.error };
    }
    return { success: true, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: "Sign-In Error" }; // Consistent return type
    } else {
      return { success: false, error: "An unknown error occurred" };
    }
  }
}

export const signUp = async (params: AuthCredentials) => {
  const { fullName, username, email, password } = params;

  if (!fullName || !username || !email || !password) {
    return { success: false, error: "" };
  }

  if (!email.includes("@")) {
    return { success: false, error: "" };
  }

  const existingUser = await db
    .select()
    .from(registrations)
    .where(eq(registrations.email, email))
    .execute();
  if (existingUser.length > 0) {
    return { success: false, error: "" };
  }

  const hashedPassword = await hash(password, 10);
  if (!hashedPassword) {
    return { success: false, error: "" };
  }

  try {
    const newUser = await db
      .insert(registrations)
      .values({
        fullName,
        username,
        email,
        password: hashedPassword,
      })
      .execute();
    console.log("newUser", newUser);
    await signInWithCredentials({ email, password });
    return { success: true, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: true, error: "" };
    } else {
      return { success: true, error: "" };
    }
  }
};
