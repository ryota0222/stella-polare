import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import client from "@/lib/axios";
import { Profile } from "./useProfile";

interface Params {
  id: string;
  accessToken: string | null;
  body: {
    name: string;
    url: string | null;
    hubId: string;
  };
}

export interface HubData {
  id: string;
  url: string | null;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
  lastUpdatedUser: Profile;
}

export const postHubData = async (
  params: Params
): Promise<HubData[] | undefined> => {
  if (params.accessToken) {
    return await client.post(`/spaces/${params.id}/hub`, {
      body: params.body,
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
