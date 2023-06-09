import Select from "react-select";
import styled from "styled-components";

import {theme as myTheme} from "../../../Style/theme";

const StyledSelectWrapper = styled(Select)`
  box-shadow: ${myTheme.boxShadows.smallCardShadow};
  border-radius: ${myTheme.radius.small};
  font-weight: bold;
  max-width: 300px;
  transition: background-color 0.4s, color 0.4s;
`

export const StyledSelect = (props) => {
  return (
    <StyledSelectWrapper 
    {...props}
    theme={(theme)=>({
      ...theme,
      borderRadius:`${myTheme.radius.small}`,
      colors: {
        ...theme.colors,
        primary25: `${myTheme.colors.alternative}`,
        primary50: `${myTheme.colors.theme}`,
        primary: `${myTheme.colors.theme}`,
      },
    })}
    />
  )
}