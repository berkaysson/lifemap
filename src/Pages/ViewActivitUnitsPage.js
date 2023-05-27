import styled from "styled-components";
import { useEffect, useState } from "react";
import moment from "moment";

import DataViewer from "../Components/DataViewer";
import DataViewerForm from "../Components/Forms/DataViewerForm";
import ToggleButton from "../Components/UI/ToggleButton";
import DateRangeSelector from "../Components/Forms/DateRangeSelector";

const Wrapper = styled.section`
  border: 2px solid green;
  padding: 1rem;
`;

const ViewActivityUnitsPage = ({
  onDateSelection,
  selectedDateDataUnit,
  activityCategories,
  activityDatas,
}) => {
  const [isDateRangeSelected, setIsDateRangeSelected] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [filteredActivityDataUnits, setFilteredActivityDataUnits] = useState(
    []
  );

  const dateRangeInputHandler = (start, end) => {
    setSelectedDateRange({ startDate: start, endDate: end });
  };

  const updateFilteredActivityDataUnits = async () => {
    const filteredData = [];
    const startDate = moment(selectedDateRange.startDate);
    const endDate = moment(selectedDateRange.endDate);
    while (startDate <= endDate) {
      const date = startDate.format("YYYY-MM-DD");
      const newActivityDataUnit = await activityDatas.find(
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
  }, [activityDatas, selectedDateRange, isDateRangeSelected]);

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
            onDateSelection={onDateSelection}
            selectedDate={selectedDateDataUnit.date}
          />
          <h3>
            {selectedDateDataUnit
              ? selectedDateDataUnit.date
              : "No date selected"}
          </h3>
        </>
      )}
      {!isDateRangeSelected ? (
        <DataViewer
          selectedDateDataUnit={selectedDateDataUnit}
          activityCategories={activityCategories}
        />
      ) : (
        <div>
          {!filteredActivityDataUnits || filteredActivityDataUnits.length > 0 ? (
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
