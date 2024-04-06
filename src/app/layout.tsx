import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { getServerSession } from "next-auth";

import SessionProvider from "@/components/SessionProvider";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { TurnOffDefaultPropsWarning } from "@/components/TurnOffDefaultPropsWarning";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JournTrade",
  description: "A robust trading journal for traders",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <TurnOffDefaultPropsWarning />
        <SessionProvider session={session}>
          <NavBar />

          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
