import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Text-Rig-1",
  description: "Test Rig to Test Apache Coyote",
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
