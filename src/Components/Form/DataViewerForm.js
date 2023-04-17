import styled from 'styled-components';

const DataViewerFormWrapper = styled.div`
  border: 1px solid blue;
`


const DataViewerForm = ({onDateSelection}) => {
  const clickHandler = (e) => {
    e.preventDefault();
    onDateSelection(e.target[0].value);
  }

  return (
    <DataViewerFormWrapper>
      <form onSubmit={clickHandler}>
        <input type="date" />
        <button type="submit">Show Data</button>
      </form>
    </DataViewerFormWrapper>
  )
}

export default DataViewerForm;