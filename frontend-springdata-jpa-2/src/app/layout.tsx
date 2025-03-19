import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JPA Internals Frontend",
  description: "JPA Internals Frontend",
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
};