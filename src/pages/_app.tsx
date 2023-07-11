import type { AppProps } from "next/app";

import "../styles/global.css";

import { Inter } from "next/font/google";
import { Providers } from "@/lib/redux/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <main className={`${inter.variable} font-primary`}>
        <Component {...pageProps} />
      </main>
    </Providers>
  );
}

export default MyApp;
