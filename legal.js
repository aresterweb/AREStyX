"use strict";

const languageButton = document.getElementById("languageButton");
const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

let currentLanguage = "id";

try {
    currentLanguage =
        localStorage.getItem("arestyx-language") === "en"
            ? "en"
            : "id";
} catch {}

function applyLanguage(language) {
    currentLanguage = language === "en" ? "en" : "id";

    document.body.classList.toggle(
        "english",
        currentLanguage === "en"
    );

    document.documentElement.lang = currentLanguage;

    if (languageButton) {
        languageButton.textContent =
            currentLanguage === "en" ? "ID" : "EN";

        languageButton.setAttribute(
            "aria-label",
            currentLanguage === "en"
                ? "Ganti bahasa"
                : "Change language"
        );
    }

    try {
        localStorage.setItem(
            "arestyx-language",
            currentLanguage
        );
    } catch {}
}

applyLanguage(currentLanguage);

if (languageButton) {
    languageButton.addEventListener("click", () => {
        applyLanguage(
            currentLanguage === "id"
                ? "en"
                : "id"
        );
    });
}

if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
        const open =
            mobileMenu.classList.toggle("active");

        menuButton.setAttribute(
            "aria-expanded",
            open ? "true" : "false"
        );
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        });
    });
}
