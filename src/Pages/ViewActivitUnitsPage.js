import styled from "styled-components";

import DataViewer from "../Components/DataViewer";
import DataViewerForm from "../Components/Forms/DataViewerForm";

const Wrapper = styled.section`
  border: 2px solid green;
  padding: 1rem;
`;

const ViewActivityUnitsPage = ({
  onDateSelection,
  selectedDateDataUnit,
  activityCategories,
}) => {
  return (
    <Wrapper>
      <h1>ViewActivityUnitsPage</h1>
      <DataViewerForm onDateSelection={onDateSelection} />
      <h3>{selectedDateDataUnit ? selectedDateDataUnit.date : "date"}</h3>
      <DataViewer
        selectedDateDataUnit={selectedDateDataUnit}
        activityCategories={activityCategories}
      />
      <div>
        A LIST OF ACTIVITY-DATA UNITS, CAN BE TABLE WITH FEATURE OF SORTING AND
        FILTERING
      </div>
    </Wrapper>
  );
};

export default ViewActivityUnitsPage;
