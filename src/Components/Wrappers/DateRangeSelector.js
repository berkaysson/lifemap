import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRange } from "react-date-range";
import addDays from "date-fns/addDays";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { enGB } from "date-fns/locale";
import { theme } from "../../Style/theme";
import { formatDate } from "../../Utilities/dateHelpers";
import moment from "moment";

const Wrapper = styled.div`
  width: fit-content;
  padding: ${({ theme }) => theme.sizes.small};
  box-shadow: ${({ theme }) => theme.boxShadows.smallCardShadow};
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.small};
`;

const DateRangeWrapper = styled(DateRange)`
  & .rdrMonth {
    & .rdrWeekDays > * {
      color: ${({ theme }) => theme.colors.primary};
    }

    & .rdrDays > * {
      &.rdrDayToday > .rdrDayNumber > span::after {
        background-color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

const DateRangeSelector = ({ onSubmit }) => {
  const [state, setState] = useState([
    {
      endDate: addDays(moment(), -1),
      startDate: addDays(moment(), -7),
      key: "selection",
    },
  ]);

  const onDateRangeSelection = () => {
    onSubmit(
      formatDate(addDays(moment(state[0].startDate), 1)),
      formatDate(addDays(moment(state[0].endDate), 1))
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    onDateRangeSelection();
  }, [state]);

  return (
    <Wrapper>
      <DateRangeWrapper
        onChange={(item) => setState([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={state}
        direction="vertical"
        locale={enGB}
        rangeColors={[`${theme.colors.theme}`]}
      />
    </Wrapper>
  );
};

export default DateRangeSelector;
