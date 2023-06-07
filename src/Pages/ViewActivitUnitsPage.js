import styled from "styled-components";
import { useEffect, useState } from "react";
import moment from "moment";

import DataViewer from "../Components/DataViewer/DataViewer.js";
import DataViewerForm from "../Components/DataViewer/DataViewerForm";
import ToggleButton from "../Components/Wrappers/Styled-UI/ToggleButton.js";
import DateRangeSelector from "../Components/Wrappers/DateRangeSelector";

const Wrapper = styled.section`
  border: 2px solid green;
  padding: 1rem;
`;

const ViewActivityUnitsPage = ({
  activityCategories,
  activityDataUnits,
  onGetActivityDataUnit,
}) => {
  const [isDateRangeSelected, setIsDateRangeSelected] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [selectedDateActivityUnit, setSelectedDateActivityUnit] = useState(null);
  const [filteredActivityDataUnits, setFilteredActivityDataUnits] = useState(
    []
  );

  const dateRangeInputHandler = (start, end) => {
    setSelectedDateRange({ startDate: start, endDate: end });
  };

  const dateInputHandler = async (dateID) => {
    try {
      const newDate = await onGetActivityDataUnit(dateID);
      setSelectedDateActivityUnit(newDate);
      console.log("dateInputHandler successful");
    } catch (error) {
      console.error("dateInputHandler:", error);
    }
  };

  const updateFilteredActivityDataUnits = async () => {
    const filteredData = [];
    const startDate = moment(selectedDateRange.startDate);
    const endDate = moment(selectedDateRange.endDate);
    while (startDate <= endDate) {
      const date = startDate.format("YYYY-MM-DD");
      const newActivityDataUnit = await activityDataUnits.find(
        (obj) => obj.date === date
      );

      filteredData.push(newActivityDataUnit);
      startDate.add(1, "days");
    }

    setFilteredActivityDataUnits(filteredData);
  };

  useEffect(() => {
    updateFilteredActivityDataUnits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityDataUnits, selectedDateRange, isDateRangeSelected]);

  return (
    <Wrapper>
      <h1>ViewActivityUnitsPage</h1>
      <ToggleButton
        onClick={() => setIsDateRangeSelected(!isDateRangeSelected)}
        options={[
          { label: "Single Date", value: "date" },
          { label: "Date Range", value: "range" },
        ]}
      />
      {isDateRangeSelected ? (
        <DateRangeSelector onSubmit={dateRangeInputHandler} />
      ) : (
        <>
          <DataViewerForm
            onDateSelection={dateInputHandler}
            selectedDate={selectedDateActivityUnit}
          />
          <h3>{selectedDateActivityUnit ? selectedDateActivityUnit.date : "No date selected"}</h3>
        </>
      )}
      {!isDateRangeSelected ? (
        <DataViewer
          selectedDateDataUnit={selectedDateActivityUnit}
          activityCategories={activityCategories}
        />
      ) : (
        <div>
          {!filteredActivityDataUnits ||
          filteredActivityDataUnits.length > 0 ? (
            filteredActivityDataUnits.map((item) => (
              <DataViewer
                key={item.id}
                selectedDateDataUnit={item}
                activityCategories={activityCategories}
              />
            ))
          ) : (
            <p>No data available.</p>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default ViewActivityUnitsPage;
