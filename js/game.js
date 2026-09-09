// =========================
// DATA PERMAINAN
// =========================

const wasteQuestions = [

    {
        name: "Botol Plastik",
        emoji: "🧴",
        answer: "anorganik",
        explanation:
            "Botol plastik termasuk sampah anorganik dan dapat didaur ulang setelah dibersihkan."
    },

    {
        name: "Kulit Pisang",
        emoji: "🍌",
        answer: "organik",
        explanation:
            "Kulit pisang berasal dari makhluk hidup dan dapat terurai secara alami."
    },

    {
        name: "Baterai Bekas",
        emoji: "🔋",
        answer: "b3",
        explanation:
            "Baterai bekas termasuk sampah yang membutuhkan penanganan khusus karena mengandung bahan berbahaya."
    },

    {
        name: "Daun Kering",
        emoji: "🍂",
        answer: "organik",
        explanation:
            "Daun kering merupakan sampah organik dan dapat dimanfaatkan sebagai bahan kompos."
    },

    {
        name: "Kaleng Minuman",
        emoji: "🥫",
        answer: "anorganik",
        explanation:
            "Kaleng minuman termasuk sampah anorganik yang dapat didaur ulang."
    },

    {
        name: "Tisu Bekas",
        emoji: "🧻",
        answer: "residu",
        explanation:
            "Tisu bekas umumnya termasuk sampah residu karena sulit untuk didaur ulang."
    },

    {
        name: "Sisa Makanan",
        emoji: "🍚",
        answer: "organik",
        explanation:
            "Sisa makanan merupakan sampah organik yang dapat diolah menjadi kompos."
    },

    {
        name: "Lampu Bekas",
        emoji: "💡",
        answer: "b3",
        explanation:
            "Beberapa jenis lampu bekas membutuhkan penanganan khusus sehingga tidak boleh dibuang sembarangan."
    },

    {
        name: "Botol Kaca",
        emoji: "🍾",
        answer: "anorganik",
        explanation:
            "Botol kaca termasuk sampah anorganik dan dapat digunakan kembali atau didaur ulang."
    },

    {
        name: "Popok Sekali Pakai",
        emoji: "🧷",
        answer: "residu",
        explanation:
            "Popok sekali pakai termasuk sampah residu karena sulit untuk didaur ulang."
    }

];


// =========================
// VARIABEL PERMAINAN
// =========================

let currentQuestion = 0;

let score = 0;

let correctAnswers = 0;

let answered = false;


// =========================
// ELEMENT HTML
// =========================

const wasteEmoji =
    document.getElementById("waste-emoji");

const wasteName =
    document.getElementById("waste-name");

const questionNumber =
    document.getElementById("question-number");

const scoreDisplay =
    document.getElementById("score");

const progressBar =
    document.getElementById("game-progress-bar");

const feedback =
    document.getElementById("game-feedback");

const feedbackIcon =
    document.getElementById("feedback-icon");

const feedbackTitle =
    document.getElementById("feedback-title");

const feedbackText =
    document.getElementById("feedback-text");

const gameSection =
    document.querySelector(".game-section");

const gameResult =
    document.getElementById("game-result");


// =========================
// TAMPILKAN SOAL
// =========================

function loadQuestion() {

    const question =
        wasteQuestions[currentQuestion];


    wasteEmoji.textContent =
        question.emoji;


    wasteName.textContent =
        question.name;


    questionNumber.textContent =
        currentQuestion + 1;


    scoreDisplay.textContent =
        score;


    const progress =
        ((currentQuestion + 1) /
            wasteQuestions.length) * 100;


    progressBar.style.width =
        progress + "%";


    feedback.style.display =
        "none";


    answered = false;


    document
        .querySelectorAll(".answer-button")
        .forEach(function(button) {

            button.disabled = false;

            button.style.opacity = "1";

        });

}


// =========================
// CEK JAWABAN
// =========================

function checkAnswer(selectedAnswer) {

    if (answered) {
        return;
    }


    answered = true;


    const question =
        wasteQuestions[currentQuestion];


    document
        .querySelectorAll(".answer-button")
        .forEach(function(button) {

            button.disabled = true;

            button.style.opacity = "0.65";

        });


    if (selectedAnswer === question.answer) {

        score += 100;

        correctAnswers++;


        feedbackIcon.textContent =
            "🎉";


        feedbackTitle.textContent =
            "Jawaban Benar!";


        feedbackText.textContent =
            question.explanation +
            " Kamu mendapatkan +100 Eco Points.";

    }

    else {

        feedbackIcon.textContent =
            "💡";


        feedbackTitle.textContent =
            "Belum Tepat";


        feedbackText.textContent =
            question.explanation;

    }


    scoreDisplay.textContent =
        score;


    feedback.style.display =
        "block";


    feedback.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


// =========================
// SOAL BERIKUTNYA
// =========================

function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion >=
        wasteQuestions.length
    ) {

        finishGame();

        return;

    }


    loadQuestion();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =========================
// SELESAI GAME
// =========================

function finishGame() {

    gameSection.style.display =
        "none";


    gameResult.style.display =
        "block";


    document.getElementById(
        "final-score"
    ).textContent =
        score + " XP";


    document.getElementById(
        "correct-answer"
    ).textContent =
        correctAnswers + "/10";


    const accuracy =
        (correctAnswers / 10) * 100;


    document.getElementById(
        "accuracy"
    ).textContent =
        accuracy + "%";


    // Simpan progress
    saveGameProgress();


    gameResult.scrollIntoView({
        behavior: "smooth"
    });

}


// =========================
// SIMPAN PROGRESS
// =========================

function saveGameProgress() {

    const previousScore =
        Number(
            localStorage.getItem(
                "ecoPoints"
            )
        ) || 0;


    const previousCorrect =
        Number(
            localStorage.getItem(
                "sortingCorrect"
            )
        ) || 0;


    const previousPlayed =
        Number(
            localStorage.getItem(
                "sortingPlayed"
            )
        ) || 0;


    localStorage.setItem(
        "ecoPoints",
        previousScore + score
    );


    localStorage.setItem(
        "sortingCorrect",
        previousCorrect + correctAnswers
    );


    localStorage.setItem(
        "sortingPlayed",
        previousPlayed + 10
    );

}


// =========================
// MAIN LAGI
// =========================

function restartGame() {

    currentQuestion = 0;

    score = 0;

    correctAnswers = 0;

    answered = false;


    gameSection.style.display =
        "block";


    gameResult.style.display =
        "none";


    loadQuestion();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =========================
// MULAI
// =========================

loadQuestion();