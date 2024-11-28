import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Capstone Project 1",
  description: "Capstone Project 1 - OAuth2.0, OpenID and NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
