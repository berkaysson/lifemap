import { useEffect, useState } from "react";

import styled from "styled-components";

import FinanceDataListItem from "./FinanceDataListItem";

const CURRENT_DATE = new Date().toISOString().slice(0, 10);

const Wrapper = styled.div`
  border: 1px solid blue;
`;

const FinanceDataList = ({ financeDatas }) => {
  const [selectedDate, setSelectedDate] = useState(CURRENT_DATE);
  const [filteredFinanceDatas, setFilteredFinanceDatas] = useState([]);

  const updateFilteredFinanceData = async () => {
    const newFinanceDataUnit = await financeDatas.find(
      (obj) => obj.date === selectedDate
    );
    if (!newFinanceDataUnit) {
      setFilteredFinanceDatas([]);
    } else {
      setFilteredFinanceDatas(newFinanceDataUnit.financeDatas);
    }
  };

  const dateInputHandler = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    updateFilteredFinanceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [financeDatas, selectedDate]);

  return (
    <Wrapper>
      <div>a filter for time range</div>
      <input type="date" value={selectedDate} onChange={dateInputHandler} />
      <ul>
        {" "}
        {filteredFinanceDatas.map((item) => (
          <FinanceDataListItem key={item.id} item={item} />
        ))}
      </ul>
    </Wrapper>
  );
};

export default FinanceDataList;
