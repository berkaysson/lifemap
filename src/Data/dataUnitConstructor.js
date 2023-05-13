const dataUnitConstructor = async (date, db) => {
  const categoriesObj = {};

  try {
    const allCategories = await db.Categories.toArray();

    allCategories.forEach(category => {
      const subCategoriesObj = {};
      if(category.subCategories){
        category.subCategories.forEach((subCategory) => {
          subCategoriesObj[subCategory] = 0;
        });
      }
      categoriesObj[category.name] = {
        total: 0,
        ...subCategoriesObj,
      };
    });

    const result = {
      id: date,
      date: date,
      ...categoriesObj,
    };
    return result;
  } catch (error) {
    console.error('Error creating data unit:', error);
    throw error;
  }
};

export default dataUnitConstructor;
