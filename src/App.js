import { useEffect, useState } from "react";

import dataUnitConstructor from "./Data/dataUnitConstructor";
import AppContent from "./Components/AppContent";

const CURRENT_STORE = "2023"

function App({db}) {
  const [selectedDate, setSelectedDate] = useState(null);

  const createDataUnit = () => {
    const dataUnitDate = (new Date().toISOString()).slice(0,10);
    const dataUnit = dataUnitConstructor(dataUnitDate);

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

  const getDataUnitbyDate = (date) => {
    getDataUnit(date)
    .then((dataUnit) => {
      setSelectedDate(dataUnit);
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
      const selectedYear = toBeUpdatedData.date.slice(0,4).toString();
      const currentValue = parseInt(dataUnit[toBeUpdatedData.category][toBeUpdatedData.subCategory]) || 0;
      const newValue = parseInt(toBeUpdatedData.value) || 0;
      dataUnit[toBeUpdatedData.category][toBeUpdatedData.subCategory] = (currentValue + newValue).toString();

      const transaction = db.transaction([selectedYear], "readwrite");
      const dataStore = transaction.objectStore(selectedYear);
      const request = dataStore.put(dataUnit);

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
  
  return (
    <div className="App">
      <AppContent onCreateToday={createDataUnit} onGetDataByDate={getDataUnitbyDate} onUpdateData={updateDataUnit} selectedDate={selectedDate} />
    </div>
  );
}

export default App;
