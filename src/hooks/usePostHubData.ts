import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import client from "@/lib/axios";
import { HubData } from "@/types";

interface Params {
  id: string;
  accessToken: string | null;
  body: {
    name?: string;
    url?: string | null;
    title?: string;
    description?: string;
    hubId: string;
  };
}

export const postHubData = async (
  params: Params
): Promise<HubData[] | undefined> => {
  if (params.accessToken) {
    return await client.post(`/spaces/${params.id}/hub`, params.body, {
      headers: {
        Authorization: `Bearer ${params.accessToken}`,
      },
    });
  }
};

type UsePostHubDataOptions = {
  config?: UseMutationOptions<HubData[] | undefined, unknown, {}, unknown>;
};

export const usePostHubData = ({ config }: UsePostHubDataOptions) => {
  return useMutation({
    ...config,
    mutationFn: postHubData,
  });
};
