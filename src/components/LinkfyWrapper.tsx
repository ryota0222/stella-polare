import { Text } from "@mantine/core";
import { PropsWithChildren, ReactNode, memo } from "react";
import Linkify from "react-linkify";

export const LinkifyWrapper = memo<PropsWithChildren>(({ children }) => {
  const componentDecorator = (
    href: string,
    text: string,
    key: number
  ): ReactNode => (
    <a href={href} key={key} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
  return (
    <Linkify componentDecorator={componentDecorator}>
      <Text style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
        {children}
      </Text>
    </Linkify>
  );
});
