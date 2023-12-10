import type { Liff } from "@line/liff";
import { Avatar, Button, Container, Stack, Text } from "@mantine/core";
import { memo } from "react";
import { Spacer } from "../Spacer";
import { useFetchProfile } from "@/hooks/useProfile";

interface Props {
  liff: Liff;
}

export const CreateSpacePage = memo<Props>(({ liff }) => {
  const { data } = useFetchProfile({ accessToken: liff.getAccessToken() });
  return (
    <Container
      py="md"
      mih="calc(100dvh - 58px)"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Stack align="center" mt="md">
        <Avatar
          src={(data as any)?.avatar}
          alt={(data as any)?.name}
          size={80}
        />
        <Text fw="bold">{(data as any)?.name}</Text>
      </Stack>
      <Spacer />
      <Button fullWidth>スペースに参加</Button>
      <Button fullWidth mt="md" variant="outline" mb={40}>
        スペースの作成
      </Button>
    </Container>
  );
});
