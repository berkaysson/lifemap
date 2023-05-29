import { useState, useEffect } from "react";
import Select from "react-select";
import SubCategorySelect from "../UI/SubCategorySelect";

const CategorySubCategorySelect = ({ categories, categoryOptions, onSubCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subCategoryOptions, setSubCategoryOptions] = useState();

  async function fetchCategories() {
    const selectedCategoryName = selectedCategory?.name;
    const category = categories.find(
      (item) => item.name === selectedCategoryName
    );
    setSubCategories(category?.subCategories ?? []);
  }

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSubCategoryOptions(() =>
      subCategories.map((subCategory) => ({
        label: subCategory,
        value: subCategory,
        subCategory: subCategory,
      }))
    );
  }, [categories, subCategories]);
  
  const categorySelectionHandler = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setSelectedSubCategory(null);

    const category = categories.find(
      (item) => item.id === selectedCategory.value
    );
    setSubCategories(category.subCategories);
  };

  const subCategorySelectHandler = (selectedSubCategory) => {
    setSelectedSubCategory(selectedSubCategory);
    onSubCategorySelect(selectedCategory, selectedSubCategory);
  };
  
  return (
    <div>
      <label>Select Category</label>
      <Select
        onChange={categorySelectionHandler}
        options={categoryOptions.filter(
          (obj) =>
            obj.value !== "expenseCategories" &&
            obj.value !== "incomeCategories"
        )}
        placeholder="--Select a category--"
        value={selectedCategory}
      />
      <label>Select SubCategory</label>
      <SubCategorySelect
        placeholder={"--Select a subCategory--"}
        onChange={subCategorySelectHandler}
        options={subCategoryOptions}
        category={selectedCategory}
      />
    </div>
  );
};

export default CategorySubCategorySelect;
