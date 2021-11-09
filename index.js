/*---------Boiler Plate------------*/

const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
/*----------------Game Play-----------------------*/
gameChoice();

//async function for user to pick game that they like to play, function will run based on user choice

async function gameChoice() {
  let choice = await ask(
    "Hello,lets play a game! Do you want the computer to guess your number (1) OR do you want to guess the computer's number (2)?"
  );
  choice = parseInt(choice);

  if (choice === 1) {
    computerGuessstart();
  } else {
    humanGuessstart();
  }
}

/*****Computer Picks a Number**********/

let min = 1;
let max = 100;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

//humanGuessstart();

async function humanGuessstart() {
  console.log(
    "Let's play a game where me computer picks a number and you human guess it."
  );
  let userGuess = await ask("Enter your guess: "); //guess the computer's number
  userGuess = parseInt(userGuess);
  let compPick = getRandomInt(min, max); //the computer uses a function to generate a random number
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
      humanGuessstart();
    }
  }
}

/*--------------Global-------------*/

/*Function*/

//Modify Guess Range
function randomNumber(min, max) {
  let range = max - min + 1;
  return min + Math.floor(Math.random() * range);
}

//Make it Smarter
function smartGuess(min, max) {
  return Math.floor((min + max) / 2);
}
//computerGuessstart();

async function computerGuessstart() {
  console.log(
    "Let's play a game where you (human) make up a number and set the upper limit, then I (computer) try to guess it."
  );

  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  secretNumber = parseInt(secretNumber);
  max = await ask("What is the upper limit of your range?");
  max = parseInt(max);

  let compGuess = smartGuess(min, max);
  let answer = await ask("Is your number? " + compGuess + " (y/n):");

  //Let the Computer Win

  if (answer === "y") {
    console.log("You rock!");
    process.exit();
  } else {
    while (answer !== "y") {
      let hiLow = await ask("Is it higher or lower? (h/l):");

      // Modify your guess range
      if (hiLow === "h" && secretNumber > compGuess) {
        min = compGuess + 1;
        compGuess = smartGuess(min, max);
      } else if (hiLow === "l" && secretNumber < compGuess) {
        max = compGuess - 1;
        compGuess = smartGuess(min, max);
      } else if ((hiLow = "h" && secretNumber < compGuess)) {
        console.log(
          "You said it was lower than " +
            compGuess +
            ", so it cant also be higher!" +
            "YOU ARE CHEATING...GAME OVER!"
        );
        process.exit();
      } else if ((hiLow = "l" && secretNumber > compGuess)) {
        console.log(
          "You said it was higher than " +
            compGuess +
            ", so it cant also be lower! " +
            "YOU ARE CHEATING...GAME OVER!"
        );
        process.exit();
      }
      answer = await ask("Is your number" + " " + compGuess + "?" + "(y/n):");
    }
  }
  console.log("I guessed it");
  process.exit();
}
