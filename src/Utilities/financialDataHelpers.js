export const addFinancialDataUnitHelper = async (db, toBeUpdatedData, snackBarHandler) => {
  try {
    const financialDataUnit = await db.financialData.get(toBeUpdatedData.date);
    if (financialDataUnit) {
      financialDataUnit.financeDatas.push(toBeUpdatedData);
      await db.financialData.put(financialDataUnit);
      console.log("Financial Data unit added successfully");
      snackBarHandler("Financial Data unit added successfully 🤩", "success");
    }
  } catch (error) {
    console.error("Error getting Financial data:", error);
    snackBarHandler("Financial Data unit could not added successfully 😕", "error");
  }
};

export const updateFinancialDataUnitHelper = async (
  db,
  dateID,
  dataUnitID,
  toBeUpdatedData,
  snackBarHandler
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
        snackBarHandler("Financial Data unit edited successfully 😝", "success");
      }
    }
  } catch (error) {
    console.error("Error updating Financial data:", error);
    snackBarHandler("Financial Data unit could not edited successfully 😔", "error");
  }
};

export const deleteFinancialDataUnitHelper = async (db, dateID, dataUnitID, snackBarHandler) => {
  try {
    const financialDataUnit = await db.financialData.get(dateID);
    if (financialDataUnit) {
      financialDataUnit.financeDatas = financialDataUnit.financeDatas.filter(
        (obj) => obj.id !== dataUnitID
      );
      await db.financialData.put(financialDataUnit);
      snackBarHandler("Financial Data unit deleted successfully 😎", "success");
    }
  } catch (error) {
    console.error("Error deleting Financial data:", error);
    snackBarHandler("Financial Data unit could not deleted successfully 😕", "error");
  }
};
