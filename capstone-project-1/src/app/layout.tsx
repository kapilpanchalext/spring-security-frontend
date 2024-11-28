import type { Metadata } from "next";
import "./globals.scss";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import NavigationProvider from "@/store/NavigationProvider";
import ContextWrapper from "./ContextWrapper";

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
    <NavigationProvider>
      <ContextWrapper>
        <body>
          <header>
            <Navbar/>
            <Sidebar/>
            {children}
          </header>
        </body>
      </ContextWrapper>
    </NavigationProvider>
  );
}
