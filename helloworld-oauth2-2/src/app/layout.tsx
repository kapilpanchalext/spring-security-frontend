import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "OAuth2.0",
  description: "OAuth2.0  - Hello World",
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
