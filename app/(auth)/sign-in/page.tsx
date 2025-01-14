"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signinSchema } from "@/lib/validations";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const handleSignIn = async (data: { email: string; password: string }) => {
    try {
      const response = await fetch("/api/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Sign-in successful:", result.data);
        // Redirect to a protected page or dashboard
        router.push("/dashboard");
        return { success: true, error: "" };
      } else {
        console.error("Sign-in error:", result.message);
        return { success: false, error: result.message };
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  return (
    <AuthForm
      type="SIGN_IN"
      schema={signinSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={handleSignIn}
    />
  );
};

export default page;
