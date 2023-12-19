import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";
import { APP_NAME } from "@/constant";
import { Hub02Page } from "@/components/Hub02Page";

const Hub01: NextPage<{
  liff: Liff | null;
  liffError: string | null;
}> = ({ liff, liffError }) => {
  return (
    <div>
      <Head>
        <title>食べたいもの | {APP_NAME}</title>
      </Head>
      <main>
        {liff && <Hub02Page liff={liff} />}
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

export default Hub01;
