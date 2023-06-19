import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { theme as myTheme } from "../../../Style/theme";
import styled from "styled-components";

const StyledSelectWrapper = styled.div`
  box-shadow: ${myTheme.boxShadows.smallCardShadow};
  border-radius: ${myTheme.radius.small};
  font-weight: bold;
  max-width: 300px;
  min-width: 250px;
  transition: background-color 0.4s, color 0.4s;

  @media (max-width: 375px) {
    min-width: 200px;
  }
`

export const StyledSelect = (props) => {
  const handleChange = (event) => {
    props.onChange(event.target.value)
  }

  return (
    <StyledSelectWrapper>
    <FormControl fullWidth>
      <InputLabel id="select-label">{props.placeholder}</InputLabel>
      <Select
        labelId="select-label"
        onChange={handleChange}
        value={props.value ? props.value : ""}
        label={props.placeholder}
        variant="outlined"
        sx={{
          "& .MuiSelect-outlined":{
            color: myTheme.colors.primary,
          },
          "& .MuiInputLabel-root": {
            color: myTheme.colors.primary,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: myTheme.colors.alternative
          },
          "& .Mui-focused":{
            borderColor:"red"
          }
        }}
      >
        {props.options.map((option) => (
          <MenuItem 
          value={option} 
          disableRipple
          sx={{
            "&:hover":{
              fontWeight:"bold",
            },

            "&:focus":{
              bgcolor: myTheme.colors.theme,
            }
          }}
          >{option.label}</MenuItem>
        ))}
      </Select>
      </FormControl>
    </StyledSelectWrapper>
  );
};
