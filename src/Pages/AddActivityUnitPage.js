import styled from "styled-components";

import ActivityForm from "../Components/Forms/ActivityForm";
import CategoriesForm from "../Components/Forms/CategoriesForm";

const AddActivityUnitPageWrapper = styled.section`
  border: 2px solid orange;
  padding: 1rem;
`;

const AddActivityUnitPage = ({
  onUpdateData,
  categories,
  onUpdateCategory,
  onDeleteSubCategory,
  activityCategories,
}) => {
  return (
    <AddActivityUnitPageWrapper>
      <h1> TODAY'S ACTIVITY UNIT</h1>
      <ActivityForm
        onUpdateData={onUpdateData}
        activityCategories={activityCategories}
      />
      <br />
      <br />
      <CategoriesForm
        categories={categories}
        onDeleteSubCategory={onDeleteSubCategory}
        onUpdateCategory={onUpdateCategory}
      />
    </AddActivityUnitPageWrapper>
  );
};

export default AddActivityUnitPage;
