const activityDataUnitConstructor = async (date, db) => {
  const categoriesObj = {};

  try {
    const allCategories = await db.categoriesData.toArray();

    allCategories.forEach((category) => {
      if (
        category.id !== "incomeCategories" &&
        category.id !== "expenseCategories"
      ) {
        const subCategoriesObj = {};
        if (category.subCategories) {
          category.subCategories.forEach((subCategory) => {
            subCategoriesObj[subCategory] = 0;
          });
        }
        categoriesObj[category.name] = {
          total: 0,
          ...subCategoriesObj,
        };
      }
    });

    const result = {
      id: date,
      date: date,
      ...categoriesObj,
    };
    return result;
  } catch (error) {
    console.error("Error creating data unit:", error);
    throw error;
  }
};

export default activityDataUnitConstructor;
