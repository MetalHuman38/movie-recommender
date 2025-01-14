// /app/api/sign-in/route.ts
import { signIn } from "@/lib/actions/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await signIn({ email, password });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    return NextResponse.json({ success: true, message: "Sign-in successful", data: user }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Login failed";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 400 }
    );
  }
}