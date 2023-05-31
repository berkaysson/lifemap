import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRangePicker } from "react-date-range";
import addDays from "date-fns/addDays";
import { useState } from "react";
import styled from "styled-components";
import { enGB } from "date-fns/locale";

const Wrapper = styled.div`
  border: 1px solid red;
`;

const DateRangeSelector = ({ onSubmit }) => {
  const [state, setState] = useState([
    {
      endDate: new Date(),
      startDate: addDays(new Date(), -7),
      key: "selection",
    },
  ]);

  const onDateRangeSelection = () => {
    onSubmit(
      new Date(state[0].startDate).toISOString().slice(0, 10),
      new Date(state[0].endDate).toISOString().slice(0, 10)
    );
  };

  return (
    <Wrapper>
      <DateRangePicker
        onChange={(item) => setState([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={state}
        direction="vertical"
        locale={enGB}
      />
      <button type="button" onClick={onDateRangeSelection}>Show</button>
    </Wrapper>
  );
};

export default DateRangeSelector;
