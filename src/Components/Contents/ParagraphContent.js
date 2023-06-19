import styled from "styled-components";
import { CardWrapper } from "../Wrappers/Styled-Wrappers/CardWrapper";

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.sizes.medium};

  @media (max-width: 425px){
    padding: 10px;
  }

  @media (max-width: 375px){
    padding: 6px;
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
