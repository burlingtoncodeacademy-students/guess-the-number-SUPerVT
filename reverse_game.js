/*---------Boiler Plate------------*/

const { cp } = require("fs");
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//Computer's Guess

let min = 1;
let max = 100;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

start();

async function start() {
  console.log(
    "Let's play a game where me computer picks a number and you human guess it."
  );
  let userGuess = await ask("Enter your guess: "); //guess the computer's number
  userGuess = parseInt(userGuess);
  let compPick = getRandomInt(min, max); //the computer uses a function to generate a random number
  console.log(compPick);
  let count = 0;
  if (userGuess === compPick) {
    console.log("You're a smart computer!");
    process.exit();
  } else {
    while (userGuess != compPick) {
      if (userGuess > compPick) {
        userGuess = await ask("Too high! Guess again: ");
      } else if (userGuess < compPick) {
        userGuess = await ask("Too low! Guess again: ");
      }
      userGuess = parseInt(userGuess);
    }
    count++;
    console.log(
      "You guessed it! It took you " + count + " attempt(s) to get the number!"
    );
    playAgain = await ask("Do you want to play again? " + "(y/n):");

    if (playAgain === "n") {
      console.log("Goodbye!");
      process.exit();
    } else if (playAgain === "y") {
      start();
    }
  }
}
