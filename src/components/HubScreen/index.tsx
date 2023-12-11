import { useFetchProfile } from "@/hooks/useProfile";
import { Box, Container, Flex } from "@mantine/core";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";
import { HUB_LIST } from "../HubItem/constant";
import { HubItem } from "../HubItem";

interface Props {
  accessToken: string;
}

export const HubScreen = memo<Props>(({ accessToken }) => {
  const router = useRouter();
  const { data } = useFetchProfile({ accessToken });
  useEffect(() => {
    if (data && !data.spaceId) {
      router.replace("/createSpace");
    }
  }, [data]);
  return (
    <Container>
      <Flex wrap="wrap" justify="space-around" gap="md">
        {HUB_LIST.map((item) => (
          <Box key={item.id} w="45%">
            <HubItem {...item} />
          </Box>
        ))}
      </Flex>
    </Container>
  );
});
