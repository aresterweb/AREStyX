/* =========================================================
   AREStyx MAIN SCRIPT
   Stage 3.2

   Main Website Engine
   Powered by ARESTER GROUP
========================================================= */

"use strict";


/* =========================================================
   ELEMENTS
========================================================= */

const header =
    document.getElementById("header");

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const languageButton =
    document.getElementById("languageButton");

const toolSearch =
    document.getElementById("toolSearch");

const allToolsGrid =
    document.getElementById("allToolsGrid");

const toolResultCount =
    document.getElementById("toolResultCount");

const backToTop =
    document.getElementById("backToTop");

const currentYear =
    document.getElementById("currentYear");

const categoryButtons =
    document.querySelectorAll("[data-category]");

const filterButtons =
    document.querySelectorAll("[data-filter]");

const footerCategoryLinks =
    document.querySelectorAll("[data-footer-category]");

const emptyState =
    document.getElementById("emptyState");


/* =========================================================
   GLOBAL STATE
========================================================= */

let currentLanguage = "id";

let currentCategory = "all";

let currentSearch = "";


/* =========================================================
   STATIC PAGE TRANSLATIONS

   The tool catalog already stores Indonesian and English
   strings. This map covers the fixed homepage copy without
   requiring changes to index.html.
========================================================= */

const pageTextTranslations =
    Object.freeze({

        "Donasi":
            "Donate",

        "Semua Tools Yang Kamu Butuhkan":
            "All the Tools You Need",

        "Dalam Satu Tempat":
            "In One Place",

        "AREStyx menyediakan berbagai tools online gratis yang cepat, aman, sederhana dan dapat digunakan langsung melalui browser tanpa perlu instalasi.":
            "AREStyx provides a wide range of fast, secure and simple free online tools that work directly in your browser with no installation required.",

        "Jelajahi Tools":
            "Browse Tools",

        "Lihat Kategori":
            "View Categories",

        "Gratis":
            "Free",

        "Tersedia":
            "Available",

        "Langsung dari browser":
            "Directly in your browser",

        "CEPAT":
            "FAST",

        "Tanpa proses rumit":
            "No complicated process",

        "AMAN":
            "SECURE",

        "Privasi lebih terjaga":
            "Better privacy protection",

        "LENGKAP":
            "COMPLETE",

        "110+ tools dan terus bertambah":
            "110+ tools and growing",

        "Tools Populer":
            "Popular Tools",

        "Beberapa tools yang paling sering dibutuhkan.":
            "Some of the most frequently needed tools.",

        "Semua Tools →":
            "All Tools →",

        "Kalkulator cepat untuk perhitungan sehari-hari.":
            "A fast calculator for everyday calculations.",

        "Hitung persentase dengan cepat dan mudah.":
            "Calculate percentages quickly and easily.",

        "Konversi berbagai jenis satuan dengan mudah.":
            "Convert different types of units with ease.",

        "Hitung kata, karakter, kalimat dan paragraf.":
            "Count words, characters, sentences and paragraphs.",

        "Hitung umur berdasarkan tanggal lahir.":
            "Calculate age based on a date of birth.",

        "Buat password acak yang kuat dan aman.":
            "Generate a strong and secure random password.",

        "Temukan Tools Berdasarkan Kategori":
            "Find Tools by Category",

        "Pilih kategori tools sesuai kebutuhanmu.":
            "Choose a tool category based on your needs.",

        "Perhitungan umum dan matematika":
            "General calculations and mathematics",

        "Konversi satuan dan data":
            "Unit and data conversions",

        "Pengolahan dan analisis teks":
            "Text processing and analysis",

        "Edit dan konversi gambar":
            "Image editing and conversion",

        "Utility untuk coding dan web":
            "Utilities for coding and the web",

        "Generate data secara instan":
            "Generate data instantly",

        "Kalkulator keuangan":
            "Financial calculators",

        "Tools teknik dan marine":
            "Engineering and marine tools",

        "Semua Tools":
            "All Tools",

        "Jelajahi seluruh koleksi tools AREStyx.":
            "Explore the complete AREStyx tool collection.",

        "Semua":
            "All",

        "Menampilkan":
            "Showing",

        "Tools tidak ditemukan":
            "No tools found",

        "Coba gunakan kata pencarian atau kategori yang berbeda.":
            "Try a different search term or category.",

        "Tools Sederhana.":
            "Simple Tools.",

        "Produktivitas Lebih Besar.":
            "Greater Productivity.",

        "AREStyx adalah platform utilitas digital yang menyatukan berbagai tools online dalam satu tempat. Tujuannya sederhana: membuat pekerjaan sehari-hari, perhitungan, konversi, pengolahan teks, kebutuhan developer dan engineering menjadi lebih cepat tanpa proses yang rumit.":
            "AREStyx is a digital utility platform that brings a wide range of online tools together in one place. Its goal is simple: to make everyday tasks, calculations, conversions, text processing, developer work and engineering needs faster without complicated steps.",

        "Versi ini menyediakan 110 tools yang benar-benar memiliki implementasi, dan sebagian besar pemrosesan dilakukan langsung di browser pengguna. AREStyx tidak bergantung pada tracker pihak ketiga untuk menjalankan fungsi utamanya.":
            "This version provides 110 fully implemented tools, with most processing performed directly in the user's browser. AREStyx does not rely on third-party trackers for its core functions.",

        "Kami akan terus memperluas katalog secara bertahap dengan prinsip yang sama: stabilitas lebih dulu, lalu keamanan, fungsi yang nyata, performa, SEO dan tampilan. AREStyx dikembangkan sebagai bagian dari ekosistem ARESTER GROUP.":
            "We will continue expanding the catalog gradually with the same priorities: stability first, followed by security, real functionality, performance, SEO and design. AREStyx is developed as part of the ARESTER GROUP ecosystem.",

        "DUKUNG PENGEMBANGAN":
            "SUPPORT DEVELOPMENT",

        "Bantu AREStyx Terus Berkembang":
            "Help AREStyx Keep Growing",

        "AREStyx dibangun untuk menyediakan tools online yang gratis, cepat, aman dan mudah digunakan. Dukungan sukarela membantu pengembangan fitur baru, pemeliharaan, pengujian, serta peningkatan kualitas platform tanpa mengurangi akses gratis bagi pengguna.":
            "AREStyx was built to provide free, fast, secure and easy-to-use online tools. Voluntary support helps fund new features, maintenance, testing and platform improvements while keeping access free for users.",

        "Donasi bersifat sukarela. Gunakan aplikasi pembayaran yang mendukung QRIS dan selalu periksa detail penerima sebelum menyelesaikan pembayaran.":
            "Donations are voluntary. Use a payment app that supports QRIS and always verify the recipient details before completing a payment.",

        "Scan QRIS untuk dukungan sukarela":
            "Scan QRIS to make a voluntary contribution",

        "Satu Platform.":
            "One Platform.",

        "Ratusan Tools.":
            "Hundreds of Tools.",

        "Temukan tools yang kamu butuhkan dan gunakan secara gratis.":
            "Find the tools you need and use them for free.",

        "Mulai Sekarang":
            "Get Started",

        "Kumpulan tools online gratis untuk kebutuhan sehari-hari, produktivitas, developer, finance dan engineering.":
            "A collection of free online tools for everyday tasks, productivity, development, finance and engineering.",

        "Cari tools...":
            "Search tools...",

        "Cari tools":
            "Search tools",

        "Buka Calculator":
            "Open Calculator",

        "Buka Percentage Calculator":
            "Open Percentage Calculator",

        "Buka Unit Converter":
            "Open Unit Converter",

        "Buka Word Counter":
            "Open Word Counter",

        "Buka Age Calculator":
            "Open Age Calculator",

        "Buka Password Generator":
            "Open Password Generator"

    });


const pageEnglishToIndonesian =
    Object.freeze(
        Object.fromEntries(
            Object.entries(
                pageTextTranslations
            )
                .map(
                    ([indonesian, english]) =>
                        [english, indonesian]
                )
        )
    );


const pageTextSources =
    new WeakMap();

const pageAttributeSources =
    new WeakMap();


function normalizePageText(value) {

    return String(value || "")
        .replace(/\s+/g, " ")
        .trim();

}


function preservePageTextSpacing(
    original,
    replacement
) {

    const leading =
        String(original || "")
            .match(/^\s*/)?.[0] || "";

    const trailing =
        String(original || "")
            .match(/\s*$/)?.[0] || "";


    return (
        leading +
        replacement +
        trailing
    );

}


function getPageSourceText(value) {

    const normalized =
        normalizePageText(value);


    if (
        Object.prototype.hasOwnProperty.call(
            pageTextTranslations,
            normalized
        )
    ) {

        return normalized;

    }


    return (
        pageEnglishToIndonesian[
            normalized
        ] ||
        ""
    );

}


function applyStaticPageLanguage() {

    const walker =
        document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT
        );

    let node =
        walker.nextNode();


    while (node) {

        const parentTag =
            node.parentElement?.tagName;


        if (
            parentTag !== "SCRIPT" &&
            parentTag !== "STYLE" &&
            parentTag !== "NOSCRIPT"
        ) {

            let source =
                pageTextSources.get(
                    node
                );


            if (!source) {

                source =
                    getPageSourceText(
                        node.nodeValue
                    );


                if (source) {

                    pageTextSources.set(
                        node,
                        source
                    );

                }

            }


            if (source) {

                node.nodeValue =
                    preservePageTextSpacing(
                        node.nodeValue,
                        currentLanguage === "en"
                            ? pageTextTranslations[
                                source
                            ]
                            : source
                    );

            }

        }


        node =
            walker.nextNode();

    }


    document
        .querySelectorAll(
            "[placeholder], [aria-label], [title]"
        )
        .forEach(
            element => {

                let sources =
                    pageAttributeSources.get(
                        element
                    );


                if (!sources) {

                    sources = {};

                    pageAttributeSources.set(
                        element,
                        sources
                    );

                }


                [
                    "placeholder",
                    "aria-label",
                    "title"
                ]
                    .forEach(
                        attribute => {

                            if (
                                !element.hasAttribute(
                                    attribute
                                )
                            ) {
                                return;
                            }


                            if (!sources[attribute]) {

                                sources[attribute] =
                                    getPageSourceText(
                                        element.getAttribute(
                                            attribute
                                        )
                                    );

                            }


                            const source =
                                sources[attribute];


                            if (!source) {
                                return;
                            }


                            element.setAttribute(
                                attribute,
                                currentLanguage === "en"
                                    ? pageTextTranslations[
                                        source
                                    ]
                                    : source
                            );

                        }
                    );

            }
        );

}


/* =========================================================
   TOOL DATABASE
========================================================= */

const baselineTools = [

    /* =====================================================
       CALCULATOR
    ===================================================== */

    {
        id: "calculator",
        category: "calculator",
        icon: "+",
        title: {
            id: "Kalkulator",
            en: "Calculator"
        },
        description: {
            id: "Kalkulator cepat untuk perhitungan sehari-hari.",
            en: "Fast calculator for everyday calculations."
        }
    },

    {
        id: "percentage-calculator",
        category: "calculator",
        icon: "%",
        title: {
            id: "Kalkulator Persentase",
            en: "Percentage Calculator"
        },
        description: {
            id: "Hitung nilai persentase dengan cepat.",
            en: "Calculate percentage values quickly."
        }
    },

    {
        id: "age-calculator",
        category: "calculator",
        icon: "⌛",
        title: {
            id: "Kalkulator Umur",
            en: "Age Calculator"
        },
        description: {
            id: "Hitung umur berdasarkan tanggal lahir.",
            en: "Calculate age based on date of birth."
        }
    },

    {
        id: "bmi-calculator",
        category: "calculator",
        icon: "BMI",
        title: {
            id: "Kalkulator BMI",
            en: "BMI Calculator"
        },
        description: {
            id: "Hitung indeks massa tubuh dari berat dan tinggi.",
            en: "Calculate body mass index from weight and height."
        }
    },

    {
        id: "date-calculator",
        category: "calculator",
        icon: "▣",
        title: {
            id: "Kalkulator Tanggal",
            en: "Date Calculator"
        },
        description: {
            id: "Hitung selisih antara dua tanggal.",
            en: "Calculate the difference between two dates."
        }
    },

    {
        id: "time-calculator",
        category: "calculator",
        icon: "◷",
        title: {
            id: "Kalkulator Waktu",
            en: "Time Calculator"
        },
        description: {
            id: "Hitung durasi antara dua waktu.",
            en: "Calculate duration between two times."
        }
    },

    {
        id: "average-calculator",
        category: "calculator",
        icon: "∑",
        title: {
            id: "Kalkulator Rata-rata",
            en: "Average Calculator"
        },
        description: {
            id: "Hitung nilai rata-rata dari sejumlah angka.",
            en: "Calculate the average of multiple numbers."
        }
    },

    {
        id: "discount-calculator",
        category: "calculator",
        icon: "%",
        title: {
            id: "Kalkulator Diskon",
            en: "Discount Calculator"
        },
        description: {
            id: "Hitung harga setelah diskon.",
            en: "Calculate price after discount."
        }
    },

    {
        id: "ratio-calculator",
        category: "calculator",
        icon: ":",
        title: {
            id: "Kalkulator Rasio",
            en: "Ratio Calculator"
        },
        description: {
            id: "Hitung dan sederhanakan perbandingan angka.",
            en: "Calculate and simplify number ratios."
        }
    },

    {
        id: "scientific-calculator",
        category: "calculator",
        icon: "ƒ",
        title: {
            id: "Kalkulator Ilmiah",
            en: "Scientific Calculator"
        },
        description: {
            id: "Operasi matematika ilmiah dan lanjutan.",
            en: "Scientific and advanced mathematical operations."
        }
    },


    /* =====================================================
       CONVERTER
    ===================================================== */

    {
        id: "unit-converter",
        category: "converter",
        icon: "⇄",
        title: {
            id: "Konverter Satuan",
            en: "Unit Converter"
        },
        description: {
            id: "Konversi berbagai jenis satuan dalam satu tool.",
            en: "Convert many types of units in one tool."
        }
    },

    {
        id: "length-converter",
        category: "converter",
        icon: "↔",
        title: {
            id: "Konverter Panjang",
            en: "Length Converter"
        },
        description: {
            id: "Konversi meter, kilometer, mil, kaki dan lainnya.",
            en: "Convert meters, kilometers, miles, feet and more."
        }
    },

    {
        id: "weight-converter",
        category: "converter",
        icon: "⚖",
        title: {
            id: "Konverter Berat",
            en: "Weight Converter"
        },
        description: {
            id: "Konversi kilogram, gram, pound dan lainnya.",
            en: "Convert kilograms, grams, pounds and more."
        }
    },

    {
        id: "temperature-converter",
        category: "converter",
        icon: "℃",
        title: {
            id: "Konverter Suhu",
            en: "Temperature Converter"
        },
        description: {
            id: "Konversi Celsius, Fahrenheit dan Kelvin.",
            en: "Convert Celsius, Fahrenheit and Kelvin."
        }
    },

    {
        id: "area-converter",
        category: "converter",
        icon: "□",
        title: {
            id: "Konverter Luas",
            en: "Area Converter"
        },
        description: {
            id: "Konversi berbagai satuan luas.",
            en: "Convert various area units."
        }
    },

    {
        id: "volume-converter",
        category: "converter",
        icon: "▣",
        title: {
            id: "Konverter Volume",
            en: "Volume Converter"
        },
        description: {
            id: "Konversi liter, meter kubik, gallon dan lainnya.",
            en: "Convert liters, cubic meters, gallons and more."
        }
    },

    {
        id: "speed-converter",
        category: "converter",
        icon: "➜",
        title: {
            id: "Konverter Kecepatan",
            en: "Speed Converter"
        },
        description: {
            id: "Konversi km/h, m/s, mph dan knot.",
            en: "Convert km/h, m/s, mph and knots."
        }
    },

    {
        id: "pressure-converter",
        category: "converter",
        icon: "P",
        title: {
            id: "Konverter Tekanan",
            en: "Pressure Converter"
        },
        description: {
            id: "Konversi Pascal, bar, PSI dan atmosphere.",
            en: "Convert Pascal, bar, PSI and atmosphere."
        }
    },

    {
        id: "energy-converter",
        category: "converter",
        icon: "⚡",
        title: {
            id: "Konverter Energi",
            en: "Energy Converter"
        },
        description: {
            id: "Konversi Joule, kWh, kalori dan BTU.",
            en: "Convert Joules, kWh, calories and BTU."
        }
    },

    {
        id: "data-storage-converter",
        category: "converter",
        icon: "◫",
        title: {
            id: "Konverter Penyimpanan Data",
            en: "Data Storage Converter"
        },
        description: {
            id: "Konversi Byte, KB, MB, GB, TB dan PB.",
            en: "Convert Byte, KB, MB, GB, TB and PB."
        }
    },


    /* =====================================================
       TEXT
    ===================================================== */

    {
        id: "word-counter",
        category: "text",
        icon: "T",
        title: {
            id: "Penghitung Kata",
            en: "Word Counter"
        },
        description: {
            id: "Hitung kata, karakter, kalimat dan paragraf.",
            en: "Count words, characters, sentences and paragraphs."
        }
    },


    /* =====================================================
       GENERATOR
    ===================================================== */

    {
        id: "password-generator",
        category: "generator",
        icon: "*",
        title: {
            id: "Generator Password",
            en: "Password Generator"
        },
        description: {
            id: "Buat password acak yang kuat.",
            en: "Generate strong random passwords."
        }
    },


    /* =====================================================
       ENGINEERING
    ===================================================== */

    {
        id: "fuel-consumption-calculator",
        category: "engineering",
        icon: "⛽",
        title: {
            id: "Kalkulator Konsumsi Bahan Bakar",
            en: "Fuel Consumption Calculator"
        },
        description: {
            id: "Hitung rata-rata konsumsi bahan bakar per jam.",
            en: "Calculate average fuel consumption per hour."
        }
    },

    {
        id: "ohms-law-calculator",
        category: "engineering",
        icon: "Ω",
        title: {
            id: "Kalkulator Hukum Ohm",
            en: "Ohm's Law Calculator"
        },
        description: {
            id: "Hitung voltage, current atau resistance.",
            en: "Calculate voltage, current or resistance."
        }
    }

];


const tools =
    Array.isArray(window.AREStyxToolCatalog) &&
    window.AREStyxToolCatalog.length
        ? window.AREStyxToolCatalog
        : baselineTools;


/* =========================================================
   OPEN TOOL
========================================================= */

function openTool(toolId) {

    if (!toolId) {
        return;
    }

    window.location.href =
        `tools/${encodeURIComponent(toolId)}.html`;

}


/* =========================================================
   CREATE TOOL CARD
========================================================= */

function createToolCard(tool) {

    const title =
        tool.title[currentLanguage];

    const description =
        tool.description[currentLanguage];

    const card =
        document.createElement("article");

    card.className =
        "tool-card";

    card.dataset.toolId =
        tool.id;

    card.dataset.category =
        tool.category;

    card.tabIndex = 0;

    card.setAttribute(
        "role",
        "button"
    );

    card.setAttribute(
        "aria-label",
        title
    );


    card.innerHTML = `

        <div class="tool-card-icon">
            ${tool.icon}
        </div>

        <div class="tool-card-content">

            <h3 class="tool-card-title">
                ${title}
            </h3>

            <p class="tool-card-description">
                ${description}
            </p>

        </div>

        <div class="tool-card-action">

            <span>
                ${
                    currentLanguage === "id"
                        ? "Buka Tool"
                        : "Open Tool"
                }
            </span>

            <span>
                →
            </span>

        </div>

    `;


    card.addEventListener(
        "click",
        () => {

            openTool(
                tool.id
            );

        }
    );


    card.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openTool(
                    tool.id
                );

            }

        }
    );


    return card;

}


/* =========================================================
   FILTER TOOLS
========================================================= */

function getFilteredTools() {

    return tools.filter(
        tool => {

            const categoryMatch =
                currentCategory === "all" ||
                tool.category === currentCategory;


            const query =
                currentSearch
                    .trim()
                    .toLowerCase();


            if (!query) {

                return categoryMatch;

            }


            const searchable =
                [
                    tool.id,
                    tool.category,
                    tool.title.id,
                    tool.title.en,
                    tool.description.id,
                    tool.description.en
                ]
                    .join(" ")
                    .toLowerCase();


            return (
                categoryMatch &&
                searchable.includes(query)
            );

        }
    );

}


/* =========================================================
   RENDER TOOLS
========================================================= */

function renderTools() {

    if (!allToolsGrid) {
        return;
    }


    const filteredTools =
        getFilteredTools();


    allToolsGrid.innerHTML =
        "";


    if (
        filteredTools.length === 0
    ) {

        if (emptyState) {
            emptyState.hidden = false;
        }

    } else {

        if (emptyState) {
            emptyState.hidden = true;
        }

        const fragment =
            document.createDocumentFragment();


        filteredTools.forEach(
            tool => {

                fragment.appendChild(
                    createToolCard(tool)
                );

            }
        );


        allToolsGrid.appendChild(
            fragment
        );

    }


    if (toolResultCount) {

        toolResultCount.textContent =
            String(filteredTools.length);

    }

}


/* =========================================================
   SEARCH
========================================================= */

if (toolSearch) {

    toolSearch.addEventListener(
        "input",
        event => {

            currentSearch =
                event.target.value;

            renderTools();

        }
    );

}


/* =========================================================
   CATEGORY FILTER
========================================================= */

categoryButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const category =
                    button.dataset.category;


                if (!category) {
                    return;
                }


                currentCategory =
                    category;


                syncCategoryUI(category);

                renderTools();

                const allToolsSection =
                    document.getElementById("allTools");

                if (allToolsSection) {
                    allToolsSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

            }
        );

    }
);


/* =========================================================
   ALL TOOLS FILTER BUTTONS
========================================================= */

function syncCategoryUI(category) {

    categoryButtons.forEach(button => {
        const active = button.dataset.category === category;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
    });

    filterButtons.forEach(button => {
        const active = button.dataset.filter === category;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
    });
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.filter || "all";
        currentCategory = category;
        syncCategoryUI(category);
        renderTools();
    });
});

footerCategoryLinks.forEach(link => {
    link.addEventListener("click", () => {
        const category = link.dataset.footerCategory;
        if (!category) return;
        currentCategory = category;
        syncCategoryUI(category);
        renderTools();
    });
});


/* =========================================================
   CATEGORY SHORTCUT
========================================================= */

document.addEventListener(
    "click",
    event => {

        const shortcut =
            event.target.closest(
                "[data-open-category]"
            );


        if (!shortcut) {
            return;
        }


        event.preventDefault();


        const category =
            shortcut.dataset.openCategory;


        if (!category) {
            return;
        }


        currentCategory =
            category;


        syncCategoryUI(category);


        renderTools();


        const section =
            document.getElementById(
                "allTools"
            ) ||
            document.getElementById(
                "tools"
            );


        if (section) {

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }
);


/* =========================================================
   LANGUAGE
========================================================= */

function setLanguage(language) {

    currentLanguage =
        language === "en"
            ? "en"
            : "id";


    document.documentElement.lang =
        currentLanguage;


    document
        .querySelectorAll(
            "[data-id][data-en]"
        )
        .forEach(
            element => {

                element.textContent =
                    currentLanguage === "id"
                        ? element.dataset.id
                        : element.dataset.en;

            }
        );


    document
        .querySelectorAll(
            "[data-placeholder-id][data-placeholder-en]"
        )
        .forEach(
            element => {

                element.placeholder =
                    currentLanguage === "id"
                        ? element.dataset.placeholderId
                        : element.dataset.placeholderEn;

            }
        );


    if (languageButton) {

        languageButton.textContent =
            currentLanguage === "id"
                ? "EN"
                : "ID";

        languageButton.setAttribute(
            "aria-label",
            currentLanguage === "id"
                ? "Switch to English"
                : "Ganti ke Bahasa Indonesia"
        );

    }


    try {

        localStorage.setItem(
            "arestyx-language",
            currentLanguage
        );

    } catch {}


    renderTools();

    applyStaticPageLanguage();

}


function loadLanguage() {

    try {

        const saved =
            localStorage.getItem(
                "arestyx-language"
            );


        if (
            saved === "id" ||
            saved === "en"
        ) {

            currentLanguage =
                saved;

        }

    } catch {}


    setLanguage(
        currentLanguage
    );

}


if (languageButton) {

    languageButton.addEventListener(
        "click",
        () => {

            setLanguage(
                currentLanguage === "id"
                    ? "en"
                    : "id"
            );

        }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function closeMobileMenu() {

    if (!mobileMenu) {
        return;
    }


    mobileMenu.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "menu-open"
    );


    if (menuButton) {

        menuButton.classList.remove(
            "active"
        );

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


if (menuButton) {

    menuButton.addEventListener(
        "click",
        () => {

            if (!mobileMenu) {
                return;
            }


            const active =
                mobileMenu.classList.toggle(
                    "active"
                );


            document.body.classList.toggle(
                "menu-open",
                active
            );


            menuButton.classList.toggle(
                "active",
                active
            );


            menuButton.setAttribute(
                "aria-expanded",
                String(active)
            );

        }
    );

}


if (mobileMenu) {

    mobileMenu
        .querySelectorAll("a")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    closeMobileMenu
                );

            }
        );

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }


                    let target;


                    try {

                        target =
                            document.querySelector(
                                href
                            );

                    } catch {

                        return;

                    }


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );


/* =========================================================
   SEARCH SHORTCUT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        const active =
            document.activeElement;


        const typing =
            active &&
            (
                active.tagName === "INPUT" ||
                active.tagName === "TEXTAREA" ||
                active.isContentEditable
            );


        if (
            event.key === "/" &&
            !typing &&
            toolSearch
        ) {

            event.preventDefault();

            toolSearch.focus();

        }


        if (
            event.key === "Escape"
        ) {

            closeMobileMenu();


            if (
                toolSearch &&
                document.activeElement ===
                    toolSearch
            ) {

                toolSearch.value =
                    "";

                currentSearch =
                    "";

                renderTools();

                toolSearch.blur();

            }

        }

    }
);


/* =========================================================
   HEADER + BACK TO TOP
========================================================= */

function handleScroll() {

    if (header) {

        header.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );

    }


    if (backToTop) {

        backToTop.classList.toggle(
            "visible",
            window.scrollY > 500
        );

    }

}


window.addEventListener(
    "scroll",
    handleScroll,
    {
        passive: true
    }
);


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   DIRECT DATA TOOL
========================================================= */

document.addEventListener(
    "click",
    event => {

        const element =
            event.target.closest(
                "[data-tool]"
            );


        if (!element) {
            return;
        }


        const toolId =
            element.dataset.tool;


        if (!toolId) {
            return;
        }


        event.preventDefault();

        openTool(
            toolId
        );

    }
);


/* =========================================================
   CURRENT YEAR
========================================================= */

function setCurrentYear() {

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   INITIALIZE
========================================================= */

function initializeAREStyx() {

    setCurrentYear();

    loadLanguage();

    handleScroll();

    syncCategoryUI(currentCategory);

    renderTools();


    console.log(
        "AREStyx initialized."
    );

    console.log(
        `${tools.length} tools loaded.`
    );

}


/* =========================================================
   START
========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeAREStyx
    );

} else {

    initializeAREStyx();

}


/* =========================================================
   GLOBAL
========================================================= */

window.AREStyx = {

    tools,

    openTool,

    renderTools,

    setLanguage

};


/* =========================================================
   END
   Powered by ARESTER GROUP
========================================================= */
