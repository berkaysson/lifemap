import styled from "styled-components";
import { AnimatedPage } from "../Components/Wrappers/AnimatedPage";
import HeaderContent from "../Components/Contents/HeaderContent";
import CategorySubCategorySelect from "../Components/Categories/CategorySubCategorySelect";
import { useEffect, useState } from "react";
import DateRangeSelector from "./../Components/Wrappers/DateRangeSelector";
import Charts from "../Components/Charts/Charts";

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
  justify-content: flex-start;
  align-items: center;
  gap: 3rem;
  width: 100%;
  height: 1200px;
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.medium};
  padding: ${({ theme }) => theme.sizes.large};

  svg:last-child {
    border: ${({ theme }) => theme.colors.alternative} 1px solid;
    border-radius: ${({ theme }) => theme.radius.medium};
  }

  @media (max-width: 768px) {
    grid-area: 2 / 1 / 3 / 2;
  }
`;

const ChartFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    margin-bottom: 1rem;
    gap: 2rem;
  }
`;

const ChartsPage = ({ activityDataUnits, activityCategories }) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [subCategoryOptions, setSubCategoryOptions] = useState();

  async function fetchCategories() {
    const selectedCategoryName = selectedCategory?.name;
    const category = activityCategories.find(
      (item) => item.name === selectedCategoryName
    );
    setSubCategories(category?.subCategories ?? []);
  }

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update the select dropdown options when the subCategories change
  useEffect(() => {
    setSubCategoryOptions(() =>
      subCategories.map((subCategory) => ({
        label: subCategory,
        value: subCategory,
        subCategory: subCategory,
      }))
    );
  }, [activityCategories, subCategories]);

  const categorySelectionHandler = (selectedCategory) => {
    setSelectedCategory(selectedCategory);

    const category = activityCategories.find(
      (item) => item.id === selectedCategory.value
    );
    setSubCategories(category.subCategories);
  };

  const subCategorySelectHandler = (category, subCategory) => {
    setSelectedSubCategory(subCategory);
    categorySelectionHandler(category);
  };

  const dateRangeHandler = (start, end) => {
    setDateRange({ startDate: start, endDate: end });
  };
  return (
    <AnimatedPage>
      <Wrapper>
        <Header>
          <HeaderContent headerText={"Charts"} />
        </Header>
        <Content>
          <h3>Select chart type, date and category </h3>
          <ChartFormWrapper>
            <DateRangeSelector onSubmit={dateRangeHandler} />
            <CategorySubCategorySelect
              categories={activityCategories}
              onSubCategorySelect={subCategorySelectHandler}
            />
          </ChartFormWrapper>
          {!selectedCategory && !selectedSubCategory ? (
            <h3>Please select Category</h3>
          ) : (
            <Charts
              activityDataUnits={activityDataUnits}
              dateRange={dateRange}
              selectedCategory={selectedCategory}
              selectedSubCategory={selectedSubCategory}
              selectedChartType={"bar"}
            />
          )}
        </Content>
      </Wrapper>
    </AnimatedPage>
  );
};

export default ChartsPage;
