import TableWrapper from "../Wrappers/TableWrapper";

const DataViewer = ({ selectedDateDataUnit, activityCategories }) => {
  if (!selectedDateDataUnit || !activityCategories) return <p>No Data</p>;

  const tableDatas = activityCategories.map((category) => (
    {
      categoryName:category.name,
      subCategories:category.subCategories,
      subCategoryValues:category.subCategories.map((subCategory) => {
        let tableValue = selectedDateDataUnit[category.name]?.[subCategory] || 0;
        return tableValue;
      })
    }
  ));

  return (
    <div>
      <h3>{selectedDateDataUnit.date}</h3>
      {tableDatas.map((data, index) => (<TableWrapper data={data} key={index} />))}
    </div>
  );
};

export default DataViewer;
