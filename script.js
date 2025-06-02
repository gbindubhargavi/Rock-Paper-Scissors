const choices = document.querySelectorAll(".choice");
const userScoreSpan = document.getElementById("user-score");
const computerScoreSpan = document.getElementById("computer-score");
const resultDiv = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

const userChoiceDisplay = document.getElementById("user-choice-display");
const computerChoiceDisplay = document.getElementById("computer-choice-display");

let userScore = 0;
let computerScore = 0;

const options = ["rock", "paper", "scissors"];
const emojiMap = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️"
};

function getComputerChoice() {
  return options[Math.floor(Math.random() * 3)];
}

function playRound(userChoice) {
  if (userScore >= 10 || computerScore >= 10) return;

  const computerChoice = getComputerChoice();

  userChoiceDisplay.textContent = `You chose: ${emojiMap[userChoice]}`;
  computerChoiceDisplay.textContent = `Computer chose: ${emojiMap[computerChoice]}`;

  let resultText = "";

  if (userChoice === computerChoice) {
    resultText = `It's a draw! You both chose ${userChoice}.`;
    setResult(resultText, "");
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    userScore++;
    resultText = `You win! ${userChoice} beats ${computerChoice}.`;
    setResult(resultText, "win");
  } else {
    computerScore++;
    resultText = `You lose! ${computerChoice} beats ${userChoice}.`;
    setResult(resultText, "lose");
  }

  updateScores();

  if (userScore === 10 || computerScore === 10) {
    const winner = userScore === 10 ? "🎉 You" : "💻 Computer";
    resultDiv.textContent = `${winner} won the game!`;
    restartBtn.classList.remove("hidden");
  }
}

function setResult(message, resultClass) {
  resultDiv.textContent = message;
  resultDiv.className = `result ${resultClass}`;
}

function updateScores() {
  userScoreSpan.textContent = userScore;
  computerScoreSpan.textContent = computerScore;
}

function restartGame() {
  userScore = 0;
  computerScore = 0;
  updateScores();
  resultDiv.textContent = "Make your move!";
  resultDiv.className = "result";
  restartBtn.classList.add("hidden");
  userChoiceDisplay.textContent = "You chose: ❔";
  computerChoiceDisplay.textContent = "Computer chose: ❔";
}

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    playRound(choice.dataset.choice);
  });
});

restartBtn.addEventListener("click", restartGame);
