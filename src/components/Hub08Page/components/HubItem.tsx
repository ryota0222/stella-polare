import { LinkifyWrapper } from "@/components/LinkfyWrapper";
import { Spacer } from "@/components/Spacer";
import { Profile } from "@/hooks/useProfile";
import {
  ActionIcon,
  Avatar,
  Box,
  Flex,
  Group,
  Spoiler,
  Text,
  useMantineTheme,
} from "@mantine/core";
import dayjs from "dayjs";
import { memo } from "react";
import { IoPencil, IoTrash } from "react-icons/io5";

interface Props {
  id: string;
  title: string;
  description: string;
  lastUpdatedUser?: Profile;
  updatedAt: Date | null;
  createdAt: Date;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

export const HubItem = memo<Props>(
  ({
    id,
    title,
    description,
    lastUpdatedUser,
    updatedAt,
    createdAt,
    handleEdit,
    handleDelete,
  }) => {
    const theme = useMantineTheme();
    return (
      <Box
        style={{
          border: `solid 1px ${theme.colors.gray[3]}`,
          borderRadius: theme.radius.md,
        }}
      >
        <Box p="md">
          <Text fw="bold" fz="lg">
            {title}
          </Text>
          <Flex>
            {lastUpdatedUser && (
              <Flex align="center" gap={6}>
                <Avatar src={lastUpdatedUser.avatar} size="sm" />
                <Text fz="sm">{lastUpdatedUser.name}</Text>
              </Flex>
            )}
            <Spacer />
            <Text fz="sm" mt={4} mb={8} style={{ color: theme.colors.gray[6] }}>
              {dayjs(updatedAt || createdAt).format("YYYY/MM/DD HH:mm")}
            </Text>
          </Flex>
          <Box my="xs">
            <Spoiler maxHeight={72} showLabel="もっと見る" hideLabel="閉じる">
              <LinkifyWrapper>{description}</LinkifyWrapper>
            </Spoiler>
          </Box>
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
);
