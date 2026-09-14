// =========================
// KONFIGURASI MODEL
// =========================

const MODEL_PATH = "assets/model/";


// =========================
// ELEMENT HTML
// =========================

const imageUpload =
    document.getElementById("image-upload");

const imagePreview =
    document.getElementById("image-preview");

const imagePreviewContainer =
    document.getElementById("image-preview-container");

const predictButton =
    document.getElementById("predict-button");

const loadingMessage =
    document.getElementById("loading-message");

const resultContainer =
    document.getElementById("result-container");

const resultCategory =
    document.getElementById("result-category");

const resultConfidence =
    document.getElementById("result-confidence");

const resultTitle =
    document.getElementById("result-title");

const resultText =
    document.getElementById("result-text");

const resetScanButton =
    document.getElementById("reset-scan-button");


// =========================
// ELEMENT KAMERA
// =========================

const openCameraButton =
    document.getElementById("open-camera-button");

const closeCameraButton =
    document.getElementById("close-camera-button");

const captureButton =
    document.getElementById("capture-button");

const cameraContainer =
    document.getElementById("camera-container");

const cameraVideo =
    document.getElementById("camera-video");

const cameraCanvas =
    document.getElementById("camera-canvas");


// =========================
// VARIABEL
// =========================

let model = null;

let cameraStream = null;


// =========================
// INFORMASI SAMPAH
// =========================

const wasteInformation = {

    Organik: {
        title: "Sampah Organik 🌿",
        text: "Sampah organik berasal dari makhluk hidup dan dapat terurai secara alami, seperti sisa makanan, kulit buah, dan daun."
    },

    Anorganik: {
        title: "Sampah Anorganik ♻️",
        text: "Sampah anorganik sulit terurai secara alami, tetapi beberapa jenisnya dapat digunakan kembali atau didaur ulang, seperti botol plastik, kaleng, dan kardus."
    },

    B3: {
        title: "Sampah B3 🔋",
        text: "Sampah B3 mengandung bahan berbahaya atau beracun, seperti baterai dan lampu bekas. Sampah ini membutuhkan penanganan khusus."
    },

    Residu: {
        title: "Sampah Residu 🗑️",
        text: "Sampah residu merupakan sampah yang sulit digunakan kembali atau didaur ulang, seperti tisu bekas, popok, dan sampah yang terkontaminasi."
    }

};


// =========================
// LOAD MODEL AI
// =========================

async function loadModel() {

    try {

        model = await tmImage.load(
            MODEL_PATH + "model.json",
            MODEL_PATH + "metadata.json"
        );

        console.log("Model AI berhasil dimuat.");

    } catch (error) {

        console.error(
            "Model AI gagal dimuat:",
            error
        );

        alert(
            "Model AI gagal dimuat. Periksa folder assets/model."
        );

    }

}


// =========================
// TAMPILKAN GAMBAR
// =========================

function showImagePreview(imageSource) {

    imagePreview.src = imageSource;

    imagePreviewContainer.classList.add("show");

    predictButton.disabled = false;

    resultContainer.hidden = true;

}


// =========================
// UPLOAD GAMBAR
// =========================

imageUpload.addEventListener(
    "change",
    function (event) {

        const file =
            event.target.files[0];

        if (!file) {
            return;
        }

        const reader =
            new FileReader();

        reader.onload = function (event) {

            showImagePreview(
                event.target.result
            );

        };

        reader.readAsDataURL(file);

    }
);


// =========================
// BUKA KAMERA
// =========================

openCameraButton.addEventListener(
    "click",
    async function () {

        try {

            cameraStream =
                await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: "environment"
                    },
                    audio: false
                });

            cameraVideo.srcObject =
                cameraStream;

            cameraContainer.hidden = false;

            openCameraButton.disabled = true;

        } catch (error) {

            console.error(
                "Kamera tidak dapat dibuka:",
                error
            );

            alert(
                "Kamera tidak dapat dibuka. Pastikan izin kamera sudah diberikan."
            );

        }

    }
);


// =========================
// AMBIL FOTO DARI KAMERA
// =========================

captureButton.addEventListener(
    "click",
    function () {

        if (!cameraStream) {
            return;
        }

        cameraCanvas.width =
            cameraVideo.videoWidth;

        cameraCanvas.height =
            cameraVideo.videoHeight;

        const context =
            cameraCanvas.getContext("2d");

        context.drawImage(
            cameraVideo,
            0,
            0,
            cameraCanvas.width,
            cameraCanvas.height
        );

        const capturedImage =
            cameraCanvas.toDataURL("image/jpeg");

        showImagePreview(
            capturedImage
        );

        closeCamera();

    }
);


// =========================
// TUTUP KAMERA
// =========================

closeCameraButton.addEventListener(
    "click",
    function () {

        closeCamera();

    }
);


function closeCamera() {

    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(function (track) {
                track.stop();
            });

        cameraStream = null;

    }

    cameraVideo.srcObject = null;

    cameraContainer.hidden = true;

    openCameraButton.disabled = false;

}


// =========================
// DETEKSI GAMBAR
// =========================

predictButton.addEventListener(
    "click",
    async function () {

        if (!model || !imagePreview.src) {

            alert(
                "Model atau gambar belum siap."
            );

            return;

        }

        loadingMessage.hidden = false;

        predictButton.disabled = true;

        resultContainer.hidden = true;

        try {

            const predictions =
                await model.predict(imagePreview);

            predictions.sort(
                function (a, b) {
                    return b.probability - a.probability;
                }
            );

            const bestPrediction =
                predictions[0];

            const category =
                bestPrediction.className;

            const confidence =
                Math.round(
                    bestPrediction.probability * 100
                );

            resultCategory.textContent =
                category;

            resultConfidence.textContent =
                "Tingkat keyakinan: " +
                confidence +
                "%";

            if (wasteInformation[category]) {

                resultTitle.textContent =
                    wasteInformation[category].title;

                resultText.textContent =
                    wasteInformation[category].text;

            } else {

                resultTitle.textContent =
                    "Informasi Sampah";

                resultText.textContent =
                    "Jenis sampah berhasil diprediksi oleh model AI.";

            }

            resultContainer.hidden = false;

        } catch (error) {

            console.error(
                "Terjadi kesalahan saat mendeteksi:",
                error
            );

            alert(
                "Terjadi kesalahan saat mendeteksi gambar."
            );

        }

        loadingMessage.hidden = true;

        predictButton.disabled = false;

    }
);


// =========================
// RESET SCAN
// =========================

resetScanButton.addEventListener(
    "click",
    function () {

        imageUpload.value = "";

        imagePreview.src = "";

        imagePreviewContainer.classList.remove(
            "show"
        );

        resultContainer.hidden = true;

        predictButton.disabled = true;

    }
);


// =========================
// JALANKAN MODEL
// =========================

loadModel();