import styled from "styled-components";

export const CardWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.medium};
  box-shadow: ${({ theme, disableBoxShadow = false }) =>
    disableBoxShadow ? "none" : theme.boxShadows.smallCardShadow};
`;
