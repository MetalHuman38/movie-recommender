// /app/api/register.ts
import { RegisgertUserUseCase } from "@/loader/repository/user/UserUseCase";
import { SequelizeUserRepo } from '@/loader/repository/user/SequelizeUserRepo';
import { BcryptPasswordHandler } from '@/loader/services/bcryptPasswordHandler';
import { JwtTokenService } from '@/loader/services/jwtTokenService';
import { NextResponse } from 'next/server';

const userRepo = new SequelizeUserRepo();
const passwordHasher = new BcryptPasswordHandler();
const jwtHandler = new JwtTokenService();
const registerUserUseCase = new RegisgertUserUseCase(userRepo, passwordHasher, jwtHandler);

// Handle POST requests
export async function POST(req: Request) {
  try {
    const newUser = await req.json(); // Parse request body
    const createdUser = await registerUserUseCase.createUser(newUser); // Call the use case

    // Return success response
    return NextResponse.json({ success: true, message: "Registration successful", data: createdUser }, { status: 201 });
  } catch (error) {
    const errorMessage = (error as Error).message;

    // Return error response
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 400 }
    );
  }
}
