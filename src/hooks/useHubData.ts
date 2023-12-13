import client from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { HubData } from "@/types";

export const getHubData = async (
  id: string | null,
  hubId: string,
  accessToken: string | null
): Promise<HubData[] | null> => {
  if (accessToken === null || id === null) return null;
  return await client.get(`/spaces/${id}/hub?hub_id=${hubId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

type QueryFnType = typeof getHubData;

type UseGetHubDataOptions = {
  id?: string;
  hubId: string;
  accessToken: string | null;
  config?: QueryConfig<QueryFnType>;
};

export const useFetchHubData = ({
  id,
  hubId,
  accessToken,
  config,
}: UseGetHubDataOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["hub-data", { id, hubId, accessToken }],
    queryFn: () => getHubData(id || null, hubId, accessToken),
    ...config,
  });
};
