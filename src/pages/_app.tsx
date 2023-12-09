import "@/styles/globals.css";
import "@mantine/core/styles.css";
import type { AppProps } from "next/app";
import { MantineProvider, createTheme } from "@mantine/core";
import { Inter } from "next/font/google";
import type { Liff } from "@line/liff";
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  /** Put your mantine theme override here */
});

function MyApp({ Component, pageProps }: AppProps) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        console.log("LIFF init...");
        liff
          .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
          .then(() => {
            console.log("LIFF init succeeded.");
            setLiffObject(liff);
          })
          .catch((error: Error) => {
            console.log("LIFF init failed.");
            setLiffError(error.toString());
          });
      });
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  return (
    <MantineProvider theme={{ ...theme, fontFamily: inter.style.fontFamily }}>
      <Header />
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
