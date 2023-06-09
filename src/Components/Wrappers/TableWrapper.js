import { DataGrid } from "@mui/x-data-grid";
import { theme } from "../../Style/theme";
import styled from "styled-components";

const TableWrapperWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.sizes.small};
  height: auto;
  width: 273px; // column widths + bordersize + paddings
  padding: ${({theme}) => theme.sizes.small};
  border: 1px solid ${({theme}) => theme.colors.alternative};
  border-radius: ${({theme}) => theme.radius.small};
  box-shadow: ${({theme}) => theme.boxShadows.smallCardShadow};

`

const TableWrapper = ({ data }) => {
  const columns = [
    { field: "subCategory", headerName: "Activity type", width: 150 },
    { field: "value", headerName: "Value", width: 100 }
  ];

  const rows = data.subCategories.map((subCategory, index) => ({
    id: index,
    subCategory: subCategory,
    value: data.subCategoryValues[index]
  }));

  return (
    <TableWrapperWrapper>
      <h3>{data.categoryName} Activities</h3>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        hideFooterRowCount={true}
        hideFooterPagination={true}
        disableColumnMenu
        rowSelection={false}
        rowHeight={30}
        
        sx={{
          bgcolor: `${theme.colors.secondary}`,
          color: `${theme.colors.primary}`,
          borderColor: `${theme.colors.alternative}`,
          borderRadius: `${theme.radius.medium}`,

          "& .MuiDataGrid-footerContainer": {
            display: "none",
          },
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
    </TableWrapperWrapper>
  );
};

export default TableWrapper;
