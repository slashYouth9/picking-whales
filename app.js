// 主题切换功能
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? null : 'dark'; // [1](@ref)
  document.documentElement.setAttribute('data-theme', newTheme);

  localStorage.setItem('theme', newTheme || 'light'); // [1](@ref)

  const themeButton = document.querySelector('.theme-toggle');
  themeButton.textContent = newTheme ? '🌙' : '☀️'; // [1](@ref)
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light'; // [3](@ref)
  document.documentElement.setAttribute('data-theme',
    savedTheme === 'dark' ? 'dark' : null
  );
  document.querySelector('.theme-toggle').textContent =
    savedTheme === 'dark' ? '🌙' : '☀️';
}

// 初始化执行
initTheme();

// 初始化主题
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.querySelector('.theme-toggle').textContent = savedTheme ? '☀️' : '🌙';
}

const questions = [
  {
    type: 'choice',
    question: "HTML的全称是什么？",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
    answer: 0,
    explanation: "HTML是超文本标记语言的缩写，用于创建网页结构。"
  },
  {
    type: 'fill',
    question: "CSS的全称是______。",
    answer: "Cascading Style Sheets",
    explanation: "CSS用于控制网页样式，实现内容与表现的分离。"
  },
  {
    type: 'choice',
    question: "以下哪个不是JavaScript框架？",
    options: ["React", "Vue", "Django"],
    answer: 2,
    explanation: "Django是Python的后端框架，不是前端JavaScript框架。"
  }
];

let currentQuestion = 0;

function renderQuestions() {
  const container = document.getElementById('questions');
  container.innerHTML = '';

  const q = questions[currentQuestion];
  let html = `<div class="question">
                  <h3>第 ${currentQuestion + 1} 题：${q.question}</h3>`;

  if (q.type === 'choice') {
    html += '<div class="options">';
    q.options.forEach((option, index) => {
      html += `<div class="option" onclick="checkAnswer(${index})">${String.fromCharCode(65 + index)}. ${option}</div>`;
    });
    html += '</div>';
  } else {
    html += `<input type="text" id="fillAnswer" placeholder="输入答案..." inputmode="text">
              <button onclick="checkFillAnswer()">提交验证</button>`;
  }

  html += '</div>';
  container.innerHTML = html;
}

function showFeedback(isCorrect, correctAnswer, explanation) {
  const questionDiv = document.querySelector('.question');
  const feedbackClass = isCorrect ? 'correct-feedback' : 'wrong-feedback';
  const feedbackText = isCorrect ? '✓ 回答正确' : '✗ 回答错误';

  const feedbackHtml = `
      <div class="feedback ${feedbackClass}">
          <div>${feedbackText}</div>
          <div class="explanation">
              <strong>正确答案：</strong>${correctAnswer}<br>
              <strong>解析：</strong>${explanation}
          </div>
      </div>
  `;

  questionDiv.innerHTML += feedbackHtml;
}

function checkAnswer(selectedIndex) {
  const q = questions[currentQuestion];
  const options = document.querySelectorAll('.option');

  options.forEach(opt => {
    opt.style.pointerEvents = 'none';
    const index = parseInt(opt.onclick.toString().match(/\d+/)[0]);
    if (index === q.answer) {
      opt.classList.add('correct');
    }
  });

  const isCorrect = selectedIndex === q.answer;
  if (!isCorrect) {
    options[selectedIndex].classList.add('wrong');
  }

  showFeedback(isCorrect, q.options[q.answer], q.explanation);
}

function checkFillAnswer() {
  const input = document.getElementById('fillAnswer');
  const q = questions[currentQuestion];
  const isCorrect = input.value.trim().toLowerCase() === q.answer.toLowerCase();

  input.style.pointerEvents = 'none';
  input.classList.add(isCorrect ? 'correct' : 'wrong');
  showFeedback(isCorrect, q.answer, q.explanation);
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestions();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestions();
  }
}

function toggleQuestionList() {
  const questionList = document.querySelector('.question-list');
  questionList.classList.toggle('open');
}

function goToQuestion(index) {
  currentQuestion = index;
  renderQuestions();
}

function renderQuestionList() {
  const listContainer = document.querySelector('.question-list');
  let listHtml = '';
  questions.forEach((_, index) => {
    listHtml += `<button onclick="goToQuestion(${index})">${index + 1}</button>`;
  });
  listContainer.innerHTML = listHtml;
}

// 初始化加载
renderQuestions();
renderQuestionList();
