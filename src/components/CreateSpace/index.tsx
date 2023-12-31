import type { Liff } from "@line/liff";
import {
  Avatar,
  Button,
  Container,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { memo, useCallback, useMemo, useState } from "react";
import { Spacer } from "../Spacer";
import { useFetchProfile } from "@/hooks/useProfile";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import client from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

interface Props {
  liff: Liff;
}

export const CreateSpacePage = memo<Props>(({ liff }) => {
  const { data } = useFetchProfile({ accessToken: liff.getAccessToken() });
  const [pending, setPending] = useState(false);
  const queryClient = useQueryClient();
  const [joinModalOpened, { open: joinModalOpen, close: joinModalClose }] =
    useDisclosure(false);
  const [
    createModalOpened,
    { open: createModalOpen, close: createModalClose },
  ] = useDisclosure(false);
  const opened = useMemo(
    () => joinModalOpened || createModalOpened,
    [joinModalOpened, createModalOpened]
  );
  const close = useCallback(() => {
    joinModalClose();
    createModalClose();
  }, [createModalClose, joinModalClose]);
  const title = useMemo(() => {
    if (joinModalOpened) return "スペースに参加";
    if (createModalOpened) return "スペースの作成";
    return "";
  }, [joinModalOpened, createModalOpened]);
  const form = useForm({
    initialValues: {
      password: "",
    },
  });
  const handleSubmit = useCallback(
    async (password: string) => {
      try {
        setPending(true);
        if (joinModalOpened) {
          const response = await client.post(
            "/spaces/join",
            {
              password,
            },
            {
              headers: {
                Authorization: `Bearer ${liff.getAccessToken()}`,
              },
            }
          );
          await queryClient.invalidateQueries({
            queryKey: [
              "spaces",
              { id: response.data, accessToken: liff.getAccessToken() },
            ],
          });
        } else if (createModalOpened) {
          const response = await client.post(
            "/spaces",
            {
              password,
            },
            {
              headers: {
                Authorization: `Bearer ${liff.getAccessToken()}`,
              },
            }
          );
          if (response.data) {
            await queryClient.invalidateQueries({
              queryKey: [
                "spaces",
                { id: response.data, accessToken: liff.getAccessToken() },
              ],
            });
          }
        }
        setPending(false);
      } catch (err) {
        if (err instanceof Error) {
          notifications.show({
            title: "エラー",
            message: err.message,
            autoClose: 5000,
          });
        }
        setPending(false);
      }
    },
    [createModalOpened, joinModalOpened, liff, queryClient]
  );
  return (
    <>
      <Container
        pt="md"
        pb={40}
        mih="calc(100dvh - 58px)"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Stack align="center" mt="md">
          <Avatar src={data?.avatar} alt={data?.name} size={80} />
          <Text fw="bold">{(data as any)?.name}</Text>
        </Stack>
        <Spacer />
        <Button
          fullWidth
          onClick={joinModalOpen}
          size="lg"
          radius={99}
          color="dark"
        >
          スペースに参加
        </Button>
        <Button
          fullWidth
          mt="md"
          variant="outline"
          mb={40}
          size="lg"
          radius={99}
          onClick={createModalOpen}
          color="dark"
        >
          スペースの作成
        </Button>
      </Container>
      <Modal opened={opened} onClose={close} title={title}>
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values.password))}
        >
          <TextInput
            withAsterisk
            label="合言葉を入力してください"
            placeholder="アイコトバ"
            {...form.getInputProps("password")}
          />
          <Group justify="flex-end" mt="md">
            <Button
              type="submit"
              loading={pending}
              size="lg"
              radius={99}
              color="dark"
            >
              {joinModalOpened ? "参加" : "作成"}
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
});
