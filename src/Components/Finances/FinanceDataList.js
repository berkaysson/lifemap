import { useEffect, useState } from "react";

import styled from "styled-components";
import moment from "moment";

import FinanceDataListItem from "./FinanceDataListItem";
import ToggleButton from "../Wrappers/UI/ToggleButton";
import DateRangeSelector from "../Wrappers/DateRangeSelector";

const CURRENT_DATE = new Date().toISOString().slice(0, 10);

const Wrapper = styled.div`
  border: 1px solid blue;
`;

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
        <input type="date" value={selectedDate} onChange={dateInputHandler} />
      )}
      <ul>
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
      </ul>
    </Wrapper>
  );
};

export default FinanceDataList;
