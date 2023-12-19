import { Spacer } from "@/components/Spacer";
import { Button, Modal, Stack, TextInput, Textarea } from "@mantine/core";
import { memo, useCallback, useEffect } from "react";
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
    title: string;
    description: string;
  };
}

export const PutModal = memo<Props>(
  ({ opened, close, id, accessToken, hubId, defaultData }) => {
    const mutation = usePutHubData({});
    const queryClient = useQueryClient();
    const form = useForm({
      initialValues: {
        title: defaultData.title,
        description: defaultData.description,
      },
    });
    useEffect(() => {
      if (defaultData.title) {
        form.setFieldValue("title", defaultData.title);
      }
      if (defaultData.description) {
        form.setFieldValue("description", defaultData.description);
      }
    }, [defaultData.title, defaultData.description]);
    useEffect(() => {
      if (!opened) {
        form.reset();
      }
    }, [opened]);
    const handleSubmit = useCallback(
      (values: { title: string; description: string }) => {
        mutation.mutate(
          {
            id,
            accessToken,
            body: {
              id: defaultData.id,
              title: values.title,
              description: values.description,
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
                message: "メモを更新しました",
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
      <Modal opened={opened} onClose={close} title="メモの更新" fullScreen>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack mih="calc(100dvh - 76px)" pb={40}>
            <TextInput
              data-autofocus
              required
              label="タイトル"
              placeholder=""
              size="lg"
              style={{ fontSize: 16 }}
              {...form.getInputProps("title")}
            />
            <Textarea
              required
              label="説明文"
              placeholder=""
              size="lg"
              autosize
              minRows={3}
              style={{ fontSize: 16 }}
              {...form.getInputProps("description")}
            />
            <Spacer />
            <Button
              type="submit"
              size="lg"
              radius={99}
              loading={mutation.isPending}
              color="dark"
            >
              更新
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
