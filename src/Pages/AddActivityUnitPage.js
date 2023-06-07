import styled from "styled-components";

import ActivityForm from "../Components/Others/ActivityForm";
import CategoriesForm from "../Components/Categories/CategoriesForm";

const AddActivityUnitPageWrapper = styled.section`
  border: 2px solid orange;
  padding: 1rem;
`;

const AddActivityUnitPage = ({
  onUpdateActivityDataUnit,
  categories,
  onUpdateCategory,
  onDeleteSubCategory,
  activityCategories,
}) => {
  return (
    <AddActivityUnitPageWrapper>
      <h1> TODAY'S ACTIVITY UNIT</h1>
      <ActivityForm
        onUpdateActivityDataUnit={onUpdateActivityDataUnit}
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
