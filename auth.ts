import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SequelizeUserRepo } from '@/loader/repository/user/SequelizeUserRepo';
import { JwtTokenService } from '@/loader/services/jwtTokenService';
import { VerifyUserUseCase } from "@/loader/repository/user/UserUseCase";
import { BcryptPasswordHandler } from "./loader/services/bcryptPasswordHandler";


// Initialize dependencies
const jwtHandler = new JwtTokenService();
const userRepo = new SequelizeUserRepo();
const passwordHasher = new BcryptPasswordHandler();
const userUseCase = new VerifyUserUseCase(userRepo, passwordHasher, jwtHandler);

export const authOptions = {
  session: {
    strategy: "jwt" as "jwt", // Use JWT for session management
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Partial<Record<"email" | "password", unknown>>) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        try {
          // Verify user credentials using your UserUseCase
          const user = await userUseCase.verifyUser(
            credentials.email as string,
            credentials.password as string
          );

          if (!user) {
            throw new Error("Invalid credentials");
          }

          // Generate a JWT token for the user
          const tokenPayload = {
            id: user.id,
            email: user.email,
            role: "user",
          };
          const token = jwtHandler.jwtGenerator(tokenPayload);
          if (!token) {
            throw new Error("Token generation failed");
          }

          return { ...user, token }; // Pass user and token
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any, user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = user.token; // Attach the JWT token
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
        };
        session.accessToken = token.accessToken;
        session.expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // Add `expires` to session
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);


export default NextAuth(authOptions);
