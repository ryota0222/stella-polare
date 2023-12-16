import { usePostOgpData } from "@/hooks/usePostOgpData";
import { Profile } from "@/hooks/useProfile";
import {
  ActionIcon,
  Avatar,
  Box,
  Flex,
  Group,
  Image,
  Skeleton,
  Text,
  useMantineTheme,
} from "@mantine/core";
import dayjs from "dayjs";
import { memo, useCallback, useEffect, useState } from "react";
import { IoPencil, IoTrash } from "react-icons/io5";

interface Props {
  id: string;
  name: string;
  url: string;
  lastUpdatedUser?: Profile;
  updatedAt: Date | null;
  createdAt: Date;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

export const HubItem = memo<Props>(
  ({
    id,
    name,
    url,
    lastUpdatedUser,
    updatedAt,
    createdAt,
    handleEdit,
    handleDelete,
  }) => {
    const mutation = usePostOgpData({});
    const theme = useMantineTheme();
    const [data, setData] = useState<{
      [key: string]: string | undefined;
    } | null>(null);
    const handleWholeClick = useCallback(() => {
      window.open(url, "_blank");
    }, [url]);
    useEffect(() => {
      if (url) {
        mutation.mutate(
          { url },
          {
            onSuccess: (data) => {
              setData(data);
            },
          }
        );
      }
    }, [url]);
    if (mutation.isPending) {
      return (
        <Box
          style={{
            border: `solid 1px ${theme.colors.gray[3]}`,
            borderRadius: theme.radius.md,
            overflow: "hidden",
          }}
        >
          <Skeleton visible h={200} />
          <Box p="md">
            <Skeleton visible height={20} />
            <Skeleton visible width={120} height={20} mt={4} mb={8} />
            <Flex align="center" gap={6}>
              <Skeleton circle visible w={32} h={32} />
              <Skeleton visible width={80} height={20} />
            </Flex>
          </Box>
        </Box>
      );
    }
    if (data !== null) {
      return (
        <Box
          style={{
            border: `solid 1px ${theme.colors.gray[3]}`,
            borderRadius: theme.radius.md,
            overflow: "hidden",
          }}
          onClick={handleWholeClick}
        >
          {data["og:image"] && (
            <Image
              src={data["og:image"]}
              alt="サムネイル"
              h={200}
              style={{ borderBottom: `solid 1px ${theme.colors.gray[3]}` }}
            />
          )}
          <Box p="md">
            <Text fw="bold" fz="lg">
              {name}
            </Text>
            <Text fz="sm" mt={4} mb={8} style={{ color: theme.colors.gray[6] }}>
              {dayjs(updatedAt || createdAt).format("YYYY/MM/DD HH:mm")}
            </Text>
            {lastUpdatedUser && (
              <Flex align="center" gap={6}>
                <Avatar src={lastUpdatedUser.avatar} size="sm" />
                <Text fz="sm">{lastUpdatedUser.name}</Text>
              </Flex>
            )}
            <Group justify="flex-end">
              <ActionIcon
                color="blue"
                radius="xl"
                size="lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(id);
                }}
              >
                <IoPencil />
              </ActionIcon>
              <ActionIcon
                color="red"
                radius="xl"
                size="lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(id);
                }}
              >
                <IoTrash />
              </ActionIcon>
            </Group>
          </Box>
        </Box>
      );
    }
    return <></>;
  }
);
