import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FrontEnd SpringData JPA",
  description: "FrontEnd SpringData JPA",
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