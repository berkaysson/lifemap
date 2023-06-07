import styled from "styled-components";

import Button from "../Wrappers/UI/Button";

const DataViewerFormWrapper = styled.div``;

const DataViewerForm = ({ onDateSelection }) => {
  const clickHandler = (e) => {
    e.preventDefault();
    onDateSelection(e.target[0].value);
  };

  return (
    <DataViewerFormWrapper>
      <form onSubmit={clickHandler}>
        <input type="date" />
        <Button text={"Display the Date"} type={"submit"} />
      </form>
    </DataViewerFormWrapper>
  );
};

export default DataViewerForm;
