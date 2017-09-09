let prompt = require('prompt');
let color = require('cli-color');

let monthNames = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

let formatDate = function (date) {
  return date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
}

let randomDate = function (start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

let getRandomDateByDifficulty = function(d) {
  let currentYear = new Date().getFullYear();
  switch(d){
    case 1: // whole current year
      return randomDate(new Date(currentYear, 0, 1), new Date(currentYear, 11, 31));
    case 2: // whole current year and whole next year
      return randomDate(new Date(currentYear, 0, 1), new Date(currentYear + 1, 11, 31));
    case 3: // 2000 - 2099
      return randomDate(new Date(2000, 0, 1), new Date(2099, 11, 31));
    case 4: // 1900 - 2099
      return randomDate(new Date(1900, 0, 1), new Date(2099, 11, 31));
    case 5: // 1900 - 2199
      return randomDate(new Date(1900, 0, 1), new Date(2199, 11, 31));
    case 6: // 100 - 2999
      return randomDate(new Date(100, 0, 1), new Date(2999, 11, 31));
  }
}

let askForNewDate = function(difficulty) {
  let randDate = getRandomDateByDifficulty(difficulty);
  console.log(color.blue(formatDate(randDate)));
  prompt.start();
  prompt.get(['index'], function (err, result) {
    if (result && result.index >= 0) {
      if (String(result.index) == String(randDate.getDay())) {
        console.log(color.green("correct"));
      } else {
        console.log(color.red("wrong, it's " + String(randDate.getDay())));
      }
      console.log();
      askForNewDate(difficulty);
    }
  });
}

console.log();
console.log(color.blue("Please choose a difficulty:"));
console.log(color.blackBright("1 -> whole current year"));
console.log(color.blackBright("2 -> whole current year and whole next year"));
console.log(color.blackBright("3 -> 2000 - 2099"));
console.log(color.blackBright("4 -> 1900 - 2099"));
console.log(color.blackBright("5 -> 1900 - 2199"));
console.log(color.blackBright("6 -> 100 - 2999"));

prompt.start();
prompt.get(['difficulty'], function (err, result) {
  if (result && parseInt(result.difficulty) >= 0 && parseInt(result.difficulty) <= 6) {
    console.log();
    console.log(color.blue("Please enter the correct number depending on the day of the week:"));
    console.log(color.blackBright("0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday"));
    console.log(color.blackBright("Enter -1 to quit."));
    console.log();

    askForNewDate(parseInt(result.difficulty));
  }
});

