import type { Metadata } from "next";
import { MovieProvider } from "@/utils/movieContext";
import { Providers } from "@/utils/provider";
import { Header } from "@/components/header";
import { UserProvider } from "@/utils/userContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web Cinema",
  description: "Site para ver dados de filmes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <MovieProvider>
            <UserProvider>
              <Header />
              {children}
            </UserProvider>
          </MovieProvider>
        </Providers>
      </body>
    </html>
  );
}
