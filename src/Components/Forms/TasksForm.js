import CategorySubCategorySelect from "./CategorySubCategorySelect";

const TasksForm = ({ activityCategories }) => {
  const subCategorySelectionHandler = (category, subCategory) => {
    console.log(category);
    console.log(subCategory);
  };
  return (
    <div>
      <CategorySubCategorySelect
        categories={activityCategories}
        onSubCategorySelect={subCategorySelectionHandler}
      />
    </div>
  );
};

export default TasksForm;
