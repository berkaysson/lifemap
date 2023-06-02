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
  onUpdateActivityDataUnit,
  onUpdateCategory,
  onDeleteSubCategory,
  onAddFinancialDataUnit,
  onUpdateFinancialDataUnit,
  onDeleteFinancialDataUnit,
  categories,
  activityCategories,
  financialCategories,
  financeDataUnits,
  activityDataUnits,
  onGetActivityDataUnit,
  todaysActivityDataUnit,
  onExport,
  onImport,
  onAddTaskUnit,
  onAddHabitUnit,
  taskDataUnits,
  habitDataUnits,
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
              onUpdateActivityDataUnit={onUpdateActivityDataUnit}
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
              onAddTaskUnit={onAddTaskUnit}
              onAddHabitUnit={onAddHabitUnit}
              taskDataUnits={taskDataUnits}
              habitDataUnits={habitDataUnits}
            />
          }
        />
        <Route
          path="finances"
          element={
            <FinancePage
              financialCategories={financialCategories}
              onAddFinancialDataUnit={onAddFinancialDataUnit}
              financeDataUnits={financeDataUnits}
              onDeleteFinancialDataUnit={onDeleteFinancialDataUnit}
              onUpdateFinancialDataUnit={onUpdateFinancialDataUnit}
            />
          }
        />
        <Route
          path="view-activity-units"
          element={
            <ViewActivityUnitsPage
              onGetActivityDataUnit={onGetActivityDataUnit}
              activityCategories={activityCategories}
              activityDataUnits={activityDataUnits}
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
