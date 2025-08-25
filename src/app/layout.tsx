import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Model vs Controller 2 - Superhero Battle Simulator",
  description:
    "The ultimate 3v3 superhero battle simulator. Search heroes, build teams, and watch epic battles unfold.",
  keywords: ["superhero", "battle", "simulator", "marvel", "dc", "heroes"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
