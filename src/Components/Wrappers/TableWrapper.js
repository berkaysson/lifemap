import { DataGrid } from "@mui/x-data-grid";
import { theme } from "../../Style/theme";

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
    <div style={{ height: "auto", width: "255px" }}>
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
          p: "1px",

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
    </div>
  );
};

export default TableWrapper;
