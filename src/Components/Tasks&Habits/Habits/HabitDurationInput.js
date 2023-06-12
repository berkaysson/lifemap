import React, { useState, useEffect } from "react";
import moment from "moment";
import { calculateFrequencyDateValue, formatDate } from "../../../Utilities/dateHelpers";
import StyledInput from "../../Wrappers/Styled-Elements/StyledInput";
import styled from "styled-components";

const DurationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({theme})=> theme.sizes.medium};
`

const HabitDurationInput = ({ onChange, frequency }) => {
  const [dateRange, setDateRange] = useState(null);
  const [duration, setDuration] = useState(null);
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    const range = calculateDateRange(duration);
    setDateRange(range);
    onChange(range.startDate, range.endDate, duration);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frequency, duration, startDate]);

  const calculateDateRange = (value) => {
    const firstDay = startDate ? moment(startDate) : moment();
    const { coefficient, dateType } = calculateFrequencyDateValue(frequency);
    let endDate = moment(firstDay).add(value * coefficient, dateType);

    return {
      startDate: firstDay.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
    };
  };

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    setStartDate(newStartDate);
    const range = calculateDateRange(duration);
    setDateRange(range);
    onChange(range.startDate, range.endDate);
  };

  return (
    <DurationWrapper>
      <StyledInput
        type="number"
        placeholder="Enter habit period"
        value={duration || ""}
        onChange={(event) => setDuration(event.target.value)}
      />
      {dateRange && frequency && (
        <>
        <span>Start Date:{" "}
          <StyledInput
            type="date"
            value={startDate || formatDate(new Date())}
            onChange={handleStartDateChange}
          /></span>
          <span>
          End Date:{" "}
          <b>
          {moment(new Date(dateRange?.endDate))
            .subtract(1, "day")
            .format("YYYY-MM-DD")}
           </b></span>
        </>
      )}
    </DurationWrapper>
  );
};

export default HabitDurationInput;
