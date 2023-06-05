export const addFinancialDataUnitHelper = async (db, toBeUpdatedData) => {
  try {
    const financialDataUnit = await db.financialData.get(toBeUpdatedData.date);
    if (financialDataUnit) {
      financialDataUnit.financeDatas.push(toBeUpdatedData);
      await db.financialData.put(financialDataUnit);
      console.log("Financial Data unit added successfully");
    }
  } catch (error) {
    console.error("Error getting Financial data:", error);
  }
};

export const updateFinancialDataUnitHelper = async (
  db,
  dateID,
  dataUnitID,
  toBeUpdatedData
) => {
  try {
    const financialDataUnit = await db.financialData.get(dateID);
    if (financialDataUnit) {
      const oldDataUnitIndex = financialDataUnit.financeDatas.findIndex(
        (obj) => obj.id === dataUnitID
      );
      if (oldDataUnitIndex !== -1) {
        const oldDataUnit = financialDataUnit.financeDatas[oldDataUnitIndex];
        const updatedDataUnit = { ...oldDataUnit, ...toBeUpdatedData };
        financialDataUnit.financeDatas[oldDataUnitIndex] = updatedDataUnit;
        await db.financialData.put(financialDataUnit);
        console.log("Financial Data unit updated successfully");
      }
    }
  } catch (error) {
    console.error("Error updating Financial data:", error);
  }
};

export const deleteFinancialDataUnitHelper = async (db, dateID, dataUnitID) => {
  try {
    const financialDataUnit = await db.financialData.get(dateID);
    if (financialDataUnit) {
      financialDataUnit.financeDatas = financialDataUnit.financeDatas.filter(
        (obj) => obj.id !== dataUnitID
      );
      await db.financialData.put(financialDataUnit);
      console.log("Financial Data unit deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting Financial data:", error);
  }
};
