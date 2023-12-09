import { APP_NAME } from "@/constant";
import { Box, Image, Title, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import { memo } from "react";

export const Header = memo(() => {
  const theme = useMantineTheme();
  return (
    <Box
      component="header"
      py={8}
      style={{
        display: "flex",
        alignItems: "center",
        border: `solid 1px ${theme.colors.gray[3]}`,
      }}
    >
      <Link href="/">
        <Image src="/logo.png" width={40} height={40} alt="ロゴ" />
      </Link>
      <Title size="h5">{APP_NAME}</Title>
    </Box>
  );
});
