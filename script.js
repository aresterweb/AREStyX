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
        `tools/tools.html?tool=${encodeURIComponent(toolId)}`;

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

    }


    try {

        localStorage.setItem(
            "arestyx-language",
            currentLanguage
        );

    } catch {}


    renderTools();

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