// =========================
// DATA QUIZ
// =========================

const quizQuestions = [

    {
        category: "SAMPAH ORGANIK",

        question:
            "Sampah organik dapat dimanfaatkan menjadi...",

        options: [
            "Kompos",
            "Plastik",
            "Kaca",
            "Besi"
        ],

        answer: 0,

        explanation:
            "Sampah organik seperti sisa makanan dan daun dapat diolah menjadi kompos."
    },


    {
        category: "DAUR ULANG",

        question:
            "Manakah yang termasuk sampah yang dapat didaur ulang?",

        options: [
            "Sisa makanan",
            "Botol plastik",
            "Tisu bekas",
            "Popok bekas"
        ],

        answer: 1,

        explanation:
            "Botol plastik merupakan salah satu jenis sampah yang dapat didaur ulang setelah dipilah dan diproses dengan tepat."
    },


    {
        category: "LINGKUNGAN",

        question:
            "Apa tujuan utama melakukan pemilahan sampah?",

        options: [
            "Membuat sampah lebih banyak",
            "Memudahkan pengelolaan sampah",
            "Membuat sampah lebih berat",
            "Mengurangi tempat sampah"
        ],

        answer: 1,

        explanation:
            "Pemilahan membantu sampah dikelola sesuai jenisnya sehingga sampah yang masih bernilai dapat dimanfaatkan atau didaur ulang."
    },


    {
        category: "GAYA HIDUP",

        question:
            "Manakah tindakan yang paling membantu mengurangi sampah plastik?",

        options: [
            "Menggunakan botol minum sekali pakai",
            "Membakar semua plastik",
            "Menggunakan botol minum yang dapat digunakan kembali",
            "Membuang plastik ke sungai"
        ],

        answer: 2,

        explanation:
            "Menggunakan barang yang dapat dipakai berulang kali dapat mengurangi penggunaan plastik sekali pakai."
    },


    {
        category: "SAMPAH B3",

        question:
            "Mengapa sampah B3 membutuhkan penanganan khusus?",

        options: [
            "Karena selalu berwarna merah",
            "Karena dapat mengandung bahan berbahaya",
            "Karena mudah dimakan",
            "Karena selalu berbentuk cair"
        ],

        answer: 1,

        explanation:
            "Sampah B3 dapat mengandung bahan berbahaya dan beracun sehingga perlu dikelola dengan cara yang tepat."
    },


    {
        category: "HEMAT ENERGI",

        question:
            "Manakah kebiasaan yang dapat membantu menghemat energi?",

        options: [
            "Menyalakan lampu sepanjang hari",
            "Membiarkan televisi menyala tanpa digunakan",
            "Mematikan lampu ketika tidak diperlukan",
            "Membiarkan charger terus terpasang"
        ],

        answer: 2,

        explanation:
            "Mematikan lampu dan peralatan elektronik ketika tidak digunakan dapat membantu menghemat energi."
    },


    {
        category: "AIR",

        question:
            "Manakah tindakan yang tepat untuk menghemat air?",

        options: [
            "Membiarkan keran terbuka",
            "Mematikan keran setelah digunakan",
            "Membiarkan air mengalir tanpa digunakan",
            "Menggunakan air sebanyak mungkin"
        ],

        answer: 1,

        explanation:
            "Mematikan keran setelah digunakan dapat mengurangi pemborosan air."
    },


    {
        category: "SAMPAH RESIDU",

        question:
            "Apa yang dimaksud dengan sampah residu?",

        options: [
            "Sampah yang mudah menjadi kompos",
            "Sampah yang dapat dimakan",
            "Sampah yang sulit digunakan kembali atau didaur ulang",
            "Sampah yang selalu berupa daun"
        ],

        answer: 2,

        explanation:
            "Sampah residu adalah sampah yang tersisa setelah upaya pengurangan, penggunaan kembali, dan daur ulang dilakukan."
    },


    {
        category: "3R",

        question:
            "Apa kepanjangan dari konsep 3R dalam pengelolaan sampah?",

        options: [
            "Reduce, Reuse, Recycle",
            "Read, Run, Rest",
            "Remove, Return, Repeat",
            "Reduce, Repair, Replace"
        ],

        answer: 0,

        explanation:
            "3R berarti Reduce (mengurangi), Reuse (menggunakan kembali), dan Recycle (mendaur ulang)."
    },


    {
        category: "LINGKUNGAN",

        question:
            "Apa manfaat menjaga kebersihan lingkungan?",

        options: [
            "Meningkatkan jumlah sampah",
            "Mengurangi kualitas udara",
            "Menciptakan lingkungan yang lebih sehat",
            "Membuat lingkungan lebih kotor"
        ],

        answer: 2,

        explanation:
            "Lingkungan yang bersih dapat membantu menciptakan kondisi yang lebih sehat dan nyaman bagi manusia."
    }

];


// =========================
// VARIABEL
// =========================

let currentQuiz = 0;

let quizScore = 0;

let quizCorrect = 0;

let quizAnswered = false;


// =========================
// ELEMENT
// =========================

const quizNumber =
    document.getElementById("quiz-number");

const quizScoreDisplay =
    document.getElementById("quiz-score");

const quizProgressBar =
    document.getElementById("quiz-progress-bar");

const quizCategory =
    document.getElementById("quiz-category");

const quizQuestion =
    document.getElementById("quiz-question");

const quizAnswers =
    document.querySelectorAll(".quiz-answer");

const quizFeedback =
    document.getElementById("quiz-feedback");

const quizFeedbackIcon =
    document.getElementById("quiz-feedback-icon");

const quizFeedbackTitle =
    document.getElementById("quiz-feedback-title");

const quizFeedbackText =
    document.getElementById("quiz-feedback-text");

const quizSection =
    document.querySelector(".quiz-section");

const quizResult =
    document.getElementById("quiz-result");


// =========================
// LOAD QUIZ
// =========================

function loadQuizQuestion() {

    const question =
        quizQuestions[currentQuiz];


    quizNumber.textContent =
        currentQuiz + 1;


    quizScoreDisplay.textContent =
        quizScore;


    quizCategory.textContent =
        question.category;


    quizQuestion.textContent =
        question.question;


    question.options.forEach(
        function(option, index) {

            quizAnswers[index].textContent =
                option;

            quizAnswers[index].disabled =
                false;

            quizAnswers[index].classList.remove(
                "correct",
                "wrong"
            );

        }
    );


    const progress =
        ((currentQuiz + 1) /
            quizQuestions.length) * 100;


    quizProgressBar.style.width =
        progress + "%";


    quizFeedback.style.display =
        "none";


    quizAnswered = false;

}


// =========================
// PILIH JAWABAN
// =========================

function selectAnswer(selectedIndex) {

    if (quizAnswered) {
        return;
    }


    quizAnswered = true;


    const question =
        quizQuestions[currentQuiz];


    quizAnswers.forEach(
        function(button) {

            button.disabled = true;

        }
    );


    if (
        selectedIndex ===
        question.answer
    ) {

        quizScore += 100;

        quizCorrect++;


        quizAnswers[selectedIndex]
            .classList.add("correct");


        quizFeedbackIcon.textContent =
            "🎉";


        quizFeedbackTitle.textContent =
            "Jawaban Benar!";


        quizFeedbackText.textContent =
            question.explanation +
            " Kamu mendapatkan +100 Eco Points.";

    }

    else {

        quizAnswers[selectedIndex]
            .classList.add("wrong");


        quizAnswers[question.answer]
            .classList.add("correct");


        quizFeedbackIcon.textContent =
            "💡";


        quizFeedbackTitle.textContent =
            "Belum Tepat";


        quizFeedbackText.textContent =
            question.explanation;

    }


    quizScoreDisplay.textContent =
        quizScore;


    quizFeedback.style.display =
        "block";


    quizFeedback.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


// =========================
// SOAL BERIKUTNYA
// =========================

function nextQuizQuestion() {

    currentQuiz++;


    if (
        currentQuiz >=
        quizQuestions.length
    ) {

        finishQuiz();

        return;

    }


    loadQuizQuestion();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =========================
// SELESAI QUIZ
// =========================

function finishQuiz() {

    quizSection.style.display =
        "none";


    quizResult.style.display =
        "block";


    const finalScore =
        quizCorrect * 10;


    const accuracy =
        (quizCorrect /
            quizQuestions.length) * 100;


    document.getElementById(
        "quiz-final-score"
    ).textContent =
        finalScore + "/100";


    document.getElementById(
        "quiz-correct"
    ).textContent =
        quizCorrect + "/10";


    document.getElementById(
        "quiz-accuracy"
    ).textContent =
        accuracy + "%";


    document.getElementById(
        "quiz-earned-xp"
    ).textContent =
        "+" + quizScore + " Eco Points";


    saveQuizProgress();


    quizResult.scrollIntoView({
        behavior: "smooth"
    });

}


// =========================
// SIMPAN PROGRESS
// =========================

function saveQuizProgress() {

    const previousScore =
        Number(
            localStorage.getItem(
                "ecoPoints"
            )
        ) || 0;


    const previousCorrect =
        Number(
            localStorage.getItem(
                "quizCorrect"
            )
        ) || 0;


    const previousPlayed =
        Number(
            localStorage.getItem(
                "quizPlayed"
            )
        ) || 0;


    localStorage.setItem(
        "ecoPoints",
        previousScore + quizScore
    );


    localStorage.setItem(
        "quizCorrect",
        previousCorrect + quizCorrect
    );


    localStorage.setItem(
        "quizPlayed",
        previousPlayed + 10
    );

}


// =========================
// ULANGI QUIZ
// =========================

function restartQuiz() {

    currentQuiz = 0;

    quizScore = 0;

    quizCorrect = 0;

    quizAnswered = false;


    quizSection.style.display =
        "block";


    quizResult.style.display =
        "none";


    loadQuizQuestion();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =========================
// MULAI
// =========================

loadQuizQuestion();