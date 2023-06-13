import styled from "styled-components";
import { useEffect, useState } from "react";
import moment from "moment";

import DataViewer from "../Components/DataViewer/DataViewer.js";
import DataViewerForm from "../Components/DataViewer/DataViewerForm";
import ToggleButton from "../Components/Wrappers/Styled-Elements/ToggleButton.js";
import DateRangeSelector from "../Components/Wrappers/DateRangeSelector";
import Button from "../Components/Wrappers/Styled-Elements/Button.js";
import DataRangeTableViewer from "../Components/Wrappers/Styled-Wrappers/DataRangeTableViewer.js";
import HeaderContent from "../Components/Contents/HeaderContent.js";
import ParagraphContent from "../Components/Contents/ParagraphContent.js";
import { AnimatedPage } from "../Components/Wrappers/AnimatedPage.js";

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr minmax(550px, 80%) 1fr;
  grid-template-rows: repeat(3, auto);
  align-content: start;
  justify-content: center;
  align-items: stretch;
  justify-items: stretch;
  gap: ${({ theme }) => theme.sizes.large};
  width: 100%;
  height: 100%;
`;

const Header = styled.header`
  grid-area: 1 / 1 / 2 / 4;
`;

const Welcome = styled.div`
  grid-area: 2 / 1 / 3 / 4;
  margin: 0 2rem;
`;

const Tables = styled.div`
  grid-area: 3 / 2 / 4 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.sizes.large};
  padding: ${({ theme }) => theme.sizes.large};
  box-shadow: ${({ theme }) => theme.boxShadows.smallCardShadow};
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.medium};
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.sizes.medium};
  margin-bottom: 1rem;
`;

const TablesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.sizes.medium};
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.medium};
  padding: ${({ theme }) => theme.sizes.large};
`;

const DataRangeTableContainer = styled.div`
  display: grid;
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
  const [selectedDateActivityUnit, setSelectedDateActivityUnit] =
    useState(null);
  const [filteredActivityDataUnits, setFilteredActivityDataUnits] = useState(
    []
  );
  const [isTableViewOfUnitsActive, setIsTableViewOfUnitsActive] =
    useState(false);

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
      if (newActivityDataUnit) filteredData.push(newActivityDataUnit);
      startDate.add(1, "days");
    }

    setFilteredActivityDataUnits(filteredData);
  };

  const dateRangeButtonHandler = () => {
    updateFilteredActivityDataUnits();
  };

  useEffect(() => {
    updateFilteredActivityDataUnits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityDataUnits, isDateRangeSelected]);

  return (
    <AnimatedPage>
      <Wrapper>
        <Header>
          <HeaderContent headerText={"View Activity Units"} />
        </Header>
        <Welcome>
          <ParagraphContent>
            Welcome to the View Activity Units page.where you can conveniently
            track and analyze your activity units. This dynamic page offers two
            viewing options: Card View and Table View. In the Card View,
            activity units are displayed in a visually appealing and compact
            format, providing a quick overview of your tracked activities.
            Switching to the Table View presents your activity units in a
            structured table layout, allowing for detailed analysis and
            comparison.
          </ParagraphContent>
        </Welcome>
        <Tables>
          <FormContainer>
            <ToggleButton
              onClick={() => setIsDateRangeSelected(!isDateRangeSelected)}
              options={[
                { label: "Single Date", value: "date" },
                { label: "Date Range", value: "range" },
              ]}
            />
            {isDateRangeSelected ? (
              <>
                <DateRangeSelector onSubmit={dateRangeInputHandler} />
                <Button
                  type="button"
                  text="Show"
                  onClick={dateRangeButtonHandler}
                />
              </>
            ) : (
              <>
                <DataViewerForm
                  onDateSelection={dateInputHandler}
                  selectedDate={selectedDateActivityUnit}
                />
                <h3>{selectedDateActivityUnit ? "" : "No date selected"}</h3>
              </>
            )}
          </FormContainer>
          <TablesContainer>
            {!isDateRangeSelected ? (
              <DataViewer
                selectedDateDataUnit={selectedDateActivityUnit}
                activityCategories={activityCategories}
              />
            ) : (
              <>
                <ToggleButton
                  onClick={() =>
                    setIsTableViewOfUnitsActive(!isTableViewOfUnitsActive)
                  }
                  options={[
                    { label: "Card View", value: "card" },
                    { label: "Table View", value: "table" },
                  ]}
                />
                {!filteredActivityDataUnits ||
                filteredActivityDataUnits.length > 0 ? (
                  isTableViewOfUnitsActive ? (
                    <DataRangeTableContainer>
                      <DataRangeTableViewer
                        filteredActivityDataUnits={filteredActivityDataUnits}
                        activityCategories={activityCategories}
                      />
                    </DataRangeTableContainer>
                  ) : (
                    filteredActivityDataUnits.map((item) => (
                      <DataViewer
                        key={item.id}
                        selectedDateDataUnit={item}
                        activityCategories={activityCategories}
                      />
                    ))
                  )
                ) : (
                  <p>No data available</p>
                )}
              </>
            )}
          </TablesContainer>
        </Tables>
      </Wrapper>
    </AnimatedPage>
  );
};

export default ViewActivityUnitsPage;
