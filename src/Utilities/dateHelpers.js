import moment from "moment";

export function formatDate(date) {
  return moment(date).format("YYYY-MM-DD");
}

export const calculateFrequencyDateValue = (frequency) => {
  switch (frequency) {
    case "daily":
      return { coefficient: 1, dateType: "days" };
    case "weekly":
      return { coefficient: 1, dateType: "weeks" };
    case "monthly":
      return { coefficient: 1, dateType: "months" };
    case "semi-year":
      return { coefficient: 6, dateType: "months" };
    case "yearly":
      return { coefficient: 1, dateType: "years" };
    default:
      return { coefficient: 0, dateType: "" };
  }
};

export const CURRENT_DATE = formatDate(moment());
