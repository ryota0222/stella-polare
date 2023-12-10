import { Box } from "@mantine/core";
import React, { memo } from "react";

export const Spacer = memo(() => {
  return (
    <Box
      role="presentation"
      style={{
        flex: "1 1 0%",
        placeSelf: "stretch",
      }}
    ></Box>
  );
});
