import styled from "styled-components";

import FinancesForm from "../Components/Finances/FinancesForm";
import FinanceDataList from "../Components/Finances/FinanceDataList";
import ParagraphContent from "../Components/Contents/ParagraphContent";
import HeaderContent from "../Components/Contents/HeaderContent";
import { AnimatedPage } from "../Components/Wrappers/AnimatedPage";
import { motion } from "framer-motion";
import { animations } from "../Style/animations";

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

const Welcome = styled.div`
  grid-area: 2 / 2 / 3 / 3;

  @media (max-width: 768px) {
    grid-area: 2 / 1 / 3 / 2;
  }
`;

const Form = styled(motion.div)`
  grid-area: 3 / 2 / 4 / 3;
  display: grid;
  align-content: start;
  justify-content: center;
  align-items: stretch;
  justify-items: stretch;
  padding: ${({ theme }) => theme.sizes.large};
  gap: 1px;
  box-shadow: ${({ theme }) => theme.boxShadows.smallCardShadow};
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.medium};
  z-index: 1;

  @media (max-width: 768px) {
    grid-area: 3 / 1 / 4 / 2;
    padding: ${({ theme }) => theme.sizes.small};
  }
`;

const Finance = styled.div`
  display: grid;
  grid-template-rows: 1fr; //change to 1fr 1fr responsive design
  grid-template-columns: 70% auto; //change to 1fr responsive design
  gap: ${({ theme }) => theme.sizes.small};

  @media (max-width: 1024px) {
    grid-template-rows: auto auto;
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.sizes.medium};
  }
`;

const List = styled(motion.div)`
  grid-area: 4 / 2 / 5 / 3;
  align-content: start;
  justify-content: center;
  align-items: stretch;
  justify-items: stretch;
  padding: ${({ theme }) => theme.sizes.large};
  box-shadow: ${({ theme }) => theme.boxShadows.smallCardShadow};
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.medium};

  @media (max-width: 768px) {
    grid-area: 4 / 1 / 5 / 2;
    padding: ${({ theme }) => theme.sizes.small};
  }
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
    <AnimatedPage>
      <Wrapper>
        <Header>
          <HeaderContent headerText={"Finances"} />
        </Header>
        <Welcome>
          <ParagraphContent>
            <b>Manage your finances effortlessly with Lifemap's Finance page</b>
            <br />
            Enter your income and expenses by selecting a category and
            specifying the amount. Easily track your financial transactions and
            gain insights into your spending habits. The page provides a lists
            your incomes and expenses, allowing you to review and analyze your
            financial activities.
          </ParagraphContent>
        </Welcome>
        <Form
          variants={animations.cardAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
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
            <ParagraphContent>
              Easily record your income and expenses by selecting the date,
              category, specifying the type (income or expense), and entering
              the amount.
            </ParagraphContent>
          </Finance>
        </Form>
        <List
          variants={animations.cardAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          <FinanceDataList
            financeDataUnits={financeDataUnits}
            onDeleteFinancialDataUnit={onDeleteFinancialDataUnit}
            onUpdateFinancialDataUnit={onUpdateFinancialDataUnit}
          />
        </List>
      </Wrapper>
    </AnimatedPage>
  );
};

export default FinancePage;
