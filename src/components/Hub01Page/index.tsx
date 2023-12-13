import { Liff } from "@line/liff";
import {
  Avatar,
  Box,
  Container,
  Flex,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { memo } from "react";
import { HubTitle } from "../HubTitle";
import { FloatingAddButton } from "../FloatingAddButton";
import dayjs from "@/lib/dayjs";
import Link from "next/link";
interface Props {
  liff: Liff | null;
}

const response = [
  {
    id: "733GrQ5evaf64j4mA8pv",
    createdAt: "2023-12-13T02:00:33+09:00",
    url: "https://acerola.tips",
    name: "title100",
    updatedAt: "2023-12-13T02:12:42+09:00",
    lastUpdatedUser: {
      name: "松本 亮太",
      avatar:
        "https://profile.line-scdn.net/0hCSDkoihVHHxpEjXXr1FiAxlCHxZKY0VuRHIGG15CQEhcIgh6RSNTEw4TRB9cdl4iQyYGGFsWSk9lAWsad0TgSG4iQU1VIVspQHdbkg",
      userId: "U8c3fb9c7f335f1ed474271dd5ba0819c",
      spaceId: "mT6iLn6moinpH5zKYgH0",
    },
  },
  {
    id: "c6A5H2KxNA1poV4V1qtr",
    url: "https://tabelog.com/hyogo/A2801/A280101/28061632/",
    name: "title",
    createdAt: "2023-12-12T16:05:56+09:00",
    updatedAt: "2023-12-12T20:13:20+09:00",
    lastUpdatedUser: {
      name: "松本 亮太",
      avatar:
        "https://profile.line-scdn.net/0hCSDkoihVHHxpEjXXr1FiAxlCHxZKY0VuRHIGG15CQEhcIgh6RSNTEw4TRB9cdl4iQyYGGFsWSk9lAWsad0TgSG4iQU1VIVspQHdbkg",
      userId: "U8c3fb9c7f335f1ed474271dd5ba0819c",
      spaceId: "mT6iLn6moinpH5zKYgH0",
    },
  },
  {
    id: "qsgjS3zOkPELLRnHRODy",
    createdAt: "2023-12-13T02:32:03+09:00",
    name: "title200",
    lastUpdatedUser: {
      name: "松本 亮太",
      avatar:
        "https://profile.line-scdn.net/0hCSDkoihVHHxpEjXXr1FiAxlCHxZKY0VuRHIGG15CQEhcIgh6RSNTEw4TRB9cdl4iQyYGGFsWSk9lAWsad0TgSG4iQU1VIVspQHdbkg",
      userId: "U8c3fb9c7f335f1ed474271dd5ba0819c",
      spaceId: "mT6iLn6moinpH5zKYgH0",
    },
    url: null,
    updatedAt: null,
  },
  {
    id: "WnmR7jIzP2oPZQ7miZh4",
    createdAt: "2023-12-13T02:03:48+09:00",
    name: "title2",
    url: null,
    updatedAt: null,
    lastUpdatedUser: {
      name: "松本 亮太",
      avatar:
        "https://profile.line-scdn.net/0hCSDkoihVHHxpEjXXr1FiAxlCHxZKY0VuRHIGG15CQEhcIgh6RSNTEw4TRB9cdl4iQyYGGFsWSk9lAWsad0TgSG4iQU1VIVspQHdbkg",
      userId: "U8c3fb9c7f335f1ed474271dd5ba0819c",
      spaceId: "mT6iLn6moinpH5zKYgH0",
    },
  },
  {
    id: "QKSkJR678Iwr1L52nXT6",
    createdAt: "2023-12-13T02:27:12+09:00",
    name: "title2",
    url: null,
    updatedAt: null,
    lastUpdatedUser: {
      name: "松本 亮太",
      avatar:
        "https://profile.line-scdn.net/0hCSDkoihVHHxpEjXXr1FiAxlCHxZKY0VuRHIGG15CQEhcIgh6RSNTEw4TRB9cdl4iQyYGGFsWSk9lAWsad0TgSG4iQU1VIVspQHdbkg",
      userId: "U8c3fb9c7f335f1ed474271dd5ba0819c",
      spaceId: "mT6iLn6moinpH5zKYgH0",
    },
  },
];

export const Hub01Page = memo<Props>(({ liff }) => {
  const theme = useMantineTheme();
  return (
    <Container py="md">
      <HubTitle>行きたい場所</HubTitle>
      <Stack>
        {response.map((item) => (
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
              <Link href={item.url} target="_blank" rel="noopener noreferrer">
                {item.url}
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
          </Stack>
        ))}
      </Stack>
      <FloatingAddButton
        color={theme.colors.red[6]}
        onClick={() => console.log("aaa")}
      />
    </Container>
  );
});
