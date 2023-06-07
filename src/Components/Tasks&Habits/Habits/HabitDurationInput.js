import React, { useState, useEffect } from "react";
import moment from "moment";
import { calculateFrequencyDateValue, formatDate } from "../../../Utilities/dateHelpers";

const HabitDurationInput = ({ onChange, frequency }) => {
  const [dateRange, setDateRange] = useState(null);
  const [duration, setDuration] = useState(null);
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    const range = calculateDateRange(duration);
    setDateRange(range);
    onChange(range.startDate, range.endDate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frequency, duration]);

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
    <>
      <label>Habit Period:</label>
      <input
        type="number"
        placeholder="Enter task period"
        value={duration || ""}
        onChange={(event) => setDuration(event.target.value)}
      />
      {dateRange && frequency && (
        <p>
        Start Date:{" "}
        <input
          type="date"
          value={startDate || formatDate(new Date())}
          onChange={handleStartDateChange}
        />
        , End Date: {moment(new Date(dateRange?.endDate))
              .subtract(1, 'day').format("YYYY-MM-DD")}
      </p>
      )}
    </>
  );
};

export default HabitDurationInput;
