import DataViewer from "./DataViewer";
import DataViewerForm from "./Forms/DataViewerForm";
import DataUpdaterForm from "./Forms/DataUpdaterForm";

const AppContent = ({onCreateToday, onGetDataByDate, onUpdateData, selectedDate}) => {
  return (
    <>
      <button onClick={onCreateToday}>Create Today</button>
      <DataUpdaterForm onUpdateData={onUpdateData} />
      <DataViewerForm onDateSelection={onGetDataByDate} />
      <DataViewer selectedDate={selectedDate} />
    </>
  );
}

export default AppContent;