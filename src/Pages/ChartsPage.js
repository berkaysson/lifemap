import styled from "styled-components";
import { AnimatedPage } from "../Components/Wrappers/AnimatedPage";

const Wrapper = styled.section`
  border: 2px solid brown;
  padding: 1rem;
`;

const ChartsPage = () => {
  return (
    <AnimatedPage>
      <Wrapper>
        <h1>ChartsPage</h1>
        <div>CHARTS</div>
      </Wrapper>
    </AnimatedPage>
  );
};

export default ChartsPage;
