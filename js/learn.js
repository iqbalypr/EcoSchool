const wasteData = {

    organik: {

        icon: "🌱",

        category: "KATEGORI SAMPAH",

        title: "Sampah Organik",

        description:
            "Sampah organik adalah sampah yang berasal dari makhluk hidup dan dapat terurai secara alami oleh mikroorganisme.",

        examples: [
            "Sisa makanan",
            "Kulit buah",
            "Daun kering",
            "Ranting"
        ],

        fact:
            "Sampah organik dapat diolah menjadi kompos yang bermanfaat untuk tanaman.",

        tip:
            "Pisahkan sisa makanan dan daun dari sampah lainnya agar lebih mudah diolah menjadi kompos."

    },


    anorganik: {

        icon: "♻️",

        category: "KATEGORI SAMPAH",

        title: "Sampah Anorganik",

        description:
            "Sampah anorganik merupakan sampah yang sulit terurai secara alami, tetapi sebagian dapat digunakan kembali atau didaur ulang.",

        examples: [
            "Botol plastik",
            "Kaleng minuman",
            "Kardus",
            "Botol kaca"
        ],

        fact:
            "Beberapa jenis sampah anorganik dapat didaur ulang menjadi produk baru.",

        tip:
            "Bersihkan dan pisahkan sampah yang dapat didaur ulang sebelum membuangnya."

    },


    b3: {

        icon: "⚠️",

        category: "KATEGORI SAMPAH",

        title: "Sampah B3",

        description:
            "Sampah B3 adalah sampah yang mengandung bahan berbahaya dan beracun sehingga membutuhkan penanganan khusus.",

        examples: [
            "Baterai bekas",
            "Lampu tertentu",
            "Kemasan bahan kimia",
            "Obat-obatan tertentu"
        ],

        fact:
            "Sampah B3 tidak boleh dibuang sembarangan karena dapat mencemari lingkungan dan membahayakan kesehatan.",

        tip:
            "Jangan mencampurkan sampah B3 dengan sampah rumah tangga biasa. Serahkan kepada tempat pengelolaan yang sesuai."

    },


    residu: {

        icon: "🗑️",

        category: "KATEGORI SAMPAH",

        title: "Sampah Residu",

        description:
            "Sampah residu adalah sampah yang tidak dapat digunakan kembali atau didaur ulang dengan mudah.",

        examples: [
            "Tisu bekas",
            "Popok sekali pakai",
            "Kemasan tertentu",
            "Sampah yang sudah terkontaminasi"
        ],

        fact:
            "Sampah residu biasanya menjadi bagian sampah yang harus dibuang setelah berbagai upaya pengurangan dan daur ulang dilakukan.",

        tip:
            "Kurangi jumlah sampah residu dengan memilih produk yang dapat digunakan kembali atau didaur ulang."

    }

};


function showWasteInfo(category) {

    const data = wasteData[category];


    document.getElementById(
        "waste-info-icon"
    ).textContent = data.icon;


    document.getElementById(
        "waste-info-category"
    ).textContent = data.category;


    document.getElementById(
        "waste-info-title"
    ).textContent = data.title;


    document.getElementById(
        "waste-info-description"
    ).textContent = data.description;


    const exampleList =
        document.getElementById(
            "waste-info-examples"
        );


    exampleList.innerHTML = "";


    data.examples.forEach(
        function(example) {

            const li =
                document.createElement("li");

            li.textContent = example;

            exampleList.appendChild(li);

        }
    );


    document.getElementById(
        "waste-info-fact"
    ).textContent = data.fact;


    document.getElementById(
        "waste-info-tip"
    ).textContent = data.tip;


    const infoSection =
        document.getElementById(
            "waste-info"
        );


    infoSection.style.display = "block";


    infoSection.scrollIntoView({
        behavior: "smooth"
    });

}


function closeWasteInfo() {

    document.getElementById(
        "waste-info"
    ).style.display = "none";

}