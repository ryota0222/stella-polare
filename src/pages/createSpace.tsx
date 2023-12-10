import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";
import { APP_NAME } from "@/constant";
import { CreateSpacePage } from "@/components/CreateSpace";

const CreateSpace: NextPage<{
  liff: Liff | null;
  liffError: string | null;
}> = ({ liff, liffError }) => {
  return (
    <div>
      <Head>
        <title>スペースの作成 | {APP_NAME}</title>
      </Head>
      <main>
        {liff && <CreateSpacePage liff={liff} />}
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

export default CreateSpace;
