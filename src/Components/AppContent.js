import DataViewer from "./DataViewer";
import DataViewerForm from "./Forms/DataViewerForm";
import DataUpdaterForm from "./Forms/DataUpdaterForm";
import CategoryUpdateForm from "./Forms/CategoryUpdateForm";
import DexieImportExport from "./DexieImportExport";

const AppContent = ({
  onCreateToday,
  onGetDataByDate,
  onUpdateData,
  selectedDateDataUnit,
  onUpdateCategory,
  onDeleteSubCategory,
  categories,
  categoryOptions,
  onExport,
  onImport,
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
      <DataViewer
        selectedDateDataUnit={selectedDateDataUnit}
        categories={categories}
      />
      <DexieImportExport onExport={onExport} onImport={onImport} />
    </>
  );
};

export default AppContent;
