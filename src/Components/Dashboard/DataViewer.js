import styled from 'styled-components';

const DataViewerWrapper = styled.div`
  border: 1px solid black;
`

const DataViewer = ({ selectedData }) => {
  if(selectedData == null) return;

  const reduceData = (data) => {
    const result = {
      total: Object.values(data).reduce(
        (total, currentValue) => total + currentValue
      ),
    };
    Object.entries(data).forEach(([key, value]) => {
      if (value > 0) {
        result[key] = value;
      }
    });
    return result;
  };

  const studyData = reduceData(selectedData.study);
  const gameData = reduceData(selectedData.game);
  const sportData = reduceData(selectedData.sport);
  const expenseData = reduceData(selectedData.expense);

  const renderItems = (data) => {
    return Object.entries(data).map(([key, value]) => (
      <div key={key}>
        {key}: {value}
      </div>
    ));
  };

  return (
    <DataViewerWrapper>
      <div>Date: {selectedData.date}</div>
      <div>Study <div>{renderItems(studyData)}</div></div>
      <div>Game <div>{renderItems(gameData)}</div></div>
      <div>Sport <div>{renderItems(sportData)}</div></div>
      <div>Expense <div>{renderItems(expenseData)}</div></div>
    </DataViewerWrapper>
  );
};

export default DataViewer;
