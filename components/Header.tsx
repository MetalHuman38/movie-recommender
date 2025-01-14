"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import React from "react";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image
          src="/icons/logo1.svg"
          alt="Movie Recommender"
          width={40}
          height={40}
          priority
        />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/movies"
            className={cn(
              "text-base text-light-300 cursor-pointer capitalize",
              pathname === "/movies" ? "text-primary" : "text-light-100"
            )}
          >
            Movies
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
