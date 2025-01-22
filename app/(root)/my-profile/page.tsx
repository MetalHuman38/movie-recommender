import { Button } from "@/components/ui/button";
import React from "react";
import { signOut } from "@/auth";

const page = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="mb-10"
      >
        <Button type="submit">Logout</Button>
      </form>
    </>
  );
};

export default page;
