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
import SignIn from "../Pages/SignIn";

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
  onDeleteTaskDataUnit,
  onDeleteHabitDataUnit,
}) => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/lifemap/" element={<RootLayout />}>
        <Route
          index
          path="/lifemap/"
          element={
            <HomePage
              activityCategories={activityCategories}
              todaysActivityDataUnit={todaysActivityDataUnit}
              taskDataUnits={taskDataUnits}
              habitDataUnits={habitDataUnits}
            />
          }
        />
        <Route
          path="/lifemap/edit-activity-unit"
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
          path="/lifemap/tasks-habits"
          element={
            <TasksHabitsPage
              activityCategories={activityCategories}
              onAddTaskUnit={onAddTaskUnit}
              onAddHabitUnit={onAddHabitUnit}
              taskDataUnits={taskDataUnits}
              habitDataUnits={habitDataUnits}
              onDeleteTaskDataUnit={onDeleteTaskDataUnit}
              onDeleteHabitDataUnit={onDeleteHabitDataUnit}
            />
          }
        />
        <Route
          path="/lifemap/finances"
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
          path="/lifemap/view-activity-units"
          element={
            <ViewActivityUnitsPage
              onGetActivityDataUnit={onGetActivityDataUnit}
              activityCategories={activityCategories}
              activityDataUnits={activityDataUnits}
            />
          }
        />
        <Route path="/lifemap/charts" element={<ChartsPage />} />
        <Route
          path="/lifemap/settings"
          element={<SettingsPage onExport={onExport} onImport={onImport} />}
        />
        <Route path="/lifemap/sign" element={<SignIn />} />
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
