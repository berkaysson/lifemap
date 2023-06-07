import styled from "styled-components";

import Button from "../Wrappers/Styled-UI/Button";
import FormWrapper from "../Wrappers/FormWrapper";

const DataViewerFormWrapper = styled.div``;

const DataViewerForm = ({ onDateSelection }) => {
  const clickHandler = (e) => {
    e.preventDefault();
    onDateSelection(e.target[0].value);
  };

  return (
    <DataViewerFormWrapper>
      <FormWrapper onSubmit={clickHandler}>
        <input type="date" />
        <Button text={"Display the Date"} type={"submit"} />
      </FormWrapper>
    </DataViewerFormWrapper>
  );
};

export default DataViewerForm;
