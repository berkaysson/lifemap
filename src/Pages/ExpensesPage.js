import styled from "styled-components";

const Wrapper = styled.section`
  border: 2px solid aqua;
  padding: 1rem;
`;

const ExpensesPage = () => {
  return (
    <Wrapper>
      <h1>ExpensesPage</h1>
      <div>A COMPONENT TO ENTER EXPENSES, EDIT EXPENSES</div>
      <div>A TEMPLATE FOR EXPENSES, LIKE WAGE = 10000</div>
      <div>A COMPONENT TO EDIT EXPENSE CATEGORIES</div>
    </Wrapper>
  );
};

export default ExpensesPage;
