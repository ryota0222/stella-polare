import { Spacer } from "@/components/Spacer";
import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { memo, useCallback, useEffect } from "react";
import { useForm } from "@mantine/form";
import { usePostHubData } from "@/hooks/usePostHubData";
import { useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

interface Props {
  opened: boolean;
  close: () => void;
  id: string;
  accessToken: string;
  hubId: string;
}

export const PostModal = memo<Props>(
  ({ opened, close, id, accessToken, hubId }) => {
    const mutation = usePostHubData({});
    const queryClient = useQueryClient();
    const form = useForm({
      initialValues: {
        name: "",
        url: "",
      },
    });
    const handleSubmit = useCallback(
      (values: { name: string; url: string }) => {
        mutation.mutate(
          {
            id,
            accessToken,
            body: {
              name: values.name,
              url: values.url.length ? values.url : null,
              hubId: hubId,
            },
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ["hub-data", { id, hubId, accessToken }],
              });
              notifications.show({
                title: "成功",
                message: "行きたい場所を追加しました",
                autoClose: 5000,
              });
              close();
            },
          }
        );
      },
      [accessToken, hubId, id, mutation, close, queryClient]
    );
    useEffect(() => {
      if (!opened) {
        form.reset();
      }
    }, [opened]);
    return (
      <Modal
        opened={opened}
        onClose={close}
        title="行きたい場所を追加"
        fullScreen
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack mih="calc(100dvh - 76px)" pb={16}>
            <TextInput
              data-autofocus
              required
              label="名前"
              placeholder=""
              size="lg"
              style={{
                fontSize: 16,
              }}
              {...form.getInputProps("name")}
            />
            <TextInput
              required
              label="URL"
              type="url"
              placeholder=""
              size="lg"
              style={{ fontSize: 16 }}
              {...form.getInputProps("url")}
            />
            <Spacer />
            <Button
              type="submit"
              size="lg"
              radius={99}
              loading={mutation.isPending}
              color="dark"
            >
              追加
            </Button>
            <Button
              variant="subtle"
              size="lg"
              radius={99}
              onClick={close}
              disabled={mutation.isPending}
              color="dark"
            >
              キャンセル
            </Button>
          </Stack>
        </form>
      </Modal>
    );
  }
);
