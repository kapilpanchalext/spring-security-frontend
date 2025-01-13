import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Debug 3 - Puppeteer and NextJS",
  description: "Debug 3 - Puppeteer and NextJS",
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
