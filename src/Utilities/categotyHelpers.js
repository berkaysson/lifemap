export const updateCategoryHelper = async (db, category, subCategory) => {
  try {
    const categoryData = await db.categoriesData.get(category);
    if (categoryData) {
      if (!categoryData.hasOwnProperty("subCategories")) {
        categoryData.subCategories = [subCategory];
      } else {
        if (categoryData.subCategories.includes(subCategory)) {
          alert(`${subCategory} already exists in ${category}`);
          return;
        }
        categoryData.subCategories.push(subCategory);
      }
      await db.categoriesData.put(categoryData);
    }
  } catch (error) {
    console.error("Error updating category data:", error);
  }
};

export const deleteSubCategoryHelper = async (
  db,
  categoryName,
  categoryID,
  subCategory,
  allActivityDataUnits
) => {
  if (
    allActivityDataUnits.some(
      (activityDataUnit) => activityDataUnit[categoryName]?.[subCategory] > 0
    )
  ) {
    return alert(`This category has been used before, can not be deleted`);
  }

  try {
    const categoryData = await db.categoriesData.get(categoryID);
    if (categoryData) {
      const subCategories = categoryData.subCategories.filter(
        (s) => s !== subCategory
      );
      await db.categoriesData.update(categoryID, { subCategories });
    }
  } catch (error) {
    console.error("Error deleting subcategory:", error);
  }
};
