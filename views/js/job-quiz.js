const questions = [
    {
      question: "What's your favorite environment?",
      answers: [
        { text: "Cold places", job: "Iceberg Mover" },
        { text: "Hot places", job: "Snake Milker" },
        { text: "Cities", job: "Ghost Hunter" },
        { text: "Nature", job: "Pet Food Taster" }
      ]
    },
    {
      question: "How adventurous are you?",
      answers: [
        { text: "Very", job: "Iceberg Mover" },
        { text: "Somewhat", job: "Ghost Hunter" },
        { text: "Prefer to stay safe", job: "Pet Food Taster" }
      ]
    },
    {
      question: "Favorite animal?",
      answers: [
        { text: "Snake", job: "Snake Milker" },
        { text: "Dog", job: "Pet Food Taster" },
        { text: "Bird", job: "Ghost Hunter" }
      ]
    },
    {
      question: "Are you good at handling unusual tasks?",
      answers: [
        { text: "Yes", job: "Snake Milker" },
        { text: "Maybe", job: "Ghost Hunter" },
        { text: "No", job: "Pet Food Taster" }
      ]
    },
    {
      question: "Pick a random skill:",
      answers: [
        { text: "Ice handling", job: "Iceberg Mover" },
        { text: "Bone collecting", job: "Ghost Hunter" },
        { text: "Cooking", job: "Pet Food Taster" }
      ]
    }
  ];
  
  let currentQuestion = 0;
  let jobCounts = {};
  
  const questionEl = document.getElementById('jb-question');
  const answersEl = document.getElementById('jb-answers');
  const nextBtn = document.getElementById('jb-next-btn');
  const resultContainer = document.getElementById('jb-result');
  const jobResult = document.getElementById('jb-job-result');
  const restartBtn = document.getElementById('jb-restart-btn');
  
  function startQuiz() {
    currentQuestion = 0;
    jobCounts = {};
    showQuestion();
    resultContainer.classList.add('jb-hidden');
    document.getElementById('jb-quiz').classList.remove('jb-hidden');
  }
  
  function showQuestion() {
    const current = questions[currentQuestion];
    questionEl.innerText = current.question;
    answersEl.innerHTML = "";
  
    current.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('jb-answer-btn');
      button.addEventListener('click', () => selectAnswer(answer.job));
      answersEl.appendChild(button);
    });
  }
  
  function selectAnswer(job) {
    const buttons = document.querySelectorAll('.jb-answer-btn');
    buttons.forEach(button => {
      button.classList.remove('jb-selected');
    });
  
    const eventButton = event.target;
    eventButton.classList.add('jb-selected');
  
    jobCounts[job] = (jobCounts[job] || 0) + 1;
  
    nextBtn.disabled = false;
  }
  
  nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
      nextBtn.disabled = true;
    } else {
      showResult();
    }
  });
  
  restartBtn.addEventListener('click', startQuiz);
  
  function showResult() {
    document.getElementById('jb-quiz').classList.add('jb-hidden');
    resultContainer.classList.remove('jb-hidden');
  
    const bestJob = Object.keys(jobCounts).reduce((a, b) => jobCounts[a] > jobCounts[b] ? a : b, null);
  
    jobResult.innerText = bestJob ? `You would be a great ${bestJob}!` : "Couldn't determine a job!";
  }
  
  startQuiz();
  