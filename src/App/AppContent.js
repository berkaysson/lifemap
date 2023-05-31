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
import FinancePage from "../Pages/FinancePage";

const AppContent = ({
  onUpdateData,
  onUpdateCategory,
  onDeleteSubCategory,
  categories,
  onExport,
  onImport,
  onAddFinancialData,
  onUpdateFinancialData,
  onDeleteFinancialData,
  activityCategories,
  financeCategories,
  financeDatas,
  activityDatas,
  onGetActivityDataUnit,
  todaysActivityDataUnit
}) => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          path="/"
          element={
            <HomePage
              activityCategories={activityCategories}
              todaysActivityDataUnit={todaysActivityDataUnit}
            />
          }
        />
        <Route
          path="edit-activity-unit"
          element={
            <AddActivityUnitPage
              onUpdateData={onUpdateData}
              categories={categories}
              activityCategories={activityCategories}
              onUpdateCategory={onUpdateCategory}
              onDeleteSubCategory={onDeleteSubCategory}
            />
          }
        />
        <Route
          path="tasks-habits"
          element={
            <TasksHabitsPage
              activityCategories={activityCategories}
            />
          }
        />
        <Route
          path="finances"
          element={
            <FinancePage
              onUpdateData={onUpdateData}
              onDeleteSubCategory={onDeleteSubCategory}
              financeCategories={financeCategories}
              onAddFinancialData={onAddFinancialData}
              financeDatas={financeDatas}
              onDeleteFinancialData={onDeleteFinancialData}
              onUpdateFinancialData={onUpdateFinancialData}
            />
          }
        />
        <Route
          path="view-activity-units"
          element={
            <ViewActivityUnitsPage
              onGetActivityDataUnit={onGetActivityDataUnit}
              activityCategories={activityCategories}
              activityDatas={activityDatas}
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
