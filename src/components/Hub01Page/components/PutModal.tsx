import { Spacer } from "@/components/Spacer";
import { Button, Modal, Stack, TextInput } from "@mantine/core";
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
    useEffect(() => {
      if (defaultData.name) {
        form.setFieldValue("name", defaultData.name);
      }
      if (defaultData.url) {
        form.setFieldValue("url", defaultData.url);
      }
    }, [defaultData.name, defaultData.url]);
    useEffect(() => {
      if (!opened) {
        form.reset();
      }
    }, [opened]);
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
          <Stack mih="calc(100dvh - 76px)" pb={40}>
            <TextInput
              data-autofocus
              required
              label="名前"
              placeholder=""
              size="lg"
              style={{ fontSize: 16 }}
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
