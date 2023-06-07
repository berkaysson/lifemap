import styled from "styled-components";

import FinancesForm from "../Components/Finances/FinancesForm";
import FinanceDataList from "../Components/Finances/FinanceDataList";

const Wrapper = styled.section`
  border: 2px solid aqua;
  padding: 1rem;
`;

const FinancePage = ({
  onAddFinancialDataUnit,
  onUpdateFinancialDataUnit,
  onDeleteFinancialDataUnit,
  financialCategories,
  financeDataUnits,
}) => {
  return (
    <Wrapper>
      <h1>FinancePage</h1>
      <FinancesForm
        expenseCategory={financialCategories.find(
          (obj) => obj.id === "expenseCategories"
        )}
        incomeCategory={financialCategories.find(
          (obj) => obj.id === "incomeCategories"
        )}
        onAddFinancialDataUnit={onAddFinancialDataUnit}
      />
      <FinanceDataList
        financeDataUnits={financeDataUnits}
        onDeleteFinancialDataUnit={onDeleteFinancialDataUnit}
        onUpdateFinancialDataUnit={onUpdateFinancialDataUnit}
      />
      <div>A TEMPLATE FOR EXPENSES, LIKE WAGE = 10000</div>
      <div>A COMPONENT TO EDIT EXPENSE CATEGORIES</div>
    </Wrapper>
  );
};

export default FinancePage;
