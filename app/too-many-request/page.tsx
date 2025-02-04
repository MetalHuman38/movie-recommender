import React from "react";

const page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-bebas-neue text-4xl text-yellow-200 text-center mb-4">
        429 - Too Many Requests
      </h1>
      <p className="mt-3 max-w-xl text-center text-2xl text-light-400">
        looks like you've been a little too eager. We have put a temporary pause
        on your excitement. chill for a bit, and try again later.
      </p>
    </main>
  );
};

export default page;
