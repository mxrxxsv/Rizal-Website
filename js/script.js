

const questions = [
    {
        question: "What is the complete legal name of Dr. Jose Rizal?",
        options: ["José Protacio Rizal Mercado y Alonso Realonda", "Dr. Jose Pedro Alonso Realonda Mercado Rizal", "Dr. Josito Alonso Realonda Mercado Rizal", "Dr. Jose Protacio Alonso Realonda Mercado Rizal"],
        answer: 0,
        clues: []
    },
    {
        question: "When is the birth anniversary of Dr. Jose Rizal?",
        options: ["May 19, 1861", "June 19, 1861", "June 18, 1961", "November 23, 1961"],
        answer: 1,
        clues: []
    },
    {
        question: "At 16, Rizal experienced his first romance. He fell in love with which girl?",
        options: ["Leonor Gonzalez", "Mae Abuan", "Leonor Rivera", "Segunda Katigbak"],
        answer: 3,
        clues: []
    },
    {
        question: "Rizal was a great?",
        options: ["Law Student", "Medical Student", "Engineering Student", "Literature Student"],
        answer: 1,
        clues: []
    },
    {
        question: "He was an Austrian, and he became the best friend of Dr. Jose Rizal. Who was he?",
        options: ["Dr. Ferdinand Blumettritt", "Dr. Jagor", "Dr. Reinhold Host", "Dr. Bech"],
        answer: 0,
        clues: []
    },
    {
        question: "Rizal died in",
        options: ["1983", "1964", "1998", "1896"],
        answer: 3,
        clues: []
    },
    {
        question: "The surname Mercado when translated to english means?",
        options: ["Market", "Merchant", "Market Trade"],
        answer: 0,
        clues: []
    },
    {
        question: "What is Jose Rizal's petname in his family.",
        options: ["Utw", "Uti", "Pepe"],
        answer: 2,
        clues: []
    },
    {
        question: "Rizal considered him as his second father. ",
        options: ["Pasyano", "Mike", "Paciano"],
        answer: 2,
        clues: []
    },
    {
        question: "Who is his first teacher?",
        options: ["Her Mother", "His Father", "His Sister"],
        answer: 0,
        clues: []
    },
    {
        question: "Rizal's dog name is?",
        options: ["Uzman", "Usman", "Uszman"],
        answer: 0,
        clues: []
    },
    {
        question: "Where is the birthplace of Rizal",
        options: ["Sta. Rosa", "Binan", "Calamba"],
        answer: 2,
        clues: []
    },
    {
        question: "How many siblings that Rizal have",
        options: ["11", "12", "10"],
        answer: 0,
        clues: []
    },
    {
        question: "The most influencial and powerful person during Rizal's time",
        options: ["King", "Governor-General", "Friars"],
        answer: 2,
        clues: []
    },
    {
        question: "The priest who baptized Rizal",
        options: ["Fr Rufino Collantes", "Fr Rufino Guerrero", "Fr Jose "],
        answer: 0,
        clues: []
    },
    {
        question: "The date the Rizal bill was enacted",
        options: ["June 12 1956", "June 19 1956", "June 12 1934"],
        answer: 0,
        clues: []
    },
    {
        question: "In this year CHED Memorandum No. 3 was issued enforcing strict compliance to Memorandum Order No. 247",
        options: ["2006", "1995", "1978"],
        answer: 1,
        clues: []
    },
    {
        question: "This refers to discerning evaluative, and analytical thinking",
        options: ["Psychology", "Critical Thinking", "Logic"],
        answer: 0,
        clues: []
    },
    {
        question: "Jose Rizal's common law wife",
        options: ["Leonor Rivera", "Segunda Katigbak", "Josephine Bracken"],
        answer: 2,
        clues: []
    }
];

let currentQuestion = 0;
let score = 0;
let level = 1;
let timer;

function displayQuestion() {
    const currentQ = questions[currentQuestion];
    document.getElementById('question').textContent = currentQ.question;
    const clueImagesContainer = document.getElementById('clueImages');
    clueImagesContainer.innerHTML = '';
    currentQ.clues.forEach(clue => {
        const clueImage = document.createElement('img');
        clueImage.src = clue;
        clueImage.classList.add('clue-image');
        clueImagesContainer.appendChild(clueImage);
    });
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    currentQ.options.forEach((opt, idx) => {
        const optElement = document.createElement('div');
        optElement.classList.add('option');
        optElement.textContent = `${String.fromCharCode(97 + idx)}. ${opt}`;
        optElement.setAttribute('data-option', idx);
        optElement.addEventListener('click', selectOption);
        optionsContainer.appendChild(optElement);
    });
}

function selectOption(event) {
    clearInterval(timer);
    const selectedOption = parseInt(event.target.getAttribute('data-option'));
    const correctOption = questions[currentQuestion].answer;
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.removeEventListener('click', selectOption));
    options[correctOption].classList.add('correct');
    if (selectedOption === correctOption) {
        event.target.classList.add('correct');
        score += 5;
    } else {
        event.target.classList.add('incorrect');
    }
    document.getElementById('currentScore').textContent = `Score: ${score}`;
    setTimeout(nextQuestion, 2000);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        document.getElementById('testNumber').textContent = `${currentQuestion + 1}/19`;
        displayQuestion();
        startTimer();
    } else {
        endQuiz();
    }
}

function startTimer() {
    let timeLeft = 20;
    document.getElementById('time').textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            document.querySelectorAll('.option').forEach(opt => opt.removeEventListener('click', selectOption));
            document.getElementById('nextButton').style.display = 'block';
        }
    }, 1000);
}

function startGame() {
    document.getElementById('instruction').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    displayQuestion();
    startTimer();
}

function endQuiz() {
    document.getElementById('scoreTable').style.display = 'block';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('questionBox').innerHTML = `<h2>Congratulations! Quiz completed!</h2><p>Your final score is: ${score}</p>`;
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('.options-container').style.display = 'none';
    document.getElementById('options').style.display = 'none';
    document.getElementById('resetButton').style.display = 'block';
    document.getElementById('scoreTable').style.display = 'block';
}

function resetGame() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('testNumber').textContent = `${currentQuestion + 1}/19`;
    document.getElementById('currentScore').textContent = `Score: ${score}`;
    document.getElementById('instruction').style.display = 'block';
    document.getElementById('game').style.display = 'none';
    document.getElementById('resetButton').style.display = 'none';
    document.getElementById('scoreTable').style.display = 'none';
    clearInterval(timer);
}