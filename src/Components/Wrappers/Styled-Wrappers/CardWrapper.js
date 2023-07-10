import styled from "styled-components";
import { AnimatedCards } from "../AnimatedCards";

const CardWrapperWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.medium};
  box-shadow: ${({ theme, disableBoxShadow = false }) =>
    disableBoxShadow ? "none" : theme.boxShadows.smallCardShadow};
`;

export const CardWrapper = ({ children }) => {
  return (
    <AnimatedCards transition={{ duration: 0.2, ease: "easeOut" }}>
      <CardWrapperWrapper>{children}</CardWrapperWrapper>
    </AnimatedCards>
  );
};
