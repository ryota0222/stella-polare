import { Box, Center, Text, useMantineTheme } from "@mantine/core";
import { memo, useCallback } from "react";
import { IHubItem } from "./types";
import { useRouter } from "next/router";

export const HubItem = memo<IHubItem>(
  ({ id, title, color, isComingSoon, icon: IconComponent }) => {
    const theme = useMantineTheme();
    const router = useRouter();
    const handleClick = useCallback(() => {
      if (isComingSoon) return;
      router.push(`/hub/${id}`);
    }, [id, router, isComingSoon]);
    return (
      <Box
        role={isComingSoon ? undefined : "button"}
        onClick={handleClick}
        bg={theme.colors[color][0]}
        p="sm"
        style={{ borderRadius: theme.radius.md }}
        pos="relative"
      >
        <Box opacity={isComingSoon ? 0.4 : 1}>
          <IconComponent color={theme.colors[color][6]} size={20} />
        </Box>
        <Text
          fw="bold"
          fz="lg"
          style={{ color: theme.colors[color][6] }}
          opacity={isComingSoon ? 0.4 : 1}
        >
          {title}
        </Text>
      </Box>
    );
  }
);
