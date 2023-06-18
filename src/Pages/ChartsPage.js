import styled from "styled-components";
import { AnimatedPage } from "../Components/Wrappers/AnimatedPage";
import HeaderContent from "../Components/Contents/HeaderContent";

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr minmax(550px, 80%) 1fr;
  grid-template-rows: repeat(3, auto);
  align-content: start;
  justify-content: center;
  align-items: stretch;
  justify-items: stretch;
  gap: ${({ theme }) => theme.sizes.large};
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.sizes.medium};
  }
`;

const Header = styled.header`
  grid-area: 1 / 1 / 2 / 4;

  @media (max-width: 768px) {
    grid-area: 1 / 1 / 2 / 2;
  }
`;

const Content = styled.div`
  grid-area: 2 / 2 / 4 / 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.medium};
  padding: ${({ theme }) => theme.sizes.large};

  @media (max-width: 768px) {
    grid-area: 2 / 1 / 3 / 2;
  }
`;

const ChartsPage = () => {
  return (
    <AnimatedPage>
      <Wrapper>
        <Header>
          <HeaderContent headerText={"Charts"} />
        </Header>
        <Content>
          <h3>UNDER CONSTRUCTION</h3>
          <h4>Coming soon...</h4>
        </Content>
      </Wrapper>
    </AnimatedPage>
  );
};

export default ChartsPage;
