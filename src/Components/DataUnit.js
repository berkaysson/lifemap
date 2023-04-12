class DataUnit {
  constructor(
    studies,
    sports,
    games,
    expenseAmount,
    date
  ) {
    this.id = date;
    this.study = {};
    for (const study of studies) {
      this.study[study.category] = study.minute;
    }
    this.sport = {};
    for (const sport of sports) {
      this.sport[sport.category] = sport.minute;
    }
    this.game = {};
    for (const game of games) {
      this.game[game.category] = game.minute;
    }
    this.expense = { amount: expenseAmount };
    this.date = date;
  }
}

// export default DataUnit;
module.exports = DataUnit;