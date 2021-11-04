/*---------Boiler Plate------------*/

const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

/*--------------Global-------------*/
let min = 1;
let max = 100;

/*Function*/

function randomNumber(min, max) {
  let range = max - min + 1;
  return min + Math.floor(Math.random() * range);
}
//Make it Smarter
function smartGuess(min, max) {
  return (min + max) / 2;
}
start();

async function start() {
  let min = 1;
  let max = 100;
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  let compGuess = randomNumber(min, max);
  console.log(compGuess);
  let answer = await ask("Is your number " + compGuess + "?");
  //Let the Computer Win
  if (answer === "y") {
    console.log("You rock!");
    process.exit();
  } else {
    while (answer !== "y") {
      let hiLow = await ask("is it higher or lower?");
      // Modify your guess range
      if (hiLow === "higher") {
        min = compGuess + 1;
        compGuess = randomNumer(min, max);
      } else if (hiLow === "1") {
        max = compGuess - 1;
        compGuess = randomNumber(min, max);
      }
      answer = await ask("Is your number" + compGuess + "?");
    }
  }
  process.exit();
}
