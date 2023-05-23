import styled from "styled-components";

import FinancesForm from "../Components/Forms/FinancesForm";
import FinanceDataList from "../Components/FinanceDataList";

const Wrapper = styled.section`
  border: 2px solid aqua;
  padding: 1rem;
`;

const FinancePage = ({
  onUpdateData,
  onDeleteSubCategory,
  onAddFinancialData,
  onUpdateFinancialData,
  onDeleteFinancialData,
  financeCategories,
  financeDatas,
}) => {
  return (
    <Wrapper>
      <h1>FinancePage</h1>
      <FinancesForm
        onUpdateData={onUpdateData}
        onDeleteSubCategory={onDeleteSubCategory}
        expenseCategory={financeCategories.find(
          (obj) => obj.id === "expenseCategories"
        )}
        incomeCategory={financeCategories.find(
          (obj) => obj.id === "incomeCategories"
        )}
        onAddFinancialData={onAddFinancialData}
      />
      <FinanceDataList
        financeDatas={financeDatas}
        onDeleteFinancialData={onDeleteFinancialData}
        onUpdateFinancialData={onUpdateFinancialData}
      />
      <div>A TEMPLATE FOR EXPENSES, LIKE WAGE = 10000</div>
      <div>A COMPONENT TO EDIT EXPENSE CATEGORIES</div>
    </Wrapper>
  );
};

export default FinancePage;
