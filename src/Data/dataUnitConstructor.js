const dataUnitConstructor = (date, db) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("Categories", "readonly");
    const categoryStore = transaction.objectStore("Categories");
    let allCategories;
    const categoriesObj = {};
    const request = categoryStore.getAll();
    request.onsuccess = (event) => {
      allCategories = event.target.result;

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
      console.log(categoriesObj);

      const result = {
        id: date,
        date: date,
        ...categoriesObj,
      };
      resolve(result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export default dataUnitConstructor;
