import { useFetchProfile } from "@/hooks/useProfile";
import { Container, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";

interface Props {
  accessToken: string;
}

export const HubScreen = memo<Props>(({ accessToken }) => {
  const router = useRouter();
  const { data } = useFetchProfile({ accessToken });
  useEffect(() => {
    if (data && !data.spaceId) {
      router.replace("/createSpace");
    }
  }, [data]);
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
