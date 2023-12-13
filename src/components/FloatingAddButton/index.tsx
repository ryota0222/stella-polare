import { ActionIcon, Box, Flex, Title, rem } from "@mantine/core";
import { useRouter } from "next/router";
import { PropsWithChildren, memo } from "react";
import { IoAdd } from "react-icons/io5";

interface Props {
  color?: string;
  onClick: () => void;
}

export const FloatingAddButton = memo<Props>(({ color, onClick }) => {
  return (
    <Box pos="fixed" right={16} bottom={40}>
      <ActionIcon
        size={64}
        onClick={onClick}
        color={color}
        radius={32}
        style={{ boxShadow: "rgba(0, 0, 0, 0.125) 0px 8px 12px 2px" }}
      >
        <IoAdd color="#FFFFFF" style={{ width: rem(24), height: rem(24) }} />
      </ActionIcon>
    </Box>
  );
});
