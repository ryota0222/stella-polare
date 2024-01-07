import { Button, Modal, Stack } from "@mantine/core";
import { memo, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useDeleteHubData } from "@/hooks/useDeleteHubData";

interface Props {
  opened: boolean;
  close: () => void;
  id: string;
  accessToken: string;
  hubId: string;
  dataId: string;
}

export const DeleteModal = memo<Props>(
  ({ opened, close, id, accessToken, hubId, dataId }) => {
    const mutation = useDeleteHubData({});
    const queryClient = useQueryClient();
    const handleSubmit = useCallback(() => {
      mutation.mutate(
        {
          spaceId: id,
          hubId: hubId,
          dataId: dataId,
          accessToken,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["hub-data", { id, hubId, accessToken }],
            });
            notifications.show({
              title: "成功",
              message: "欲しいものを削除しました",
              autoClose: 5000,
            });
            close();
          },
        }
      );
    }, [accessToken, hubId, id, mutation, close, queryClient, dataId]);
    return (
      <Modal opened={opened} onClose={close} title="欲しいものを削除" centered>
        <Stack>
          <Button
            color="red"
            onClick={handleSubmit}
            loading={mutation.isPending}
            size="lg"
            radius={99}
          >
            削除
          </Button>
          <Button
            variant="subtle"
            onClick={close}
            disabled={mutation.isPending}
            size="lg"
            radius={99}
          >
            キャンセル
          </Button>
        </Stack>
      </Modal>
    );
  }
);
