const questions = [
    {
        question: "Apa arti dari kata Metta?",
        answer: [
            { text: "Kasih sayang", correct: false },
            { text: "Keseimbangan batin", correct: false },
            { text: "Cinta kasih", correct: true },
            { text: "Kebencian", correct: false },
        ],
    },
    {
        question: "Apa yang dimaksud dengan metta?",
        answer: [
            { text: "Cinta kasih ibu kepada anak tunggalnya", correct: false },
            { text: "Cinta kasih universal yang meliputi semua makhluk", correct: true },
            { text: "Belas kasih yang terbatas", correct: false },
            { text: "Kebencian yang mendalam kepada orang lain", correct: false },
        ]
    },
    {
        question: "Manfaat dari mengembangkan Metta termasuk semua hal berikut kecuali?",
        answer: [
            { text: "Peningkatan konflik dalam hubungan", correct: true },
            { text: "Peningkatan empati dan pengertian", correct: false },
            { text: "Tidur yang lebih baik", correct: false },
            { text: "Pengurangan stres dan kecemasan", correct: false },
        ]
    },
    {
        question: "Apa nama sutta yang menjelaskan tentang metta?",
        answer: [
            { text: "Bahuvedaniya Sutta", correct: false },
            { text: "Manggala Sutta", correct: false },
            { text: "Karaniya Metta Sutta", correct: true },
            { text: "Tirokudda Sutta", correct: false }
        ]
    },
    {
        question: "Dalam kehidupan sehari-hari, cara yang bisa dilakukan untuk menerapkan metta adalah dengan?",
        answer: [
            { text: "Melamun setiap hari", correct: false },
            { text: "Berbicara negatif tentang orang lain", correct: false },
            { text: "Bangun pagi setiap hari", correct: false },
            { text: "Berbuat kebaikan kecil setiap hari", correct: true },
        ],
    },
];

const header = document.getElementById('header');
const questionContainer = document.getElementById('question');
const answerContainer = document.getElementById('jawaban');
const nextButton = document.getElementById('next');
const mainMenuButton = document.getElementById('main-menu');
let currentIndex = 0;
let score = 0;

function startQuiz() {
    header.innerHTML = "Latihan Soal";
    currentIndex = 0;
    score = 0;
    nextButton.innerHTML = "Selanjutnya";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentIndex];
    const questionNo = currentIndex + 1;
    questionContainer.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("jwb");
        answerContainer.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerContainer.firstChild) {
        answerContainer.removeChild(answerContainer.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score += 20;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    if (score >= 80) {
        header.innerHTML = `Selamat Anda lulus!`;
        questionContainer.innerHTML = `Skor Anda adalah ${score} dari ${questions.length * 20}`;
    } else {
        header.innerHTML = `Nilai Anda masih kurang, silahkan coba lagi`;
        questionContainer.innerHTML = `Skor Anda adalah ${score} dari ${questions.length * 20}`;
    }
    nextButton.innerHTML = "Mulai lagi";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentIndex++;
    if (currentIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

// mainMenuButton.addEventListener("click"), () => {
//     window.location.href = "../Halaman Utama/Media Pembelajaran.html";
// }

startQuiz();
