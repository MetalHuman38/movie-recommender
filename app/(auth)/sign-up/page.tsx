"use client";
import React from "react";
import AuthForm from "@/components/AuthForm";
import { signupSchema } from "@/lib/validations";

const page = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signupSchema}
      defaultValues={{ fullname: "", username: "", email: "", password: "" }}
      onSubmit={() => {}}
    />
  );
};

export default page;
