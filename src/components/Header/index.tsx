import { APP_NAME } from "@/constant";
import {
  Box,
  Button,
  CopyButton,
  Image,
  Title,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import { memo } from "react";
import { Spacer } from "../Spacer";

interface Props {
  accessToken: string | null;
}

export const Header = memo<Props>(({ accessToken }) => {
  const theme = useMantineTheme();
  return (
    <Box
      component="header"
      py={8}
      px="md"
      style={{
        display: "flex",
        alignItems: "center",
        borderBottom: `solid 1px ${theme.colors.gray[3]}`,
      }}
    >
      <Box w={40} h={40}>
        <Link href="/">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="ロゴ"
            style={{ borderRadius: 20 }}
          />
        </Link>
      </Box>
      <Title ml="sm" size="h5">
        {APP_NAME}
      </Title>
      <Spacer />
      {accessToken && (
        <CopyButton value={accessToken}>
          {({ copied, copy }) => (
            <Button color={copied ? "teal" : "blue"} onClick={copy} size="xs">
              {copied ? "㊙️" : "👍"}
            </Button>
          )}
        </CopyButton>
      )}
    </Box>
  );
});
