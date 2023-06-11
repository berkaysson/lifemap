import styled from "styled-components";
import { CardWrapper } from "../Wrappers/Styled-Wrappers/CardWrapper";

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.sizes.medium};
`;

const ParagraphContent = ({ children }) => {
  return (
    <CardWrapper>
      <Wrapper>
        <p>{children}</p>
      </Wrapper>
    </CardWrapper>
  );
};

export default ParagraphContent;
