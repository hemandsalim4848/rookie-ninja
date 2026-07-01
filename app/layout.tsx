import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/src/components/common/SessionProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Rookie Ninja — Value Added Distribution",
  description: "Value Added Distribution across Middle East & Africa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
      </head>
      <body className="antialiased">
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}