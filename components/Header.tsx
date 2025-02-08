"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { cn, getInitials } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import React from "react";
import { Session } from "next-auth";
import SearchMovie from "@/components/SearchMovie";
import SearchInput from "./SearchInput";

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  return (
    <header className="my-6 flex items-center justify-between px-4 md:px-10">
      <Link href="/">
        <Image
          src="/icons/logo1.svg"
          alt="Movie Recommender"
          width={40}
          height={40}
          priority
        />
      </Link>
      <div className="flex items-center gap-4">
        <SearchInput />
      </div>
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
        <li className="flex items-center gap-2">
          <Link href="/my-profile">
            <Avatar className="w-28 h-28">
              <AvatarFallback className="bg-amber-100 rounded-full font-semibold text-amber-500 text-2xl">
                {getInitials(session?.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
