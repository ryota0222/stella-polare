import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import client from "@/lib/axios";
import { HubData } from "@/types";

interface Params {
  dataId: string;
  hubId: string;
  spaceId: string;
  accessToken: string | null;
}

export const deleteHubData = async (
  params: Params
): Promise<{ message: "ok" } | undefined> => {
  if (params.accessToken) {
    return await client.delete(
      `/spaces/${params.spaceId}/hub?dataId=${params.dataId}&hubId=${params.hubId}`,
      {
        headers: {
          Authorization: `Bearer ${params.accessToken}`,
        },
      }
    );
  }
};

type UseDeleteHubDataOptions = {
  config?: UseMutationOptions<
    { message: "ok" } | undefined,
    unknown,
    {},
    unknown
  >;
};

export const useDeleteHubData = ({ config }: UseDeleteHubDataOptions) => {
  return useMutation({
    ...config,
    mutationFn: deleteHubData,
  });
};
