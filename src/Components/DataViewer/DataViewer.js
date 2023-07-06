import RefreshButton from "../Wrappers/Styled-Elements/RefreshButton";
import { CardWrapper } from "../Wrappers/Styled-Wrappers/CardWrapper";
import TableWrapper from "../Wrappers/Styled-Wrappers/TableWrapper";

import styled from "styled-components";

const DataViewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.medium};
  padding: ${({ theme }) => theme.sizes.large};

  @media (max-width:768px) {
    padding: ${({ theme }) => theme.sizes.medium};
    gap: ${({ theme }) => theme.sizes.small};
  }

  @media (max-width: 375px){
    padding: 6px;
  }
`;

const TablesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.sizes.large};

  @media (max-width:768px) {
    gap: ${({ theme }) => theme.sizes.medium};
  }
`;

const DataViewer = ({ selectedDateDataUnit, activityCategories,fetchUpdateHandler }) => {
  if (!selectedDateDataUnit || !activityCategories) return (<p>No Data
    <br /> <RefreshButton fetchUpdateHandler={fetchUpdateHandler} />
  </p>);

  const tableDatas = activityCategories.map((category) => ({
    categoryName: category.name,
    subCategories: category.subCategories,
    subCategoryValues: category.subCategories.map((subCategory) => {
      let tableValue = selectedDateDataUnit[category.name]?.[subCategory] || 0;
      return tableValue;
    }),
  }));

  return (
    <CardWrapper>
      <DataViewerWrapper>
        <h3>{selectedDateDataUnit.date}</h3>
        <TablesWrapper>
          {tableDatas.map((data, index) => (
            <TableWrapper data={data} key={index} />
          ))}
        </TablesWrapper>
      </DataViewerWrapper>
    </CardWrapper>
  );
};

export default DataViewer;
