const numQuestions = 5;
const quizData = [];
const operators = ['+', '-', '*', '/'];

// Function to generate a random number
function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1; // Random numbers between 1 and 10
}

// Function to generate unique answer options
function generateAnswerOptions(correctAnswer) {
    const options = new Set([correctAnswer]);

    while (options.size < 4) {
        const randomOption = (Math.floor(Math.random() * 20) + 1); // Random numbers between 1 and 20
        options.add(randomOption);
    }

    return Array.from(options).sort(() => Math.random() - 0.5); // Shuffle options
}
// Function to generate a random math question
function generateRandomQuestion() {
    const num1 = getRandomNumber();
    const num2 = getRandomNumber();
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let question;
    let correctAnswer;

    switch (operator) {
        case '+':
            question = `${num1} + ${num2}`;
            correctAnswer = num1 + num2;
            break;
        case '-':
            question = `${num1} - ${num2}`;
            correctAnswer = num1 - num2;
            break;
        case '*':
            question = `${num1} * ${num2}`;
            correctAnswer = num1 * num2;
            break;
        case '/':
            question = `${num1} / ${num2}`;
            correctAnswer = (num1 / num2).toFixed(2); // Two decimal places for division
            break;
    }

    return {
        question,
        correctAnswer
    };
}

// Generate random questions
for (let i = 0; i < numQuestions; i++) {
    const { question, correctAnswer } = generateRandomQuestion();
    const answerOptions = generateAnswerOptions(correctAnswer);

    quizData.push({
        question,
        options: answerOptions,
        correct: answerOptions.indexOf(correctAnswer)
    });
}

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const scoreDisplay = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;

function loadQuiz() {
    const currentQuestion = quizData[currentQuestionIndex];
    quizContainer.innerHTML = `
        <div class="question">${currentQuestion.question}</div>
        ${currentQuestion.options.map((option, index) => `
            <label>
                <input type="radio" name="answer" value="${index}">${option}
            </label>
        `).join('')}
    `;
}

function getSelected() {
    const answers = document.querySelectorAll('input[name="answer"]');
    let answer;
    answers.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.value;
        }
    });
    return answer;
}

submitButton.addEventListener('click', () => {
    const answer = getSelected();
    
    if (answer !== undefined) {
        if (parseInt(answer) === quizData[currentQuestionIndex].correct) {
            score++;
        }
        currentQuestionIndex++;

        if (currentQuestionIndex < quizData.length) {
            loadQuiz();
        } else {
            scoreDisplay.innerHTML = `మీరు  ${quizData.length} కి ${score} స్కోర్ చేసారు`;
            submitButton.disabled = true;
        }
    } else {
        alert("Please select an answer!");
    }
});

// Load the first question
loadQuiz();
