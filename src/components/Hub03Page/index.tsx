import { Liff } from "@line/liff";
import {
  Center,
  Container,
  Loader,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Fragment, memo, useEffect, useState } from "react";
import { HubTitle } from "../HubTitle";
import { FloatingAddButton } from "../FloatingAddButton";
import { useFetchHubData } from "@/hooks/useHubData";
import { useFetchProfile } from "@/hooks/useProfile";
import { useDisclosure } from "@mantine/hooks";
import { PostModal } from "./components/PostModal";
import { PutModal } from "./components/PutModal";
import { DeleteModal } from "./components/DeleteModal";
import { HubItem } from "./components/HubItem";
interface Props {
  liff: Liff | null;
}

export const Hub03Page = memo<Props>(({ liff }) => {
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
    accessToken: liff?.getAccessToken() || "",
  });
  const { data: hubData, isLoading } = useFetchHubData({
    id: data?.spaceId,
    hubId: "hub_03",
    accessToken: liff?.getAccessToken() || "",
  });
  useEffect(() => {
    if (!postModalOpened && !putModalOpened && !deleteModalOpened) {
      setTargetId(null);
    }
  }, [postModalOpened, putModalOpened, deleteModalOpened]);
  return (
    <>
      <Container pt="md" pb={100}>
        <HubTitle>欲しいもの</HubTitle>
        <Stack mt="md">
          {isLoading ? (
            <Center py="20vh">
              <Loader />
            </Center>
          ) : (
            <>
              {hubData?.length ? (
                hubData.map((item) => (
                  <Fragment key={item.id}>
                    <HubItem
                      id={item.id}
                      name={item.name || ""}
                      url={item.url || ""}
                      lastUpdatedUser={item.lastUpdatedUser}
                      updatedAt={item.updatedAt}
                      createdAt={item.createdAt}
                      handleEdit={(id) => {
                        setTargetId(id);
                        putModalOpen();
                      }}
                      handleDelete={(id) => {
                        setTargetId(id);
                        deleteModalOpen();
                      }}
                    />
                  </Fragment>
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
          color={theme.colors.pink[6]}
          onClick={postModalOpen}
        />
      </Container>
      <PostModal
        opened={postModalOpened}
        close={postModalClose}
        id={data?.spaceId || ""}
        hubId="hub_03"
        accessToken={liff?.getAccessToken() || ""}
      />
      <PutModal
        opened={putModalOpened}
        close={putModalClose}
        id={data?.spaceId || ""}
        hubId="hub_03"
        accessToken={liff?.getAccessToken() || ""}
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
        hubId="hub_02"
        accessToken={liff?.getAccessToken() || ""}
        dataId={targetId || ""}
      />
    </>
  );
});
