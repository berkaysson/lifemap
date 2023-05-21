import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import HomePage from "../Pages/HomePage";
import AddActivityUnitPage from "../Pages/AddActivityUnitPage";
import TasksHabitsPage from "../Pages/TasksHabitsPage";
import ViewActivityUnitsPage from "../Pages/ViewActivitUnitsPage";
import ChartsPage from "../Pages/ChartsPage";
import SettingsPage from "../Pages/SettingsPage";
import RootLayout from "../Layout/RootLayout";
import ExpensesPage from "../Pages/ExpensesPage";

const AppContent = ({
  onCreateToday,
  onGetDataByDate,
  onUpdateData,
  selectedDateDataUnit,
  onUpdateCategory,
  onDeleteSubCategory,
  categories,
  categoryOptions,
  onExport,
  onImport,
  onUpdateFinancialData,
}) => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          path="/"
          element={
            <HomePage
              selectedDateDataUnit={selectedDateDataUnit}
              categories={categories}
            />
          }
        />
        <Route
          path="edit-activity-unit"
          element={
            <AddActivityUnitPage
              onUpdateData={onUpdateData}
              categories={categories}
              categoryOptions={categoryOptions}
              onUpdateCategory={onUpdateCategory}
              onDeleteSubCategory={onDeleteSubCategory}
            />
          }
        />
        <Route path="tasks-habits" element={<TasksHabitsPage />} />
        <Route
          path="expenses"
          element={
            <ExpensesPage
            onUpdateData={onUpdateData}
            onDeleteSubCategory={onDeleteSubCategory}
            expenseCategory={categories.find(obj => obj.id === "expenseCategories")}
            incomeCategory={categories.find(obj => obj.id === "incomeCategories")}
            onUpdateFinancialData={onUpdateFinancialData}
            />
          }
        />
        <Route
          path="view-activity-units"
          element={
            <ViewActivityUnitsPage
              onDateSelection={onGetDataByDate}
              selectedDateDataUnit={selectedDateDataUnit}
              categories={categories}
            />
          }
        />
        <Route path="charts" element={<ChartsPage />} />
        <Route
          path="settings"
          element={<SettingsPage onExport={onExport} onImport={onImport} />}
        />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default AppContent;
