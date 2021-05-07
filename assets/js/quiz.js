// Timer/Score function
function countdown() {
  setInterval(function () {
    // When out of time, end page
    if (score <= 0) {
      clearInterval((score = 0));
      localStorage.setItem("mostRecentScore", score);
      return window.location.assign("./end.html");
    }
    currentScore.innerHTML = score;
    score -= 1;
  }, 1000);
}

// Deduction
var deduction = 5;
function deductScore(num) {
  score -= num;
  currentScore.innerText = score;
}

// Default Timer/Score
var currentScore = document.querySelector("#score");
var score = 60;

// Questions
var question = document.querySelector("#question");
var questionLimit = 5;
var questionsLeft = [];
var currentQuestion = {};
var questions = [
  {
    question:
      "Which general term refers to all kinds of harmful software, including viruses and spyware?",
    choice1: "Trojans",
    choice2: "Malware",
    answer: 2,
  },
  {
    question: "CPU stands for...?",
    choice1: "Central Processing Unit",
    choice2: "Critical Patch Update",
    answer: 1,
  },
  {
    question:
      "What password was reported to have been regularly used in the early 2000s?",
    choice1: "123456",
    choice2: "Birthdates",
    answer: 1,
  },
  {
    question: "What combination of keys minimizes all open programs?",
    choice1: "Ctrl + Shift + PgDn",
    choice2: "Windows Key + M",
    answer: 2,
  },
  {
    question:
      "Which of the following is not an example of an Operating System?",
    choice1: "Microsoft Office XP",
    choice2: "Windows 98",
    answer: 1,
  },
];

// This function shows the new questions
function displayNextQuestion() {
  // When out of questions, go to end
  if (questionsLeft.length === 0) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("./complete.html");
  }

  // randomizes questions
  var questionsIndex = Math.floor(Math.random() * questionsLeft.length);
  currentQuestion = questionsLeft[questionsIndex];
  question.innerText = currentQuestion.question;

  answers.forEach((choice) => {
    var number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  questionsLeft.splice(questionsIndex, 1);
  correctAnswer = true;
}

var answers = Array.from(document.querySelectorAll(".choice-text"));
var correctAnswer = true;
// End Questions Array

// Answer Checker
answers.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!correctAnswer) return;

    correctAnswer = false;
    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.dataset["number"];

    // Rates user answers as correct or incorrect
    var classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    // Point deductor
    if (classToApply === "incorrect") {
      deductScore(deduction);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      displayNextQuestion();
    }, 1000);
  });
});

function startGame() {
  questionsLeft = [...questions];
  displayNextQuestion();
  countdown();
}

startGame();
