import { Liff } from "@line/liff";
import {
  ActionIcon,
  Avatar,
  Center,
  Container,
  Flex,
  Group,
  Loader,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { memo, useEffect, useState } from "react";
import { HubTitle } from "../HubTitle";
import { FloatingAddButton } from "../FloatingAddButton";
import dayjs from "@/lib/dayjs";
import Link from "next/link";
import { useFetchHubData } from "@/hooks/useHubData";
import { useFetchProfile } from "@/hooks/useProfile";
import { useDisclosure } from "@mantine/hooks";
import { IoPencil, IoTrash } from "react-icons/io5";
import { PostModal } from "./components/PostModal";
import { PutModal } from "./components/PutModal";
import { DeleteModal } from "./components/DeleteModal";
interface Props {
  liff: Liff | null;
}

export const Hub01Page = memo<Props>(({ liff }) => {
  const theme = useMantineTheme();
  const [postModalOpened, { open: postModalOpen, close: postModalClose }] =
    useDisclosure(false);
  const [putModalOpened, { open: putModalOpen, close: putModalClose }] =
    useDisclosure(false);
  const [
    deleteModalOpened,
    { open: deleteModalOpen, close: deleteModalClose },
  ] = useDisclosure(false);
  const [targetId, setTargetId] = useState<null | string>(null);
  const { data } = useFetchProfile({
    accessToken: liff?.getAccessToken() as any,
  });
  const { data: hubData, isLoading } = useFetchHubData({
    id: data?.spaceId,
    hubId: "hub_01",
    accessToken: liff?.getAccessToken() as any,
  });
  useEffect(() => {
    if (!postModalOpened && !putModalOpened && !deleteModalOpened) {
      setTargetId(null);
    }
  }, [postModalOpened, putModalOpened, deleteModalOpened]);
  return (
    <>
      <Container pt="md" pb={100}>
        <HubTitle>行きたい場所</HubTitle>
        <Stack mt="md">
          {isLoading ? (
            <Center py="20vh">
              <Loader />
            </Center>
          ) : (
            <>
              {hubData?.length ? (
                hubData.map((item) => (
                  <Stack
                    key={item.id}
                    style={{
                      border: "1px solid",
                      borderColor: theme.colors.gray[2],
                      borderRadius: theme.radius.sm,
                    }}
                    gap={4}
                    p="md"
                  >
                    <Text fw="bold">{item.name}</Text>
                    {item.url && (
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Text truncate>{item.url}</Text>
                      </Link>
                    )}
                    <Text fz="xs" style={{ color: theme.colors.gray[6] }}>
                      {dayjs(item.updatedAt || item.createdAt).format(
                        "YYYY/MM/DD HH:mm"
                      )}
                    </Text>
                    {item.lastUpdatedUser && (
                      <Flex align="center" gap={4}>
                        <Avatar src={item.lastUpdatedUser.avatar} size="xs" />
                        <Text fz="xs">{item.lastUpdatedUser.name}</Text>
                      </Flex>
                    )}
                    <Group justify="flex-end">
                      <ActionIcon
                        color="blue"
                        radius="xl"
                        size="lg"
                        onClick={() => {
                          putModalOpen();
                          setTargetId(item.id);
                        }}
                      >
                        <IoPencil />
                      </ActionIcon>
                      <ActionIcon
                        color="red"
                        radius="xl"
                        size="lg"
                        onClick={() => {
                          deleteModalOpen();
                          setTargetId(item.id);
                        }}
                      >
                        <IoTrash />
                      </ActionIcon>
                    </Group>
                  </Stack>
                ))
              ) : (
                <Center py="20vh">
                  <Text fz="sm" style={{ color: "gray.6" }}>
                    まだ登録されていません
                  </Text>
                </Center>
              )}
            </>
          )}
        </Stack>
        <FloatingAddButton
          color={theme.colors.red[6]}
          onClick={postModalOpen}
        />
      </Container>
      <PostModal
        opened={postModalOpened}
        close={postModalClose}
        id={data?.spaceId || ""}
        hubId="hub_01"
        accessToken={liff?.getAccessToken() as any}
      />
      <PutModal
        opened={putModalOpened}
        close={putModalClose}
        id={data?.spaceId || ""}
        hubId="hub_01"
        accessToken={liff?.getAccessToken() as any}
        defaultData={{
          id: targetId || "",
          name: hubData?.find((item) => item.id === targetId)?.name || "",
          url: hubData?.find((item) => item.id === targetId)?.url || "",
        }}
      />
      <DeleteModal
        opened={deleteModalOpened}
        close={deleteModalClose}
        id={data?.spaceId || ""}
        hubId="hub_01"
        accessToken={liff?.getAccessToken() as any}
        dataId={targetId || ""}
      />
    </>
  );
});
