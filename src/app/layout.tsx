import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/utils/provider";
import { UserProvider } from "@/utils/userContext";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export const metadata: Metadata = {
  title: "Web Cinema"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`antialiased`}
      >
        <Providers>
          <UserProvider>
            <AppRouterCacheProvider>
              <Header />
              {children}
              <Footer />
            </AppRouterCacheProvider>
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
