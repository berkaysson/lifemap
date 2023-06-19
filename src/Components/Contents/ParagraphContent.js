import styled from "styled-components";
import { CardWrapper } from "../Wrappers/Styled-Wrappers/CardWrapper";

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.sizes.medium};

  @media (max-width: 425px){
    padding: 10px;
  }
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
