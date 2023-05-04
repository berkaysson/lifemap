import categoryData from "./categoryData.json";

const studyCategories = categoryData.studyCategories;
const sportCategories = categoryData.sportCategories;
const gameCategories = categoryData.gameCategories;
const expenseCategories = categoryData.expenseCategories;

const dataUnitConstructor = (date) => {
  let studies = { total: 0 };
  let sports = { total: 0 };
  let games = { total: 0 };
  let expenses = { total: 0 };

  studyCategories.forEach((category) => {
    studies[category] = 0;
  });

  sportCategories.forEach((category) => {
    sports[category] = 0;
  });

  gameCategories.forEach((category) => {
    games[category] = 0;
  });

  expenseCategories.forEach((category) => {
    expenses[category] = 0;
  });

  return {
    id: date,
    date: date,
    studyData: studies,
    sportData: sports,
    gameData: games,
    expenseData: expenses,
  };
};

export default dataUnitConstructor;
