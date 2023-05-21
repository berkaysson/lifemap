import styled from "styled-components";

import DataUpdaterForm from "../Components/Forms/DataUpdaterForm";
import CategoryUpdateForm from "../Components/Forms/CategoryUpdateForm";

const AddActivityUnitPageWrapper = styled.section`
  border: 2px solid orange;
  padding: 1rem;
`;

const AddActivityUnitPage = ({
  onUpdateData,
  categories,
  categoryOptions,
  onUpdateCategory,
  onDeleteSubCategory,
  activityCategories
}) => {
  return (
    <AddActivityUnitPageWrapper>
      <h1> TODAY'S ACTIVITY UNIT</h1>
      <DataUpdaterForm
        onUpdateData={onUpdateData}
        activityCategories={activityCategories}
        categoryOptions={categoryOptions}
      />
      <br /><br />
      <CategoryUpdateForm
        categories={categories}
        categoryOptions={categoryOptions}
        onDeleteSubCategory={onDeleteSubCategory}
        onUpdateCategory={onUpdateCategory}
      />
    </AddActivityUnitPageWrapper>
  );
};

export default AddActivityUnitPage;
