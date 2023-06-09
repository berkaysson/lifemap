import styled from "styled-components";

import Button from "../Wrappers/Styled-Elements/Button";
import FormWrapper from "../Wrappers/Styled-Wrappers/FormWrapper";
import StyledInput from "../Wrappers/Styled-Elements/StyledInput";

const DataViewerFormWrapper = styled.div``;

const DataViewerForm = ({ onDateSelection }) => {
  const clickHandler = (e) => {
    e.preventDefault();
    onDateSelection(e.target[0].value);
  };

  return (
    <DataViewerFormWrapper>
      <FormWrapper onSubmit={clickHandler}>
        <StyledInput type="date" />
        <Button text={"Display the Date"} type={"submit"} />
      </FormWrapper>
    </DataViewerFormWrapper>
  );
};

export default DataViewerForm;
