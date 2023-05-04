import DataViewer from "./DataViewer";
import DataViewerForm from "./Forms/DataViewerForm";

const AppContent = () => {
  return (
    <>
      <button>Create Today</button>
      <DataViewerForm />
      <DataViewer />
    </>
  );
}

export default AppContent;