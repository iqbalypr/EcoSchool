// =========================
// AMBIL DATA
// =========================

const totalPoints =
    Number(
        localStorage.getItem("ecoPoints")
    ) || 0;


const gamesPlayed =
    Number(
        localStorage.getItem("sortingPlayed")
    ) || 0;


const sortingCorrect =
    Number(
        localStorage.getItem("sortingCorrect")
    ) || 0;


const quizzesPlayed =
    Number(
        localStorage.getItem("quizPlayed")
    ) || 0;


const quizCorrect =
    Number(
        localStorage.getItem("quizCorrect")
    ) || 0;


// =========================
// HITUNG AKURASI
// =========================

let sortingAccuracy = 0;

let quizAccuracy = 0;


if (gamesPlayed > 0) {

    sortingAccuracy =
        Math.round(
            (sortingCorrect /
                gamesPlayed) * 100
        );

}


if (quizzesPlayed > 0) {

    quizAccuracy =
        Math.round(
            (quizCorrect /
                quizzesPlayed) * 100
        );

}


// =========================
// TENTUKAN LEVEL
// =========================

let level = 1;

let levelName = "Eco Beginner";

let levelMin = 0;

let levelMax = 250;


if (totalPoints >= 1000) {

    level = 5;

    levelName = "Eco Hero";

    levelMin = 1000;

    levelMax = 1500;

}

else if (totalPoints >= 750) {

    level = 4;

    levelName = "Eco Explorer";

    levelMin = 750;

    levelMax = 1000;

}

else if (totalPoints >= 500) {

    level = 3;

    levelName = "Ahli Memilah";

    levelMin = 500;

    levelMax = 750;

}

else if (totalPoints >= 250) {

    level = 2;

    levelName = "Eco Learner";

    levelMin = 250;

    levelMax = 500;

}


// =========================
// PROGRESS LEVEL
// =========================

let progress = 0;


if (totalPoints >= 1500) {

    progress = 100;

}

else {

    progress =
        Math.round(
            ((totalPoints - levelMin) /
                (levelMax - levelMin)) * 100
        );

}


if (progress < 0) {
    progress = 0;
}


if (progress > 100) {
    progress = 100;
}


// =========================
// UPDATE DASHBOARD
// =========================

document.getElementById(
    "total-points"
).textContent =
    totalPoints.toLocaleString("id-ID");


document.getElementById(
    "level-name"
).textContent =
    levelName;


document.getElementById(
    "level-number"
).textContent =
    "Level " + level;


document.getElementById(
    "games-played"
).textContent =
    gamesPlayed;


document.getElementById(
    "quizzes-played"
).textContent =
    quizzesPlayed;


document.getElementById(
    "sorting-accuracy"
).textContent =
    sortingAccuracy + "%";


document.getElementById(
    "quiz-accuracy"
).textContent =
    quizAccuracy + "%";


document.getElementById(
    "level-percentage"
).textContent =
    progress + "%";


document.getElementById(
    "dashboard-progress-bar"
).style.width =
    progress + "%";


// =========================
// NEXT LEVEL TEXT
// =========================

const nextLevelText =
    document.getElementById(
        "next-level-text"
    );


if (totalPoints >= 1500) {

    nextLevelText.textContent =
        "Kamu telah mencapai level maksimum! 🏆";

}

else {

    const remaining =
        levelMax - totalPoints;


    nextLevelText.textContent =
        remaining +
        " XP lagi menuju level berikutnya";

}


// =========================
// ACHIEVEMENT
// =========================

let achievementUnlocked = 0;


// ---------------------------------
// FIRST STEP
// ---------------------------------

if (
    gamesPlayed > 0 ||
    quizzesPlayed > 0
) {

    unlockAchievement(
        "achievement-first"
    );

    achievementUnlocked++;

}


// ---------------------------------
// WASTE SORTER
// ---------------------------------

if (
    sortingCorrect >= 10
) {

    unlockAchievement(
        "achievement-sorter"
    );

    achievementUnlocked++;

}


// ---------------------------------
// ECO BRAIN
// ---------------------------------

if (
    quizzesPlayed > 0
) {

    unlockAchievement(
        "achievement-brain"
    );

    achievementUnlocked++;

}


// ---------------------------------
// EARTH GUARDIAN
// ---------------------------------

if (
    quizAccuracy >= 90 &&
    quizzesPlayed >= 10
) {

    unlockAchievement(
        "achievement-guardian"
    );

    achievementUnlocked++;

}


// ---------------------------------
// ECO HERO
// ---------------------------------

if (
    totalPoints >= 1000
) {

    unlockAchievement(
        "achievement-hero"
    );

    achievementUnlocked++;

}


// =========================
// ACHIEVEMENT COUNT
// =========================

document.getElementById(
    "achievement-count"
).textContent =
    achievementUnlocked + "/5";


// =========================
// FUNCTION UNLOCK
// =========================

function unlockAchievement(id) {

    const element =
        document.getElementById(id);


    element.classList.remove(
        "locked"
    );


    element.classList.add(
        "unlocked"
    );

}

const ecoTips = [
    {
        title: "Kurangi Sampah Plastik",
        text: "Bawa botol minum dan tas belanja yang dapat digunakan kembali."
    },
    {
        title: "Pilah Sampah",
        text: "Pisahkan sampah berdasarkan jenisnya agar lebih mudah dikelola."
    },
    {
        title: "Gunakan Kembali",
        text: "Gunakan kembali barang yang masih layak sebelum memutuskan untuk membuangnya."
    },
    {
        title: "Hemat Air",
        text: "Matikan keran saat tidak digunakan dan gunakan air secukupnya."
    },
    {
        title: "Jangan Campur Baterai",
        text: "Baterai bekas termasuk sampah B3 dan membutuhkan penanganan khusus."
    },
    {
        title: "Terapkan 3R",
        text: "Reduce, Reuse, dan Recycle membantu mengurangi jumlah sampah."
    },
    {
        title: "Kurangi Makanan Terbuang",
        text: "Ambil makanan secukupnya agar tidak ada makanan yang terbuang sia-sia."
    }
];

const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)];

document.getElementById("ecoTipTitle").textContent = randomTip.title;
document.getElementById("ecoTipText").textContent = randomTip.text;
// =========================
// ACHIEVEMENT PROGRESS
// =========================

// AHLI MEMILAH
const sorterProgress =
    Math.min(sortingCorrect, 10);

document.getElementById(
    "sorter-progress-text"
).textContent =
    `${sorterProgress}/10`;

document.getElementById(
    "sorter-progress-bar"
).style.width =
    `${sorterProgress * 10}%`;


// PENJAGA BUMI
document.getElementById(
    "guardian-progress-text"
).textContent =
    `${quizAccuracy}%`;

document.getElementById(
    "guardian-progress-bar"
).style.width =
    `${quizAccuracy}%`;


// ECO HERO
const heroProgress =
    Math.min(totalPoints, 1000);

document.getElementById(
    "hero-progress-text"
).textContent =
    `${heroProgress}/1000`;

document.getElementById(
    "hero-progress-bar"
).style.width =
    `${Math.min(
        (heroProgress / 1000) * 100,
        100
    )}%`;
