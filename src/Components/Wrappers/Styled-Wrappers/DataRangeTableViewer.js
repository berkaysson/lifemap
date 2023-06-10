import { DataGrid } from "@mui/x-data-grid";
import { theme } from "../../../Style/theme";
import styled from "styled-components";

const DataRangeTableViewerWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.sizes.small};
  height: auto;
  width: auto;
  padding: ${({ theme }) => theme.sizes.small};
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.small};
  box-shadow: ${({ theme }) => theme.boxShadows.smallCardShadow};
`;

const DataRangeTableViewer = ({
  filteredActivityDataUnits,
  activityCategories,
}) => {
  if (!filteredActivityDataUnits || !activityCategories) return <p>No Data</p>;

  const categoriesColumns = [
    { field: "date", headerName: "Date", width: 100 },
  ].concat(
    ...activityCategories?.map((category) =>
      category?.subCategories?.map((subCategory) => ({
        field: `${
          subCategory === "Other" ? `Other(${category.name})` : subCategory
        }`,
        headerName: `${
          subCategory === "Other" ? `Other(${category.name})` : subCategory
        }`,
        width: 100,
        align: "center",
      }))
    )
  );

  const valuesRows = filteredActivityDataUnits.map((dataUnit, index) => {
    const row = {
      id: index,
      date: dataUnit.date,
    };

    activityCategories.forEach((category) => {
      category.subCategories.forEach((subCategory) => {
        row[
          `${subCategory === "Other" ? `Other(${category.name})` : subCategory}`
        ] = dataUnit[category.name]?.[subCategory] || 0;
      });
    });

    return row;
  });

  console.log(filteredActivityDataUnits);
  console.log(categoriesColumns);
  console.log("111");
  console.log(valuesRows);
  return (
    <DataRangeTableViewerWrapper>
      <DataGrid
        columns={categoriesColumns}
        rows={valuesRows}
        disableSelectionOnClick
        rowSelection={false}
        rowHeight={24}
        pageSizeOptions={[5, 20, 50, 100]}
        sx={{
          bgcolor: `${theme.colors.secondary}`,
          color: `${theme.colors.primary}`,
          borderColor: `${theme.colors.alternative}`,
          borderRadius: `${theme.radius.medium}`,
          p: 1,

          "& .MuiDataGrid-row": {
            borderRadius: `${theme.radius.medium}`,
          },
          "& .MuiDataGrid-row:hover": {
            bgcolor: `${theme.colors.secondary}`,
          },
          "& .MuiDataGrid-cell": {
            borderRadius: `${theme.radius.medium}`,
          },
          "& .MuiDataGrid-cell:hover": {
            fontWeight: "bold",
          },
        }}
      />
    </DataRangeTableViewerWrapper>
  );
};

export default DataRangeTableViewer;
