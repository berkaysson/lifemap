import { useState } from "react";
import Select from "react-select";

const SubCategorySelect = ({ options, onChange, placeholder }) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleSelectChange = (selectedOption) => {
    setSelectedSubCategory(selectedOption);
    onChange(selectedOption);
  };

  return (
    <>
      {options && options.length > 0 ? (
        <>
          <Select
            onChange={handleSelectChange}
            options={options}
            placeholder={placeholder}
            value={selectedSubCategory}
          />
        </>
      ) : (
        <p>No subCategories found</p>
      )}
    </>
  );
};

export default SubCategorySelect;
