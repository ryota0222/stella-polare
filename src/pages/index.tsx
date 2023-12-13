import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";
import { APP_NAME } from "@/constant";
import { HubScreen } from "@/components/HubScreen";

const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError,
}) => {
  const accessToken = liff?.getAccessToken();
  return (
    <div>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <main>
        {accessToken && <HubScreen accessToken={accessToken} />}
        {liffError && (
          <>
            <p>LIFF init failed.</p>
            <p>
              <code>{liffError}</code>
            </p>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
