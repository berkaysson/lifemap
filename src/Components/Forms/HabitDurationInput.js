import React, { useState, useEffect } from "react";
import moment from "moment";
import { calculateFrequencyDateValue } from "../../Utilities/formatDate";

const HabitDurationInput = ({ onChange, frequency }) => {
  const [dateRange, setDateRange] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    const range = calculateDateRange(duration);
    setDateRange(range);
    onChange(range.startDate, range.endDate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frequency, duration]);

  const calculateDateRange = (value) => {
    const today = moment();
    const { coefficient, dateType } = calculateFrequencyDateValue(frequency);
    let endDate = moment(today).add(value * coefficient, dateType);

    return {
      startDate: today.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
    };
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
          Start Date: {dateRange.startDate}, End Date: {dateRange.endDate}
        </p>
      )}
    </>
  );
};

export default HabitDurationInput;
