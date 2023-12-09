import { Container, Text } from "@mantine/core";
import { memo } from "react";

export const HubScreen = memo(() => {
  return (
    <Container>
      <Text>行きたいところ</Text>
      <Text>食べたいもの</Text>
      <Text>欲しいもの</Text>
      <Text>やりたいこと</Text>
      <Text>やること</Text>
      <Text>我が家のルール</Text>
      <Text>リマインダー</Text>
    </Container>
  );
});
