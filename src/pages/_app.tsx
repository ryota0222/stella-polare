import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/styles/globals.css";
import "@mantine/core/styles.css";
import type { AppProps } from "next/app";
import { MantineProvider, createTheme } from "@mantine/core";
import { Inter } from "next/font/google";
import type { Liff } from "@line/liff";
import { useState, useEffect, memo, PropsWithChildren } from "react";
import { Header } from "@/components/Header";
import { useFetchProfile } from "@/hooks/useProfile";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  /** Put your mantine theme override here */
});

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       staleTime: Infinity,
//       retry: false,
//     },
//   },
// });
const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={{ ...theme, fontFamily: inter.style.fontFamily }}>
        <Header />
        <Wrapper accessToken={liffObject ? liffObject.getAccessToken() : null}>
          <Component {...pageProps} />
        </Wrapper>
      </MantineProvider>
    </QueryClientProvider>
  );
}

interface Props {
  accessToken: string | null;
}
const Wrapper = memo<PropsWithChildren<Props>>(({ accessToken, children }) => {
  const { data, error } = useFetchProfile({
    accessToken,
  });
  return (
    <>
      <p>accessToken: {accessToken?.slice(0, 10)}</p>
      {error && <p>error: {JSON.stringify(error)}</p>}
      {data && <p>data: {JSON.stringify(data)}</p>}
      {data && <>{children}</>}
    </>
  );
});

export default MyApp;
