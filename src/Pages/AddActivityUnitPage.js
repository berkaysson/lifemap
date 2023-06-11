import styled from "styled-components";

import ActivityForm from "../Components/Others/ActivityForm";
import CategoriesForm from "../Components/Categories/CategoriesForm";
import HeaderContent from "../Components/Contents/HeaderContent.js";
import ParagraphContent from "../Components/Contents/ParagraphContent.js";

const AddActivityUnitPageWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr minmax(550px, 80%) 1fr;
  grid-template-rows: repeat(4, auto);
  align-content: start;
  justify-content: center;
  align-items: stretch;
  justify-items: stretch;
  gap: ${({ theme }) => theme.sizes.large};
  width: 100%;
  height: 100%;
`;

const Header = styled.header`
  grid-area: 1 / 1 / 2 / 4;
`;

const Welcome = styled.div`
  grid-area: 2 / 2 / 3 / 3;
`;

const Activity = styled.div`
  grid-area: 3 / 2 / 4 / 3;
  display: grid;
  align-content: start;
  justify-content: center;
  align-items: stretch;
  justify-items: stretch;
  padding: ${({ theme }) => theme.sizes.medium};
  gap: 1px;
  box-shadow: ${({ theme }) => theme.boxShadows.smallCardShadow};
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.medium};
`;

const ActivityContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr; //change to 1fr 1fr responsive design
  grid-template-columns: 70% auto; //change to 1fr responsive design
`;

const Category = styled.div`
  grid-area: 4 / 2 / 5 / 3;
  align-content: start;
  justify-content: center;
  align-items: stretch;
  justify-items: stretch;
  padding: ${({ theme }) => theme.sizes.medium};
  box-shadow: ${({ theme }) => theme.boxShadows.smallCardShadow};
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.medium};
`;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr; //change to 1fr 1fr responsive design
  grid-template-columns: 70% auto; //change to 1fr responsive design
`;

const FormHeader = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.sizes.small};
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
      <Header>
        <HeaderContent headerText={"Add Activity Unit and Category"} />
      </Header>
      <Welcome>
        <ParagraphContent>
          <b>Manage Your Activity Units and Categories with Ease</b> <br />
          Welcome to the Activity Units Management page. Take control of your
          daily activities effortlessly using Lifemap's intuitive interface.{" "}
          <br />
          You can also edit the activity categories.
        </ParagraphContent>
      </Welcome>
      <Activity>
        <FormHeader>Activity Form</FormHeader>
        <ActivityContainer>
          <ActivityForm
            onUpdateActivityDataUnit={onUpdateActivityDataUnit}
            activityCategories={activityCategories}
          />
          <ParagraphContent>
            Welcome to the <b>Activity Form</b>. Select a date or keep today's
            date, choose an activity type, pick a category, decide whether to
            add or delete, enter the value, and submit. Use this form to
            effortlessly track your activities and make necessary changes.
          </ParagraphContent>
        </ActivityContainer>
      </Activity>
      <Category>
        <FormHeader>Category Form</FormHeader>
        <CategoryContainer>
          <CategoriesForm
            categories={categories}
            onDeleteSubCategory={onDeleteSubCategory}
            onUpdateCategory={onUpdateCategory}
          />
          <ParagraphContent>
            Manage your categories effortlessly with the{" "}
            <b>Category Update Form</b>. Add or delete categories for activity
            types and finances. Expand your options by adding new categories
            with a descriptive name
          </ParagraphContent>
        </CategoryContainer>
      </Category>
    </AddActivityUnitPageWrapper>
  );
};

export default AddActivityUnitPage;
