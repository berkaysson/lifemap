const DataUnit = require("../Components/DataUnit");
const fs = require("fs");

const fileContent = fs.readFileSync("olddata.json", "utf-8");
const data = JSON.parse(fileContent);

const formattedData = data.map((item) => {
  const studies = Object.entries(item.study).map(([category, minute]) => ({
    category: category === "studyMinute" ? "custom" : category,
    minute,
  }));

  const sports = Object.entries(item.sport).map(([category, minute]) => ({
    category: category === "total" ? "custom" : category,
    minute,
  }));

  const games = Object.entries(item.game).map(([category, minute]) => ({
    category: category === "gameMinute" ? "custom" : category,
    minute,
  }));

  return new DataUnit(
    studies,
    sports,
    games,
    item.expense.amount,
    item.date
  );
});

const jsonContent = JSON.stringify(formattedData);

fs.writeFileSync("data.json", jsonContent);