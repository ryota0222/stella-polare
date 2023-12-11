import { ActionIcon, Flex, Title, rem } from "@mantine/core";
import { useRouter } from "next/router";
import { PropsWithChildren, memo } from "react";
import { IoArrowBack } from "react-icons/io5";

export const HubTitle = memo<PropsWithChildren>(({ children }) => {
  const router = useRouter();
  return (
    <Flex gap="xs" align="center">
      <ActionIcon
        size={28}
        variant="default"
        aria-label="戻る"
        onClick={() => router.back()}
      >
        <IoArrowBack style={{ width: rem(16), height: rem(16) }} />
      </ActionIcon>
      <Title size="h4">{children}</Title>
    </Flex>
  );
});
