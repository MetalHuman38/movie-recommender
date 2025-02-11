import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const ibmPlexsans = localFont({
  src: [
    {
      path: "/fonts/IBMPlexMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/IBMPlexMono-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/IBMPlexMono-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "/fonts/IBMPlexMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "/fonts/IBMPlexMono-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
  ],
});

const bebasNeue = localFont({
  src: [
    {
      path: "/fonts/BebasNeue-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--bebasNeue",
});

export const metadata: Metadata = {
  title: "Movie Recommender",
  description: "A movie recommender app",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) return null;
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${ibmPlexsans.className} ${bebasNeue.variable} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
