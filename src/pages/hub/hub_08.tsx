import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";
import { APP_NAME } from "@/constant";
import { Hub08Page } from "@/components/Hub08Page";

const Hub08: NextPage<{
  liff: Liff | null;
  liffError: string | null;
}> = ({ liff, liffError }) => {
  return (
    <div>
      <Head>
        <title>メモ | {APP_NAME}</title>
      </Head>
      <main>
        {liff && <Hub08Page liff={liff} />}
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

export default Hub08;
