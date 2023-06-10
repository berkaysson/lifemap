import TableWrapper from "../Wrappers/TableWrapper";

import styled from "styled-components";

const DataViewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.medium};
  width: fit-content;
  border: 1px solid black;
  padding: ${({ theme }) => theme.sizes.small};
`;

const TablesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.sizes.large};
`;

const DataViewer = ({ selectedDateDataUnit, activityCategories }) => {
  if (!selectedDateDataUnit || !activityCategories) return <p>No Data</p>;

  const tableDatas = activityCategories.map((category) => ({
    categoryName: category.name,
    subCategories: category.subCategories,
    subCategoryValues: category.subCategories.map((subCategory) => {
      let tableValue = selectedDateDataUnit[category.name]?.[subCategory] || 0;
      return tableValue;
    }),
  }));

  return (
    <DataViewerWrapper>
      <h3>{selectedDateDataUnit.date}</h3>
      <TablesWrapper>
        {tableDatas.map((data, index) => (
          <TableWrapper data={data} key={index} />
        ))}
      </TablesWrapper>
    </DataViewerWrapper>
  );
};

export default DataViewer;
