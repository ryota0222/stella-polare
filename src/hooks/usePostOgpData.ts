import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import client from "@/lib/axios";
import { HubData } from "@/types";

interface Params {
  url: string;
}

export const postOgpData = async (
  params: Params
): Promise<{
  [key: string]: string | undefined;
}> => {
  return await client.post(`/ogp`, params);
};

type UsePostOgpDataOptions = {
  config?: UseMutationOptions<
    | {
        [key: string]: string | undefined;
      }
    | undefined,
    unknown,
    {},
    unknown
  >;
};

export const usePostOgpData = ({ config }: UsePostOgpDataOptions) => {
  return useMutation({
    ...config,
    mutationFn: postOgpData,
  });
};
