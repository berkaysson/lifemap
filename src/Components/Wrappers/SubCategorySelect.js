import { useEffect } from "react";
import { useState } from "react";
import { StyledSelect } from "./Styled-Elements/StyledSelect";

const SubCategorySelect = ({
  options,
  onChange,
  placeholder,
  category,
  value = null,
}) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleSelectChange = (selectedOption) => {
    if (value) onChange(selectedOption);
    else {
      setSelectedSubCategory(selectedOption);
      onChange(selectedOption);
    }
  };

  useEffect(() => {
    if (!value) {
      setSelectedSubCategory(null);
    }
  }, [category, value]);

  const selectValue = value !== null ? value : selectedSubCategory;

  return (
    <>
      {options && options.length > 0 ? (
        <>
          <StyledSelect
            onChange={handleSelectChange}
            options={options}
            placeholder={placeholder}
            value={selectValue}
          />
        </>
      ) : (
        <p style={{ fontSize: "14px", color: "gray" }}>
          Select Activity Type first
        </p>
      )}
    </>
  );
};

export default SubCategorySelect;
