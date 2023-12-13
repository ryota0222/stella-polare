import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import client from "@/lib/axios";
import { HubData } from "@/types";

interface Params {
  id: string;
  accessToken: string | null;
  body: {
    id: string;
    name: string;
    url: string | null;
    hubId: string;
  };
}

export const putHubData = async (
  params: Params
): Promise<HubData[] | undefined> => {
  if (params.accessToken) {
    return await client.put(`/spaces/${params.id}/hub`, {
      body: params.body,
      headers: {
        Authorization: `Bearer ${params.accessToken}`,
      },
    });
  }
};

type UsePutHubDataOptions = {
  config?: UseMutationOptions<HubData[] | undefined, unknown, {}, unknown>;
};

export const usePutHubData = ({ config }: UsePutHubDataOptions) => {
  return useMutation({
    ...config,
    mutationFn: putHubData,
  });
};
