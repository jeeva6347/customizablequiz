document.getElementsByClassName("admin")[0].style.display = "block";

document.getElementById("container").style.display="none";
let questions = [];
let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function showQuestion() {
  const q = questions[currentIndex];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("p");
    btn.textContent = option;
    btn.className = "options";
    btn.onclick = () => checkAnswer(option);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correct = questions[currentIndex].answer;
  if (selected === correct) score++;
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = "";
  resultEl.textContent = `Your Score: ${score} / ${questions.length}`;
   document.getElementById("restartBtn").style.display = "inline-block";
}
function restartQuiz() {
  currentIndex = 0;
  score = 0;
  shuffle(questions);
  resultEl.textContent = "";
  
  document.querySelector(".admin").style.display = "block";
  document.getElementById("container").style.display = "none";

  
  document.getElementById("jsonInput").value = "";
  document.getElementById("jsonFile").value = "";
  showQuestion();
}


function loadQuiz() {
  try {
    const jsonText = document.getElementById("jsonInput").value;
    questions = JSON.parse(jsonText);
sessionStorage.setItem("quizData", jsonText); 
    startQuiz();
  } catch (e) {
    alert("Invalid JSON format in textarea!");
    console.error(e);
  }
}

function loadFromFile() {
  const fileInput = document.getElementById("jsonFile");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      questions = JSON.parse(e.target.result);
       sessionStorage.setItem("quizData", e.target.result); 
      startQuiz();
    } catch (e) {
      alert("Invalid JSON file!");
      console.error(e);
    }
  };
  reader.readAsText(file);
}

function startQuiz() {
  shuffle(questions);
  currentIndex = 0;
  score = 0;
  resultEl.textContent = "";
  document.querySelector(".admin").style.display = "none";
  document.getElementById("container").style.display = "block";
  showQuestion();
}
 window.onload = function () {
      const saved = sessionStorage.getItem("quizData");
      if (saved) {
        try {
          document.getElementById("jsonInput").value = saved;
          questions = JSON.parse(saved);
          startQuiz();
        } catch (e) {
          console.log("Failed to restore saved quiz data.");
        }
      }
    };
