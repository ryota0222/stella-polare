import { Liff } from "@line/liff";
import { Box, Container, useMantineTheme } from "@mantine/core";
import { memo } from "react";
import { HubTitle } from "../HubTitle";
import { FloatingAddButton } from "../FloatingAddButton";

interface Props {
  liff: Liff | null;
}

export const Hub01Page = memo<Props>(({ liff }) => {
  const theme = useMantineTheme();
  return (
    <Container py="md">
      <HubTitle>行きたい場所</HubTitle>
      <FloatingAddButton
        color={theme.colors.red[6]}
        onClick={() => console.log("aaa")}
      />
    </Container>
  );
});
