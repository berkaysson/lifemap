const DataViewer = ({ selectedDateDataUnit, activityCategories }) => {
  if (!selectedDateDataUnit || !activityCategories) return <p>No Data</p>;

  const categoryHeaders = activityCategories.map((category) => (
    <th
      key={`${category.name}-header`}
      colSpan={category.subCategories.length}
    >
      {category.name}
    </th>
  ));

  const subCategoryHeaders = activityCategories.map((category) =>
    category.subCategories.map((subCategory) => (
      <th key={`${category.name}-${subCategory}`}>
        {subCategory}
      </th>
    ))
  );

  let tableRow = [];

  activityCategories.forEach((category) => {
    category["subCategories"].forEach((subCategory) => {
      let tableValue = selectedDateDataUnit[category.name]?.[subCategory] || 0;
      tableRow.push(tableValue);
    });
  });

  const subCategoryValues = tableRow.map((column, index) => (
    <td key={`cell-${index}`}>{column}</td>
  ));

  return (
    <>
      <h3>{selectedDateDataUnit.date}</h3>
      <table>
        <thead>
          {categoryHeaders}
          <tr>{subCategoryHeaders}</tr>
        </thead>
        <tbody>
          <tr>
            {subCategoryValues}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default DataViewer;
