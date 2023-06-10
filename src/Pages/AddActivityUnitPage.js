import styled from "styled-components";

import ActivityForm from "../Components/Others/ActivityForm";
import CategoriesForm from "../Components/Categories/CategoriesForm";
import HeaderContent from "../Components/Contents/HeaderContent.js";

const AddActivityUnitPageWrapper = styled.section`
  border: 2px solid orange;
  height: 100%;
  width: 100%;
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
      <HeaderContent headerText={"Add Activity Unit"} />
      <ActivityForm
        onUpdateActivityDataUnit={onUpdateActivityDataUnit}
        activityCategories={activityCategories}
      />
      <CategoriesForm
        categories={categories}
        onDeleteSubCategory={onDeleteSubCategory}
        onUpdateCategory={onUpdateCategory}
      />
    </AddActivityUnitPageWrapper>
  );
};

export default AddActivityUnitPage;
