const FinanceDataListItem = ({item}) => {
  return (
    <li id={item.id}>
      <h4>{item.date}, {item.time}</h4>
      <div>{item.subCategory}</div>
      <div>{item.formMode === "income" ? "+":"-"} {item.value}</div>
      <button>Edit</button>
      <button>Delete</button>
    </li>
  )
}

export default FinanceDataListItem;