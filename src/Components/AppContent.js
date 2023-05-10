import DataViewer from "./DataViewer";
import DataViewerForm from "./Forms/DataViewerForm";
import DataUpdaterForm from "./Forms/DataUpdaterForm";
import CategoryUpdateForm from "./Forms/CategoryUpdateForm";

const AppContent = ({
  onCreateToday,
  onGetDataByDate,
  onUpdateData,
  selectedDateDataUnit,
  onUpdateCategory,
  onDeleteSubCategory,
  categories,
  categoryOptions
}) => {
  return (
    <>
      <button onClick={onCreateToday}>Create Today</button>
      <DataUpdaterForm 
        onUpdateData={onUpdateData} 
        categories={categories}
        categoryOptions={categoryOptions}
        />
      <DataViewerForm onDateSelection={onGetDataByDate} />
      <CategoryUpdateForm
        onUpdateCategory={onUpdateCategory}
        onDeleteSubCategory={onDeleteSubCategory}
        categories={categories}
        categoryOptions={categoryOptions}
      />
      <DataViewer selectedDateDataUnit={selectedDateDataUnit} />
    </>
  );
};

export default AppContent;