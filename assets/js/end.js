const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// high scores displayed
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

// No Save without initials
username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

// Must Enter Initial
function keyDown(e) {
  var e = window.event || e;
  var key = e.keyCode;
  //space pressed
  if (key == 32) {
    //space
    e.preventDefault();
  }
}

// Saves scores
saveHighScore = (e) => {
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  highScores.push(score);

  highScores.sort((a, b) => {
    return b.score - a.score;
  });

  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("./index.html");
};
