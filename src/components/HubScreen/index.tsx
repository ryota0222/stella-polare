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
} from "@mantine/core";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";
import { HUB_LIST } from "../HubItem/constant";
import { HubItem } from "../HubItem";
import { useFetchSpace } from "@/hooks/useSpace";
import { useDisclosure } from "@mantine/hooks";

interface Props {
  accessToken: string;
}

export const HubScreen = memo<Props>(({ accessToken }) => {
  const router = useRouter();
  const { data } = useFetchProfile({ accessToken });
  const { data: space } = useFetchSpace({ id: data?.spaceId, accessToken });
  const [opened, { open, close }] = useDisclosure(false);
  useEffect(() => {
    if (data && !data.spaceId) {
      router.replace("/createSpace");
    }
  }, [data]);
  return (
    <>
      <Container>
        {space && (
          <Flex py="md" gap="lg" justify="space-evenly">
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
        )}
        <Flex wrap="wrap" justify="space-around" gap="md" mt="md">
          {HUB_LIST.map((item) => (
            <Box key={item.id} w="45%">
              <HubItem {...item} />
            </Box>
          ))}
        </Flex>
      </Container>
      <Modal opened={opened} onClose={close} title="Stella Polareを共有">
        <Image
          src="https://qr-official.line.me/sid/L/087eheli.png"
          alt="QRコード"
          w="100%"
        />
      </Modal>
    </>
  );
});
