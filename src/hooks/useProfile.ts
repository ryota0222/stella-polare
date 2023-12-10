import client from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

export interface Profile {
  userId: string;
  name: string;
  avatar?: string;
  spaceId?: string;
}

export const getAccount = async (
  accessToken: string | null
): Promise<{ data: Profile } | null> => {
  if (accessToken === null) return null;
  return await client.get(`/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

type QueryFnType = typeof getAccount;

type UseGetProfileOptions = {
  accessToken: string | null;
  config?: QueryConfig<QueryFnType>;
};

export const useFetchProfile = ({
  accessToken,
  config,
}: UseGetProfileOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["profile"],
    queryFn: () => getAccount(accessToken),
    ...config,
  });
};
