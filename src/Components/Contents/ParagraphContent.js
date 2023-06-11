import styled from "styled-components";

const Wrapper = styled.div`
  border: 1px solid ${({theme})=> theme.colors.alternative};
  padding: ${({theme})=> theme.sizes.medium};
  border-radius: ${({theme})=> theme.radius.medium};
  box-shadow: ${({theme})=> theme.boxShadows.smallCardShadow};
`;

const ParagraphContent = ({ children }) => {
  return (
    <Wrapper>
      <p>{children}</p>
    </Wrapper>
  );
};

export default ParagraphContent;
