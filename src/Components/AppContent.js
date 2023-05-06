import DataViewer from "./DataViewer";
import DataViewerForm from "./Forms/DataViewerForm";
import DataUpdaterForm from "./Forms/DataUpdaterForm";
import CategoryUpdateForm from "./Forms/CategoryUpdateForm";

const AppContent = ({
  onCreateToday,
  onGetDataByDate,
  onUpdateData,
  selectedDate,
  onGetAllCategories,
  onUpdateCategory,
  onDeleteSubCategory
}) => {
  return (
    <>
      <button onClick={onCreateToday}>Create Today</button>
      <DataUpdaterForm onUpdateData={onUpdateData} />
      <DataViewerForm onDateSelection={onGetDataByDate} />
      <CategoryUpdateForm
        onGetAllCategories={onGetAllCategories}
        onUpdateCategory={onUpdateCategory}
        onDeleteSubCategory={onDeleteSubCategory}
      />
      <DataViewer selectedDate={selectedDate} />
    </>
  );
};

export default AppContent;