import React, { useState, useEffect } from "react";
import moment from "moment";

const TaskDurationInput = ({ onChange, frequency = "daily" }) => {
  const [dateRange, setDateRange] = useState(null);
  const [duration, setDuration] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const range = calculateDateRange(duration);
    setDateRange(range);
    onChange(dateRange.startDate, dateRange.endDate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frequency, duration]);

  useEffect(() => {
    const timeOutId = setTimeout(() => setDuration(query), 300);
    return () => clearTimeout(timeOutId);
  }, [query]);

  const calculateDateRange = (value) => {
    const today = moment();
    let endDate = moment(today);

    switch (frequency) {
      case "daily":
        endDate.add(value, "days");
        break;
      case "weekly":
        endDate.add(value, "weeks");
        break;
      case "monthly":
        endDate.add(value, "months");
        break;
      case "semi-year":
        endDate.add(value * 6, "months");
        break;
      case "yearly":
        endDate.add(value, "years");
        break;
      default:
        break;
    }

    return {
      startDate: today.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
    };
  };

  return (
    <>
      <label>Task Period:</label>
      <input
        type="number"
        placeholder="Enter task period"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      {dateRange && (
        <p>
          Start Date: {dateRange.startDate}, End Date: {dateRange.endDate}
        </p>
      )}
    </>
  );
};

export default TaskDurationInput;
