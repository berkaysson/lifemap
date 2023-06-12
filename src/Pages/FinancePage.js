import styled from "styled-components";

import FinancesForm from "../Components/Finances/FinancesForm";
import FinanceDataList from "../Components/Finances/FinanceDataList";
import ParagraphContent from "../Components/Contents/ParagraphContent";
import HeaderContent from "../Components/Contents/HeaderContent";

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr minmax(550px, 80%) 1fr;
  grid-template-rows: repeat(4, auto);
  align-content: start;
  justify-content: center;
  align-items: stretch;
  justify-items: stretch;
  gap: ${({ theme }) => theme.sizes.large};
  width: 100%;
  height: 100%;
`;

const Header = styled.header`
  grid-area: 1 / 1 / 2 / 4;
`;

const Welcome = styled.div`
  grid-area: 2 / 2 / 3 / 3;
`;

const Form = styled.div`
  grid-area: 3 / 2 / 4 / 3;
  display: grid;
  align-content: start;
  justify-content: center;
  align-items: stretch;
  justify-items: stretch;
  padding: ${({ theme }) => theme.sizes.medium};
  gap: 1px;
  box-shadow: ${({ theme }) => theme.boxShadows.smallCardShadow};
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.medium};

`;

const Finance = styled.div`
  display: grid;
  grid-template-rows: 1fr; //change to 1fr 1fr responsive design
  grid-template-columns: 70% auto; //change to 1fr responsive design
`;

const List = styled.div`
  grid-area: 4 / 2 / 5 / 3;
  align-content: start;
  justify-content: center;
  align-items: stretch;
  justify-items: stretch;
  padding: ${({ theme }) => theme.sizes.medium};
  box-shadow: ${({ theme }) => theme.boxShadows.smallCardShadow};
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.medium};
`;

const FormHeader = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.sizes.small};
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
      <Header>
        <HeaderContent headerText={"Finances"} />
      </Header>
      <Welcome>
        <ParagraphContent>Definition to page</ParagraphContent>
      </Welcome>
      <Form>
      <FormHeader>Finance Form</FormHeader>
      <Finance>
        <FinancesForm
          expenseCategory={financialCategories.find(
            (obj) => obj.id === "expenseCategories"
          )}
          incomeCategory={financialCategories.find(
            (obj) => obj.id === "incomeCategories"
          )}
          onAddFinancialDataUnit={onAddFinancialDataUnit}
        />
        <ParagraphContent>Definition to form</ParagraphContent>
        </Finance>
      </Form>
      <List>
        <FinanceDataList
          financeDataUnits={financeDataUnits}
          onDeleteFinancialDataUnit={onDeleteFinancialDataUnit}
          onUpdateFinancialDataUnit={onUpdateFinancialDataUnit}
        />
      </List>
    </Wrapper>
  );
};

export default FinancePage;
