import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  margin: 20px 0;
`;

const TableHead = styled.thead`
  background-color: #eee;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
`;

const DataViewer = ({ selectedDateDataUnit, categories }) => {
  if (!selectedDateDataUnit || !categories) return <p>No Data</p>;

  const tableHeaders = categories.map((category) => (
    category.subCategories.map((subCategory) => (
      <TableHeader key={`${category.name}-${subCategory}`}>{subCategory}</TableHeader>
    ))
  ));

  let tableRow = [];

  categories.forEach(category => {
    category['subCategories'].forEach((subCategory) => {
      let tableValue = (selectedDateDataUnit[category.name][subCategory] || 0);
      tableRow.push(tableValue);
    })
  });

  return (
    <Table>
      <TableHead>
        {categories.map((category) => (
          <th key={`${category.name}-header`} colSpan={category.subCategories.length}>
            {category.name}
          </th>
        ))}
        <TableRow>{tableHeaders}</TableRow>
      </TableHead>
      <tbody>
        <TableRow>
          {tableRow.map((column, index) => (
            <TableCell key={`cell-${index}`}>{column}</TableCell>
          ))}
        </TableRow>
      </tbody>
    </Table>
  );
};

export default DataViewer;
