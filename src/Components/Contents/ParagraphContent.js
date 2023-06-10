import styled from "styled-components";

const Wrapper = styled.div`
  border: 1px solid ${({theme})=> theme.colors.alternative};
  padding: ${({theme})=> theme.sizes.small};
  border-radius: ${({theme})=> theme.radius.small};
  box-shadow: ${({theme})=> theme.boxShadows.smallCardShadow};
`;

const ParagraphContent = ({ text }) => {
  return (
    <Wrapper>
      <p>{text}</p>
    </Wrapper>
  );
};

export default ParagraphContent;
