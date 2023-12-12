import client from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { Profile } from "./useProfile";

export interface Space {
  owner: Profile;
  partner?: Profile;
  password: string;
  spaceId: string;
}

export const getSpace = async (
  id: string | null,
  accessToken: string | null
): Promise<Space | null> => {
  if (accessToken === null || id === null) return null;
  return await client.get(`/spaces/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

type QueryFnType = typeof getSpace;

type UseGetSpaceOptions = {
  id?: string;
  accessToken: string | null;
  config?: QueryConfig<QueryFnType>;
};

export const useFetchSpace = ({
  id,
  accessToken,
  config,
}: UseGetSpaceOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["spaces", { id, accessToken }],
    queryFn: () => getSpace(id || null, accessToken),
    ...config,
  });
};
