import { Spacer } from "@/components/Spacer";
import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { memo, useCallback } from "react";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { usePutHubData } from "@/hooks/usePutHubData";

interface Props {
  opened: boolean;
  close: () => void;
  id: string;
  accessToken: string;
  hubId: string;
  defaultData: {
    id: string;
    name: string;
    url: string;
  };
}

export const PutModal = memo<Props>(
  ({ opened, close, id, accessToken, hubId, defaultData }) => {
    const mutation = usePutHubData({});
    const queryClient = useQueryClient();
    const form = useForm({
      initialValues: {
        name: defaultData.name,
        url: defaultData.url,
      },
    });
    const handleSubmit = useCallback(
      (values: { name: string; url: string }) => {
        mutation.mutate(
          {
            id,
            accessToken,
            body: {
              id: defaultData.id,
              name: values.name,
              url: values.url,
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
                message: "行きたい場所を更新しました",
                autoClose: 5000,
              });
              close();
            },
          }
        );
      },
      [accessToken, hubId, id, mutation, close, queryClient, defaultData]
    );
    return (
      <Modal
        opened={opened}
        onClose={close}
        title="行きたい場所の更新"
        fullScreen
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack mih="calc(100dvh - 76px)">
            <TextInput
              data-autofocus
              required
              label="名前"
              placeholder=""
              {...form.getInputProps("name")}
            />
            <TextInput
              label="URL"
              type="url"
              placeholder=""
              {...form.getInputProps("url")}
            />
            <Spacer />
            <Button type="submit" loading={mutation.isPending}>
              更新
            </Button>
            <Button
              variant="subtle"
              onClick={close}
              disabled={mutation.isPending}
            >
              キャンセル
            </Button>
          </Stack>
        </form>
      </Modal>
    );
  }
);
