import categoryData from "../Data/categoryData.json";

const DataViewer = ({ selectedDate }) => {
  if(selectedDate == null) return;
  const studyCategories = categoryData.studyCategories;
  const sportCategories = categoryData.sportCategories;
  const gameCategories = categoryData.gameCategories;
  const expenseCategories = categoryData.expenseCategories;
  console.log(selectedDate)
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          {studyCategories.map((category) => (
            <th key={category}>{category}</th>
          ))}
          {sportCategories.map((category) => (
            <th key={category}>{category}</th>
          ))}
          {gameCategories.map((category) => (
            <th key={category}>{category}</th>
          ))}
          {expenseCategories.map((category) => (
            <th key={category}>{category}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{selectedDate.date}</td>
          {studyCategories.map((category) => (
            <td key={category}>{selectedDate.studyData[category]}</td>
          ))}
          {sportCategories.map((category) => (
            <td key={category}>{selectedDate.sportData[category]}</td>
          ))}
          {gameCategories.map((category) => (
            <td key={category}>{selectedDate.gameData[category]}</td>
          ))}
          {expenseCategories.map((category) => (
            <td key={category}>{selectedDate.expenseData[category]}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default DataViewer;
