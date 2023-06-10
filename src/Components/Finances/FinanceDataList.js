import { useEffect, useState } from "react";

import styled from "styled-components";
import moment from "moment";

import FinanceDataListItem from "./FinanceDataListItem";
import ToggleButton from "../Wrappers/Styled-Elements/ToggleButton";
import DateRangeSelector from "../Wrappers/DateRangeSelector";
import StyledInput from "../Wrappers/Styled-Elements/StyledInput";

const CURRENT_DATE = new Date().toISOString().slice(0, 10);

const Wrapper = styled.div`
`;

const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${({theme}) => theme.sizes.medium};
  padding: ${({theme}) => theme.sizes.medium};
  border: 1px solid ${({theme}) => theme.colors.alternative};
  box-shadow: ${({theme}) => theme.boxShadows.smallCardShadow};
  border-radius: ${({theme}) => theme.radius.small};
`

const FinanceDataList = ({
  financeDataUnits,
  onDeleteFinancialDataUnit,
  onUpdateFinancialDataUnit,
}) => {
  const [selectedDate, setSelectedDate] = useState(CURRENT_DATE);
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [filteredFinanceDatas, setFilteredFinanceDatas] = useState([]);

  const [isDateRangeSelected, setIsDateRangeSelected] = useState(false);

  const updateFilteredFinanceData = async () => {
    if (!isDateRangeSelected) {
      const newFinanceDataUnit = await financeDataUnits.find(
        (obj) => obj.date === selectedDate
      );
      setFilteredFinanceDatas(
        newFinanceDataUnit ? newFinanceDataUnit.financeDatas : []
      );
    } else {
      const filteredData = [];
      const startDate = moment(selectedDateRange.startDate);
      const endDate = moment(selectedDateRange.endDate);
      while (startDate <= endDate) {
        const date = startDate.format("YYYY-MM-DD");
        const newFinanceDataUnit = await financeDataUnits.find(
          (obj) => obj.date === date
        );

        if (newFinanceDataUnit) {
          filteredData.push(...newFinanceDataUnit.financeDatas);
        }

        startDate.add(1, "days");
      }

      setFilteredFinanceDatas(filteredData);
    }
  };

  const dateInputHandler = (event) => {
    setSelectedDate(event.target.value);
  };

  const dateRangeInputHandler = (start, end) => {
    setSelectedDateRange({ startDate: start, endDate: end });
  };

  useEffect(() => {
    updateFilteredFinanceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [financeDataUnits, selectedDate, selectedDateRange, isDateRangeSelected]);

  return (
    <Wrapper>
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
        <StyledInput type="date" value={selectedDate} onChange={dateInputHandler} />
      )}
      <ListWrapper>
        {!filteredFinanceDatas || filteredFinanceDatas.length === 0 ? (
          <p>No Finance Data</p>
        ) : (
          filteredFinanceDatas.map((item) => (
            <FinanceDataListItem
              key={item.id}
              item={item}
              onDeleteFinancialDataUnit={onDeleteFinancialDataUnit}
              onUpdateFinancialDataUnit={onUpdateFinancialDataUnit}
            />
          ))
        )}
      </ListWrapper>
    </Wrapper>
  );
};

export default FinanceDataList;
