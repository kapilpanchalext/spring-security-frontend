import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Oauth2 Authorization Server",
  description: "Oauth2 Authorization Server",
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
