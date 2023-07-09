export const updateCategoryHelper = async (db, category, subCategory, snackBarHandler) => {
  try {
    const categoryData = await db.categoriesData.get(category);
    if (categoryData) {
      if (!categoryData.hasOwnProperty("subCategories")) {
        categoryData.subCategories = [subCategory];
      } else {
        if (categoryData.subCategories.includes(subCategory)) {
          snackBarHandler(`${subCategory} already exists in ${category} 😕`, "warning");
          return;
        }
        categoryData.subCategories.push(subCategory);
      }
      await db.categoriesData.put(categoryData);
      snackBarHandler("Category Successfully Created 🥳", "success");
    }
  } catch (error) {
    console.error("Error updating category data:", error);
    snackBarHandler("Category Could not be Created 😢", "error");
  }
};

export const deleteSubCategoryHelper = async (
  db,
  categoryName,
  categoryID,
  subCategory,
  allActivityDataUnits,
  snackBarHandler
) => {
  if (
    allActivityDataUnits.some(
      (activityDataUnit) => activityDataUnit[categoryName]?.[subCategory] > 0
    )
  ) {
    return snackBarHandler(`${subCategory}, This category has been used before, can not be deleted 🤨`, "warning");
  }

  try {
    const categoryData = await db.categoriesData.get(categoryID);
    if (categoryData) {
      const subCategories = categoryData.subCategories.filter(
        (s) => s !== subCategory
      );
      await db.categoriesData.update(categoryID, { subCategories });
      snackBarHandler("Category Successfully Deleted 👍", "success");
    }
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    snackBarHandler("Category Could not be Deleted 😧", "error");
  }
};
