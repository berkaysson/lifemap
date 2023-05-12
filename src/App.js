import { useEffect, useState } from "react";

import dataUnitConstructor from "./Data/dataUnitConstructor";
import AppContent from "./Components/AppContent";

const CURRENT_STORE = "2023"

function App({db, STORES}) {
  const [categories, setCategories] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [selectedDateDataUnit, setSelectedDateDataUnit] = useState(null);

  async function fetchCategories() {
    const newCategories = await getAllCategories();
    setCategories(newCategories);
  };

  useEffect(()=>{
    setCategoryOptions(() =>
        categories.map((category) => ({
          label: category.name,
          value: category.name,
          category: category,
        }))
      );
  },[categories])

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createDataUnit = async () => {
    const dataUnitDate = (new Date().toISOString()).slice(0,10);
    const dataUnit = await dataUnitConstructor(dataUnitDate, db);

    const transaction = db.transaction([CURRENT_STORE], 'readwrite');
    const dataStore = transaction.objectStore(CURRENT_STORE);

    const request = dataStore.add(dataUnit);

    request.onsuccess = () => {
      console.log('Data unit added successfully');
    };

    request.onerror = (event) => {
      console.error('Error adding data unit:', event.target.error);
    };
  }

  const getDataUnit = (dateID) => {
    return new Promise((resolve, reject) => {
      const selectedYear = dateID.slice(0,4).toString();
  
      const transaction = db.transaction([selectedYear], 'readonly');
      const dataStore = transaction.objectStore(selectedYear);
  
      const request = dataStore.get(dateID);
  
      request.onsuccess = (event) => {
        const dataUnit = event.target.result;
        if (dataUnit) {
          console.log('Data unit retrieved successfully');
          resolve(dataUnit);
        } else {
          console.error('Data unit not found');
          resolve(null);
        }
      }
  
      request.onerror = (event) => {
        console.error('Error getting data unit:', event.target.error);
        reject(event.target.error);
      }
    });
  }

  const getAllCategories = () => {
    return new Promise((resolve, reject) => {
      let dbCategoriesStore = [];
      const request = db.transaction(["Categories"], 'readonly').objectStore("Categories").getAll();
      request.onsuccess = (event) => {
        dbCategoriesStore = event.target.result;
        resolve(dbCategoriesStore);
      };
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  const getDataUnitsByYear = (year) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([year], "readonly");
      const store = transaction.objectStore(year);
      const request = store.getAll();

      request.onsuccess = (event) => {
        const dataUnits = event.target.result;
        resolve(dataUnits);
      };

      request.onerror = (event) => {
        console.error("Error getting data units:", event.target.error);
        reject(event.target.error);
      };
    });
  };

  const getAllDataUnits = async () => {
    const allDataUnits = [];
    for (const year of STORES) {
      const newDataUnits = await getDataUnitsByYear(year);
      allDataUnits.push(...newDataUnits);
    }
    return allDataUnits;
  };
  
  const getDataUnitbyDate = (date) => {
    getDataUnit(date)
    .then((dataUnit) => {
      setSelectedDateDataUnit(dataUnit);
      console.log('Data unit assigned successfully');
    })
    .catch((error) => {
      console.error('Failed to get data unit:', error);
    });
  }

  const updateDataUnit = (toBeUpdatedData) => {
    getDataUnit(toBeUpdatedData.date)
    .then((dataUnit) => {
      console.log('Data to be updated retrieved successfully')
      const selectedYear = toBeUpdatedData.date.slice(0, 4).toString();
      const currentValue =
        parseInt(
          dataUnit[toBeUpdatedData.category][toBeUpdatedData.subCategory]
        ) || 0;
      const newValue = parseInt(toBeUpdatedData.value) || 0;
      const calculatedValue = (
        toBeUpdatedData.formMode === 'add'
          ? (+currentValue + +newValue)
          : (+currentValue - +newValue)
      ).toString();
      if (calculatedValue < 0)
        return alert(
          "Value is negative, it must be bigger than zero, value after change:" +
            calculatedValue
        );
      dataUnit[toBeUpdatedData.category][toBeUpdatedData.subCategory] =
        calculatedValue;

      const transaction = db.transaction([selectedYear], "readwrite");
      const dataStore = transaction.objectStore(selectedYear);
      const request = dataStore.put(dataUnit);

      if(dataUnit.date === selectedDateDataUnit.date) setSelectedDateDataUnit(dataUnit);

      request.onsuccess = () => {
        console.log('Data unit updated successfully');
      };
      
      request.onerror = (event) => {
        console.error('Error updating data unit:', event.target.error);
      };
    })
    .catch((error) => {
      console.error('Failed to get data unit:', error);
    })
  }

  const updateCategory = (category, subCategory) => {
    const transaction = db.transaction(["Categories"], "readwrite");
    const store = transaction.objectStore("Categories");

    const request = store.get(category);

    request.onsuccess = (event) => {
      const categoryData = event.target.result;
      
      if (categoryData) {
        // If the category exists, update its subCategories and put it back in the store
        if (!categoryData.hasOwnProperty("subCategories")) {
          categoryData.subCategories = [subCategory];
        } else {
          if (categoryData.subCategories.includes(subCategory)) {
            alert(`${subCategory} already exists in ${category}`);
            return;
          }
          categoryData.subCategories.push(subCategory);
        }
        store.put(categoryData);
        fetchCategories();
      }
    };
    
    request.onerror = (event) => {
      console.error("Error getting category data:", event.target.error);
    };
  }

  const deleteSubCategory = async (category, subCategory) => {
    const allDataUnits = await getAllDataUnits();
    
    if (allDataUnits.some(dataUnit => dataUnit[category]?.[subCategory] > 0)) {
      return alert(`This category has been used before, can not be deleted`);
    }

    const transaction = db.transaction(["Categories"], "readwrite");
    const store = transaction.objectStore("Categories");
  
    const request = store.get(category);
  
    request.onsuccess = (event) => {
      const categoryData = event.target.result;
  
      if (categoryData) {
        const subCategories = categoryData.subCategories.filter(
          (s) => s !== subCategory
        );
        categoryData.subCategories = subCategories;
        store.put(categoryData);
        fetchCategories();
      }
    };
  
    request.onerror = (event) => {
      console.error("Error getting category data:", event.target.error);
    };
  }
  
  return (
    <div className="App">
      <AppContent
        onCreateToday={createDataUnit}
        onGetDataByDate={getDataUnitbyDate}
        onUpdateData={updateDataUnit}
        selectedDateDataUnit={selectedDateDataUnit}
        onUpdateCategory = {updateCategory}
        onDeleteSubCategory={deleteSubCategory}
        categories={categories}
        categoryOptions={categoryOptions}
      />
    </div>
  );
}

export default App;
