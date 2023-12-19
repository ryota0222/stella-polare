import { useFetchProfile } from "@/hooks/useProfile";
import {
  Avatar,
  Box,
  Container,
  Flex,
  Modal,
  Stack,
  Text,
  Image,
  useMantineTheme,
  Loader,
  Center,
} from "@mantine/core";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";
import { HUB_LIST } from "../HubItem/constant";
import { HubItem } from "../HubItem";
import { useFetchSpace } from "@/hooks/useSpace";
import { useDisclosure } from "@mantine/hooks";
import { APP_NAME } from "@/constant";

interface Props {
  accessToken: string;
}

export const HubScreen = memo<Props>(({ accessToken }) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const { data } = useFetchProfile({ accessToken });
  const { data: space, isLoading } = useFetchSpace({
    id: data?.spaceId,
    accessToken,
  });
  const [opened, { open, close }] = useDisclosure(false);
  useEffect(() => {
    if (data && !data.spaceId) {
      router.replace("/createSpace");
    }
  }, [data]);
  return (
    <>
      <Box bg="gray.0" h={140} mb="lg" pos="relative">
        {isLoading ? (
          <Center h="100%">
            <Loader color="gray" type="dots" />
          </Center>
        ) : (
          <>
            {space && (
              <Container h="100%">
                <Text fz="xs" pt="sm" fw="bold" style={{ textAlign: "center" }}>
                  このスペースを閲覧できるユーザー
                </Text>
                <Flex pt="sm" gap="lg" justify="center">
                  {space.owner && (
                    <Stack gap={4} align="center">
                      <Avatar src={space.owner.avatar} size={64} />
                      <Text fz={12} style={{ textAlign: "center" }}>
                        {space.owner.name}
                      </Text>
                    </Stack>
                  )}
                  {space.partner ? (
                    <Stack gap={4} align="center">
                      <Avatar src={space.partner?.avatar} size={64} />
                      <Text fz={12} style={{ textAlign: "center" }}>
                        {space.partner.name}
                      </Text>
                    </Stack>
                  ) : (
                    <Stack gap={4} align="center" role="button" onClick={open}>
                      <Avatar size={64} />
                      <Text fz={12} style={{ textAlign: "center" }}>
                        招待
                      </Text>
                    </Stack>
                  )}
                </Flex>
              </Container>
            )}
          </>
        )}
        <Image
          src="/users-illust.webp"
          alt="イラスト"
          style={{
            position: "absolute",
            right: 8,
            bottom: 0,
            width: 80,
            height: 80,
          }}
        />
      </Box>
      <Container>
        <Flex wrap="wrap" justify="space-around" gap="md" mt="md">
          {HUB_LIST.map((item) => (
            <Box key={item.id} w="45%">
              <HubItem {...item} />
            </Box>
          ))}
        </Flex>
      </Container>
      <Modal opened={opened} onClose={close} title={`${APP_NAME}を共有`}>
        <Image
          src="https://qr-official.line.me/sid/L/087eheli.png"
          alt="QRコード"
          w="100%"
        />
      </Modal>
    </>
  );
});
