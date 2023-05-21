import styled from "styled-components";

import ExpensesUpdaterForm from "../Components/Forms/ExpensesUpdaterForm";

const Wrapper = styled.section`
  border: 2px solid aqua;
  padding: 1rem;
`;

const ExpensesPage = ({onUpdateData, onDeleteSubCategory, expenseCategory, onUpdateFinancialData}) => {
  return (
    <Wrapper>
      <h1>ExpensesPage</h1>
      <ExpensesUpdaterForm
        onUpdateData={onUpdateData}
        onDeleteSubCategory={onDeleteSubCategory}
        expenseCategory={expenseCategory}
        onUpdateFinancialData={onUpdateFinancialData}
      />
      <div>A LIST OF EXPENSES OF THAT DATE, EACH EXPENSE ITEM WILL HAVE EDIT BUTTON TO EDIT THAT EXPENSE DATA</div>
      <div>A TEMPLATE FOR EXPENSES, LIKE WAGE = 10000</div>
      <div>A COMPONENT TO EDIT EXPENSE CATEGORIES</div>
    </Wrapper>
  );
};

export default ExpensesPage;
