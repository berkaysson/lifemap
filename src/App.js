import DataViewerForm from "./Components/Form/DataViewerForm";
import DataForm from "./Components/Form/DataForm";

import data from './Data/data.json'
import DataViewer from "./Components/Dashboard/DataViewer";
import { useEffect, useState } from "react";

function App() {
  const [selectedViewData, setSelectedViewData] = useState()

  const displayData = (date) => {
    setSelectedViewData(searchObjectByDate(date));
  }

  function searchObjectByDate(date) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].date === date) {
        return data[i];
      }
    }
    return null; // Object not found
  }

  const submitDataHandler = (submittedData) => {
    console.log(submittedData);
  }

  return (
    <div className="App">
      <DataForm onSubmit={submitDataHandler} />
      {/* <DataViewerForm onDateSelection={displayData} />
      <DataViewer selectedData={selectedViewData} /> */}
    </div>
  );
}

export default App;
