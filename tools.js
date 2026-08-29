/* =========================================================
   AREStyx UNIVERSAL TOOL ENGINE
   Stage 3.2

   Calculator + Converter Engine
   Powered by ARESTER GROUP
========================================================= */

"use strict";


/* =========================================================
   ELEMENTS
========================================================= */

const workspace =
    document.getElementById(
        "toolWorkspace"
    );

const toolTitle =
    document.getElementById(
        "toolTitle"
    );

const toolDescription =
    document.getElementById(
        "toolDescription"
    );

const toolCategory =
    document.getElementById(
        "toolCategory"
    );

const toolIcon =
    document.getElementById(
        "toolIcon"
    );

const breadcrumbTool =
    document.getElementById(
        "breadcrumbTool"
    );


/* =========================================================
   BASIC VALIDATION
========================================================= */

if (!workspace) {

    throw new Error(
        "AREStyx: #toolWorkspace tidak ditemukan di tools.html"
    );

}


/* =========================================================
   HELPERS
========================================================= */

function getToolName() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return (
        params.get("tool") ||
        "calculator"
    );

}


function num(value) {

    const result =
        Number.parseFloat(value);


    return Number.isFinite(result)
        ? result
        : 0;

}


function formatNumber(
    value,
    decimals = 6
) {

    if (!Number.isFinite(value)) {

        return "0";

    }


    return value.toLocaleString(
        "id-ID",
        {
            maximumFractionDigits:
                decimals
        }
    );

}


function gcd(a, b) {

    a =
        Math.abs(
            Math.round(a)
        );

    b =
        Math.abs(
            Math.round(b)
        );


    while (b !== 0) {

        const temp = b;

        b = a % b;

        a = temp;

    }


    return a;

}


function safeEvaluateExpression(expression) {

    const sanitized =
        String(expression || "")
            .replace(/\s+/g, "");


    if (!sanitized) {

        throw new Error(
            "Ekspresi kosong"
        );

    }


    if (!/^[0-9+\-*/().]+$/.test(sanitized)) {

        throw new Error(
            "Ekspresi mengandung karakter tidak valid"
        );

    }


    let index = 0;


    function peek() {

        return sanitized[index];

    }


    function parseNumber() {

        const start = index;

        let hasDot = false;


        while (index < sanitized.length) {

            const char = sanitized[index];


            if (char >= "0" && char <= "9") {

                index += 1;
                continue;

            }


            if (char === "." && !hasDot) {

                hasDot = true;
                index += 1;
                continue;

            }


            break;

        }


        const numberText =
            sanitized.slice(start, index);


        if (
            !numberText ||
            numberText === "."
        ) {

            throw new Error(
                "Angka tidak valid"
            );

        }


        const value =
            Number.parseFloat(numberText);


        if (!Number.isFinite(value)) {

            throw new Error(
                "Angka tidak valid"
            );

        }


        return value;

    }


    function parseFactor() {

        const char = peek();


        if (char === "+") {

            index += 1;
            return parseFactor();

        }


        if (char === "-") {

            index += 1;
            return -parseFactor();

        }


        if (char === "(") {

            index += 1;

            const value =
                parseExpression();


            if (peek() !== ")") {

                throw new Error(
                    "Tanda kurung tidak seimbang"
                );

            }

            index += 1;
            return value;

        }


        return parseNumber();

    }


    function parseTerm() {

        let value =
            parseFactor();


        while (index < sanitized.length) {

            const operator =
                peek();


            if (
                operator !== "*" &&
                operator !== "/"
            ) {

                break;

            }


            index += 1;

            const nextValue =
                parseFactor();


            if (operator === "*") {

                value *= nextValue;

            } else {

                if (nextValue === 0) {

                    throw new Error(
                        "Tidak dapat dibagi dengan nol"
                    );

                }

                value /= nextValue;

            }

        }


        return value;

    }


    function parseExpression() {

        let value =
            parseTerm();


        while (index < sanitized.length) {

            const operator =
                peek();


            if (
                operator !== "+" &&
                operator !== "-"
            ) {

                break;

            }


            index += 1;

            const nextValue =
                parseTerm();


            if (operator === "+") {

                value += nextValue;

            } else {

                value -= nextValue;

            }

        }


        return value;

    }


    const result =
        parseExpression();


    if (index !== sanitized.length) {

        throw new Error(
            "Ekspresi tidak valid"
        );

    }


    if (!Number.isFinite(result)) {

        throw new Error(
            "Hasil tidak valid"
        );

    }


    return result;

}


function createResult(
    label = "HASIL"
) {

    return `

        <div class="tool-result">

            <span class="tool-result-label">
                ${label}
            </span>

            <div
                id="resultValue"
                class="tool-result-value"
            >
                -
            </div>

            <div
                id="resultDetail"
                class="tool-result-detail"
            ></div>

        </div>

    `;

}


function showResult(
    value,
    detail = ""
) {

    const result =
        document.getElementById(
            "resultValue"
        );

    const detailElement =
        document.getElementById(
            "resultDetail"
        );


    if (result) {

        result.textContent =
            value;

    }


    if (detailElement) {

        detailElement.textContent =
            detail;

    }

}


function showError(
    message =
        "Periksa kembali nilai yang dimasukkan."
) {

    showResult(
        "Input tidak valid",
        message
    );

}


/* =========================================================
   CALCULATOR
========================================================= */

function calculatorTool() {

    workspace.innerHTML = `

        <input
            id="calculatorDisplay"
            class="calculator-display"
            type="text"
            value="0"
            readonly
        >

        <div class="calculator-grid">

            <button class="calc-button" data-action="clear">
                AC
            </button>

            <button class="calc-button" data-action="backspace">
                ⌫
            </button>

            <button class="calc-button calc-operator" data-value="(">
                (
            </button>

            <button class="calc-button calc-operator" data-value=")">
                )
            </button>

            <button class="calc-button" data-value="7">7</button>
            <button class="calc-button" data-value="8">8</button>
            <button class="calc-button" data-value="9">9</button>

            <button class="calc-button calc-operator" data-value="/">
                ÷
            </button>

            <button class="calc-button" data-value="4">4</button>
            <button class="calc-button" data-value="5">5</button>
            <button class="calc-button" data-value="6">6</button>

            <button class="calc-button calc-operator" data-value="*">
                ×
            </button>

            <button class="calc-button" data-value="1">1</button>
            <button class="calc-button" data-value="2">2</button>
            <button class="calc-button" data-value="3">3</button>

            <button class="calc-button calc-operator" data-value="-">
                −
            </button>

            <button class="calc-button" data-value="0">
                0
            </button>

            <button class="calc-button" data-value=".">
                .
            </button>

            <button class="calc-button calc-equals" data-action="calculate">
                =
            </button>

            <button class="calc-button calc-operator" data-value="+">
                +
            </button>

        </div>

    `;


    const display =
        document.getElementById(
            "calculatorDisplay"
        );


    function calculate() {

        const expression =
            display.value;


        if (
            !/^[0-9+\-*/().\s]+$/.test(
                expression
            )
        ) {

            display.value =
                "Error";

            return;

        }


        try {

            const result =
                safeEvaluateExpression(
                    expression
                );


            if (
                !Number.isFinite(result)
            ) {

                display.value =
                    "Error";

                return;

            }


            display.value =
                String(result);

        } catch {

            display.value =
                "Error";

        }

    }


    document
        .querySelectorAll(
            ".calc-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const value =
                            button.dataset.value;

                        const action =
                            button.dataset.action;


                        if (
                            action === "clear"
                        ) {

                            display.value =
                                "0";

                            return;

                        }


                        if (
                            action ===
                            "backspace"
                        ) {

                            display.value =
                                display.value
                                    .slice(0, -1) ||
                                "0";

                            return;

                        }


                        if (
                            action ===
                            "calculate"
                        ) {

                            calculate();

                            return;

                        }


                        if (value) {

                            if (
                                display.value === "0" ||
                                display.value === "Error"
                            ) {

                                display.value =
                                    value;

                            } else {

                                display.value +=
                                    value;

                            }

                        }

                    }
                );

            }
        );

}


/* =========================================================
   PERCENTAGE
========================================================= */

function percentageTool() {

    workspace.innerHTML = `

        <div class="tool-form-grid">

            <div class="tool-field">

                <label>
                    Persentase (%)
                </label>

                <input
                    id="percent"
                    class="tool-input"
                    type="number"
                    step="any"
                    placeholder="20"
                >

            </div>

            <div class="tool-field">

                <label>
                    Dari Nilai
                </label>

                <input
                    id="baseValue"
                    class="tool-input"
                    type="number"
                    step="any"
                    placeholder="500"
                >

            </div>

        </div>

        <div class="tool-action-row">

            <button
                id="calculateButton"
                class="tool-button tool-button-primary"
            >
                Hitung
            </button>

        </div>

        ${createResult()}

    `;


    document
        .getElementById(
            "calculateButton"
        )
        .addEventListener(
            "click",
            () => {

                const percent =
                    num(
                        document.getElementById(
                            "percent"
                        ).value
                    );

                const value =
                    num(
                        document.getElementById(
                            "baseValue"
                        ).value
                    );


                const result =
                    value *
                    percent /
                    100;


                showResult(
                    formatNumber(result),
                    `${percent}% dari ${formatNumber(value)}`
                );

            }
        );

}


/* =========================================================
   AGE
========================================================= */

function ageCalculatorTool() {

    workspace.innerHTML = `

        <div class="tool-field">

            <label>
                Tanggal Lahir
            </label>

            <input
                id="birthDate"
                class="tool-input"
                type="date"
            >

        </div>

        <div class="tool-action-row">

            <button
                id="calculateButton"
                class="tool-button tool-button-primary"
            >
                Hitung Umur
            </button>

        </div>

        ${createResult("UMUR")}

    `;


    document
        .getElementById(
            "calculateButton"
        )
        .addEventListener(
            "click",
            () => {

                const value =
                    document.getElementById(
                        "birthDate"
                    ).value;


                if (!value) {

                    showError(
                        "Masukkan tanggal lahir."
                    );

                    return;

                }


                const birth =
                    new Date(
                        `${value}T00:00:00`
                    );

                const today =
                    new Date();


                if (
                    birth > today
                ) {

                    showError(
                        "Tanggal lahir tidak boleh berada di masa depan."
                    );

                    return;

                }


                let years =
                    today.getFullYear() -
                    birth.getFullYear();

                let months =
                    today.getMonth() -
                    birth.getMonth();

                let days =
                    today.getDate() -
                    birth.getDate();


                if (days < 0) {

                    months--;


                    const previousMonth =
                        new Date(
                            today.getFullYear(),
                            today.getMonth(),
                            0
                        );


                    days +=
                        previousMonth.getDate();

                }


                if (months < 0) {

                    years--;

                    months += 12;

                }


                showResult(
                    `${years} Tahun`,
                    `${years} tahun, ${months} bulan, ${days} hari`
                );

            }
        );

}


/* =========================================================
   BMI
========================================================= */

function bmiTool() {

    workspace.innerHTML = `

        <div class="tool-form-grid">

            <div class="tool-field">

                <label>
                    Berat Badan (kg)
                </label>

                <input
                    id="weight"
                    class="tool-input"
                    type="number"
                    step="0.1"
                    min="0"
                >

            </div>

            <div class="tool-field">

                <label>
                    Tinggi Badan (cm)
                </label>

                <input
                    id="height"
                    class="tool-input"
                    type="number"
                    step="0.1"
                    min="0"
                >

            </div>

        </div>

        <div class="tool-action-row">

            <button
                id="calculateButton"
                class="tool-button tool-button-primary"
            >
                Hitung BMI
            </button>

        </div>

        ${createResult("BMI")}

    `;


    document
        .getElementById(
            "calculateButton"
        )
        .addEventListener(
            "click",
            () => {

                const weight =
                    num(
                        document.getElementById(
                            "weight"
                        ).value
                    );

                const heightCm =
                    num(
                        document.getElementById(
                            "height"
                        ).value
                    );


                if (
                    weight <= 0 ||
                    heightCm <= 0
                ) {

                    showError();

                    return;

                }


                const height =
                    heightCm / 100;


                const bmi =
                    weight /
                    (
                        height *
                        height
                    );


                let category;


                if (
                    bmi < 18.5
                ) {

                    category =
                        "Berat badan kurang";

                } else if (
                    bmi < 25
                ) {

                    category =
                        "Normal";

                } else if (
                    bmi < 30
                ) {

                    category =
                        "Berat badan berlebih";

                } else {

                    category =
                        "Obesitas";

                }


                showResult(
                    bmi.toFixed(2),
                    category
                );

            }
        );

}


/* =========================================================
   DATE
========================================================= */

function dateCalculatorTool() {

    workspace.innerHTML = `

        <div class="tool-form-grid">

            <div class="tool-field">

                <label>
                    Tanggal Awal
                </label>

                <input
                    id="dateStart"
                    class="tool-input"
                    type="date"
                >

            </div>

            <div class="tool-field">

                <label>
                    Tanggal Akhir
                </label>

                <input
                    id="dateEnd"
                    class="tool-input"
                    type="date"
                >

            </div>

        </div>

        <div class="tool-action-row">

            <button
                id="calculateButton"
                class="tool-button tool-button-primary"
            >
                Hitung Selisih
            </button>

        </div>

        ${createResult("SELISIH")}

    `;


    document
        .getElementById(
            "calculateButton"
        )
        .addEventListener(
            "click",
            () => {

                const startValue =
                    document.getElementById(
                        "dateStart"
                    ).value;

                const endValue =
                    document.getElementById(
                        "dateEnd"
                    ).value;


                if (
                    !startValue ||
                    !endValue
                ) {

                    showError(
                        "Masukkan kedua tanggal."
                    );

                    return;

                }


                const start =
                    new Date(
                        `${startValue}T00:00:00`
                    );

                const end =
                    new Date(
                        `${endValue}T00:00:00`
                    );


                const difference =
                    Math.abs(
                        end - start
                    );


                const days =
                    Math.round(
                        difference /
                        86400000
                    );


                showResult(
                    `${formatNumber(days, 0)} Hari`,
                    `≈ ${formatNumber(days / 7, 2)} minggu`
                );

            }
        );

}


/* =========================================================
   TIME
========================================================= */

function timeCalculatorTool() {

    workspace.innerHTML = `

        <div class="tool-form-grid">

            <div class="tool-field">

                <label>
                    Waktu Mulai
                </label>

                <input
                    id="startTime"
                    class="tool-input"
                    type="time"
                >

            </div>

            <div class="tool-field">

                <label>
                    Waktu Selesai
                </label>

                <input
                    id="endTime"
                    class="tool-input"
                    type="time"
                >

            </div>

        </div>

        <div class="tool-action-row">

            <button
                id="calculateButton"
                class="tool-button tool-button-primary"
            >
                Hitung Durasi
            </button>

        </div>

        ${createResult("DURASI")}

    `;


    document
        .getElementById(
            "calculateButton"
        )
        .addEventListener(
            "click",
            () => {

                const start =
                    document.getElementById(
                        "startTime"
                    ).value;

                const end =
                    document.getElementById(
                        "endTime"
                    ).value;


                if (
                    !start ||
                    !end
                ) {

                    showError(
                        "Masukkan waktu mulai dan selesai."
                    );

                    return;

                }


                const [sh, sm] =
                    start
                        .split(":")
                        .map(Number);

                const [eh, em] =
                    end
                        .split(":")
                        .map(Number);


                const startMinutes =
                    sh * 60 + sm;

                let endMinutes =
                    eh * 60 + em;


                if (
                    endMinutes <
                    startMinutes
                ) {

                    endMinutes +=
                        1440;

                }


                const difference =
                    endMinutes -
                    startMinutes;


                const hours =
                    Math.floor(
                        difference /
                        60
                    );

                const minutes =
                    difference %
                    60;


                showResult(
                    `${hours} Jam ${minutes} Menit`,
                    `${difference} menit`
                );

            }
        );

}


/* =========================================================
   AVERAGE
========================================================= */

function averageTool() {

    workspace.innerHTML = `

        <div class="tool-field">

            <label>
                Daftar Angka
            </label>

            <textarea
                id="numbers"
                class="tool-textarea"
                placeholder="Contoh: 10, 20, 30, 40"
            ></textarea>

        </div>

        <div class="tool-action-row">

            <button
                id="calculateButton"
                class="tool-button tool-button-primary"
            >
                Hitung Rata-rata
            </button>

        </div>

        ${createResult("RATA-RATA")}

    `;


    document
        .getElementById(
            "calculateButton"
        )
        .addEventListener(
            "click",
            () => {

                const values =
                    document.getElementById(
                        "numbers"
                    ).value
                    .split(
                        /[\s,;]+/
                    )
                    .map(Number)
                    .filter(
                        Number.isFinite
                    );


                if (
                    values.length === 0
                ) {

                    showError(
                        "Masukkan minimal satu angka."
                    );

                    return;

                }


                const total =
                    values.reduce(
                        (
                            sum,
                            current
                        ) =>
                            sum +
                            current,
                        0
                    );


                const average =
                    total /
                    values.length;


                showResult(
                    formatNumber(
                        average
                    ),
                    `${values.length} angka • Total ${formatNumber(total)}`
                );

            }
        );

}


/* =========================================================
   DISCOUNT
========================================================= */

function discountTool() {

    workspace.innerHTML = `

        <div class="tool-form-grid">

            <div class="tool-field">

                <label>
                    Harga Awal
                </label>

                <input
                    id="price"
                    class="tool-input"
                    type="number"
                    min="0"
                    step="any"
                >

            </div>

            <div class="tool-field">

                <label>
                    Diskon (%)
                </label>

                <input
                    id="discount"
                    class="tool-input"
                    type="number"
                    min="0"
                    step="any"
                >

            </div>

        </div>

        <div class="tool-action-row">

            <button
                id="calculateButton"
                class="tool-button tool-button-primary"
            >
                Hitung Diskon
            </button>

        </div>

        ${createResult("HARGA AKHIR")}

    `;


    document
        .getElementById(
            "calculateButton"
        )
        .addEventListener(
            "click",
            () => {

                const price =
                    num(
                        document.getElementById(
                            "price"
                        ).value
                    );

                const discount =
                    num(
                        document.getElementById(
                            "discount"
                        ).value
                    );


                if (
                    price < 0 ||
                    discount < 0
                ) {

                    showError();

                    return;

                }


                const saving =
                    price *
                    discount /
                    100;


                const finalPrice =
                    price -
                    saving;


                showResult(
                    formatNumber(
                        finalPrice
                    ),
                    `Potongan: ${formatNumber(saving)}`
                );

            }
        );

}


/* =========================================================
   RATIO
========================================================= */

function ratioTool() {

    workspace.innerHTML = `

        <div class="tool-form-grid">

            <div class="tool-field">

                <label>
                    Nilai A
                </label>

                <input
                    id="ratioA"
                    class="tool-input"
                    type="number"
                    step="1"
                >

            </div>

            <div class="tool-field">

                <label>
                    Nilai B
                </label>

                <input
                    id="ratioB"
                    class="tool-input"
                    type="number"
                    step="1"
                >

            </div>

        </div>

        <div class="tool-action-row">

            <button
                id="calculateButton"
                class="tool-button tool-button-primary"
            >
                Sederhanakan
            </button>

        </div>

        ${createResult("RASIO")}

    `;


    document
        .getElementById(
            "calculateButton"
        )
        .addEventListener(
            "click",
            () => {

                const a =
                    Math.round(
                        num(
                            document.getElementById(
                                "ratioA"
                            ).value
                        )
                    );

                const b =
                    Math.round(
                        num(
                            document.getElementById(
                                "ratioB"
                            ).value
                        )
                    );


                if (
                    a === 0 &&
                    b === 0
                ) {

                    showError();

                    return;

                }


                const divisor =
                    gcd(a, b) ||
                    1;


                showResult(
                    `${a / divisor} : ${b / divisor}`,
                    `Perbandingan ${a} terhadap ${b}`
                );

            }
        );

}


/* =========================================================
   SCIENTIFIC
========================================================= */

function scientificCalculatorTool() {

    workspace.innerHTML = `

        <div class="tool-form-grid">

            <div class="tool-field">

                <label>
                    Nilai
                </label>

                <input
                    id="scientificValue"
                    class="tool-input"
                    type="number"
                    step="any"
                >

            </div>

            <div class="tool-field">

                <label>
                    Operasi
                </label>

                <select
                    id="scientificOperation"
                    class="tool-select"
                >

                    <option value="sqrt">√ Akar Kuadrat</option>
                    <option value="square">x²</option>
                    <option value="cube">x³</option>
                    <option value="sin">sin</option>
                    <option value="cos">cos</option>
                    <option value="tan">tan</option>
                    <option value="log">log₁₀</option>
                    <option value="ln">ln</option>
                    <option value="exp">eˣ</option>

                </select>

            </div>

        </div>

        <div class="tool-action-row">

            <button
                id="calculateButton"
                class="tool-button tool-button-primary"
            >
                Hitung
            </button>

        </div>

        ${createResult()}

    `;


    document
        .getElementById(
            "calculateButton"
        )
        .addEventListener(
            "click",
            () => {

                const x =
                    num(
                        document.getElementById(
                            "scientificValue"
                        ).value
                    );

                const operation =
                    document.getElementById(
                        "scientificOperation"
                    ).value;


                let result;


                switch (
                    operation
                ) {

                    case "sqrt":

                        result =
                            Math.sqrt(x);

                        break;


                    case "square":

                        result =
                            x ** 2;

                        break;


                    case "cube":

                        result =
                            x ** 3;

                        break;


                    case "sin":

                        result =
                            Math.sin(
                                x *
                                Math.PI /
                                180
                            );

                        break;


                    case "cos":

                        result =
                            Math.cos(
                                x *
                                Math.PI /
                                180
                            );

                        break;


                    case "tan":

                        result =
                            Math.tan(
                                x *
                                Math.PI /
                                180
                            );

                        break;


                    case "log":

                        result =
                            Math.log10(x);

                        break;


                    case "ln":

                        result =
                            Math.log(x);

                        break;


                    case "exp":

                        result =
                            Math.exp(x);

                        break;


                    default:

                        result =
                            NaN;

                }


                if (
                    !Number.isFinite(result)
                ) {

                    showError(
                        "Operasi tidak valid untuk nilai tersebut."
                    );

                    return;

                }


                showResult(
                    formatNumber(
                        result,
                        10
                    )
                );

            }
        );

}


/* =========================================================
   LINEAR CONVERTER
========================================================= */

function linearConverter(
    units
) {

    workspace.innerHTML = `

        <div class="tool-form-grid">

            <div class="tool-field">

                <label>
                    Nilai
                </label>

                <input
                    id="convertValue"
                    class="tool-input"
                    type="number"
                    step="any"
                >

            </div>

            <div class="tool-field">

                <label>
                    Dari
                </label>

                <select
                    id="convertFrom"
                    class="tool-select"
                ></select>

            </div>

            <div class="tool-field">

                <label>
                    Ke
                </label>

                <select
                    id="convertTo"
                    class="tool-select"
                ></select>

            </div>

        </div>

        <div class="tool-action-row">

            <button
                id="calculateButton"
                class="tool-button tool-button-primary"
            >
                Konversi
            </button>

        </div>

        ${createResult("HASIL KONVERSI")}

    `;


    const from =
        document.getElementById(
            "convertFrom"
        );

    const to =
        document.getElementById(
            "convertTo"
        );


    Object.entries(
        units
    )
        .forEach(
            ([key, unit]) => {

                const first =
                    document.createElement(
                        "option"
                    );

                first.value =
                    key;

                first.textContent =
                    unit.label;


                const second =
                    first.cloneNode(
                        true
                    );


                from.appendChild(
                    first
                );

                to.appendChild(
                    second
                );

            }
        );


    if (
        to.options.length > 1
    ) {

        to.selectedIndex =
            1;

    }


    document
        .getElementById(
            "calculateButton"
        )
        .addEventListener(
            "click",
            () => {

                const value =
                    num(
                        document.getElementById(
                            "convertValue"
                        ).value
                    );


                const fromUnit =
                    units[
                        from.value
                    ];

                const toUnit =
                    units[
                        to.value
                    ];


                if (
                    !fromUnit ||
                    !toUnit
                ) {

                    showError();

                    return;

                }


                const base =
                    value *
                    fromUnit.factor;


                const result =
                    base /
                    toUnit.factor;


                showResult(
                    `${formatNumber(result, 10)} ${toUnit.symbol}`,
                    `${formatNumber(value)} ${fromUnit.symbol} = ${formatNumber(result, 10)} ${toUnit.symbol}`
                );

            }
        );

}


/* =========================================================
   TEMPERATURE HELPER
========================================================= */

function convertTemperature(
    value,
    from,
    to
) {

    let celsius;


    if (
        from === "c"
    ) {

        celsius =
            value;

    } else if (
        from === "f"
    ) {

        celsius =
            (
                value -
                32
            ) *
            5 /
            9;

    } else {

        celsius =
            value -
            273.15;

    }


    if (
        to === "c"
    ) {

        return celsius;

    }


    if (
        to === "f"
    ) {

        return (
            celsius *
            9 /
            5
        ) +
        32;

    }


    return (
        celsius +
        273.15
    );

}


/* =========================================================
   UNIT CONVERTER
========================================================= */

function unitConverterTool() {

    workspace.innerHTML = `

        <div class="tool-form-grid">

            <div class="tool-field">

                <label>
                    Jenis Satuan
                </label>

                <select
                    id="type"
                    class="tool-select"
                >

                    <option value="length">Panjang</option>
                    <option value="weight">Berat</option>
                    <option value="temperature">Suhu</option>
                    <option value="area">Luas</option>
                    <option value="volume">Volume</option>
                    <option value="speed">Kecepatan</option>

                </select>

            </div>

            <div class="tool-field">

                <label>
                    Nilai
                </label>

                <input
                    id="value"
                    class="tool-input"
                    type="number"
                    step="any"
                >

            </div>

            <div class="tool-field">

                <label>
                    Dari
                </label>

                <select
                    id="from"
                    class="tool-select"
                ></select>

            </div>

            <div class="tool-field">

                <label>
                    Ke
                </label>

                <select
                    id="to"
                    class="tool-select"
                ></select>

            </div>

        </div>

        <div class="tool-action-row">

            <button
                id="calculateButton"
                class="tool-button tool-button-primary"
            >
                Konversi
            </button>

        </div>

        ${createResult()}

    `;


    const groups = {

        length: {

            meter: {
                label: "Meter",
                factor: 1,
                symbol: "m"
            },

            kilometer: {
                label: "Kilometer",
                factor: 1000,
                symbol: "km"
            },

            centimeter: {
                label: "Centimeter",
                factor: 0.01,
                symbol: "cm"
            },

            millimeter: {
                label: "Millimeter",
                factor: 0.001,
                symbol: "mm"
            },

            mile: {
                label: "Mile",
                factor: 1609.344,
                symbol: "mi"
            },

            foot: {
                label: "Foot",
                factor: 0.3048,
                symbol: "ft"
            },

            inch: {
                label: "Inch",
                factor: 0.0254,
                symbol: "in"
            },

            nautical: {
                label: "Nautical Mile",
                factor: 1852,
                symbol: "NM"
            }

        },


        weight: {

            kilogram: {
                label: "Kilogram",
                factor: 1,
                symbol: "kg"
            },

            gram: {
                label: "Gram",
                factor: 0.001,
                symbol: "g"
            },

            milligram: {
                label: "Milligram",
                factor: 0.000001,
                symbol: "mg"
            },

            tonne: {
                label: "Ton",
                factor: 1000,
                symbol: "t"
            },

            pound: {
                label: "Pound",
                factor: 0.45359237,
                symbol: "lb"
            },

            ounce: {
                label: "Ounce",
                factor: 0.028349523125,
                symbol: "oz"
            }

        },


        area: {

            sqm: {
                label: "Meter Persegi",
                factor: 1,
                symbol: "m²"
            },

            sqkm: {
                label: "Kilometer Persegi",
                factor: 1000000,
                symbol: "km²"
            },

            hectare: {
                label: "Hectare",
                factor: 10000,
                symbol: "ha"
            },

            acre: {
                label: "Acre",
                factor: 4046.8564224,
                symbol: "acre"
            },

            sqft: {
                label: "Square Foot",
                factor: 0.09290304,
                symbol: "ft²"
            }

        },


        volume: {

            liter: {
                label: "Liter",
                factor: 1,
                symbol: "L"
            },

            milliliter: {
                label: "Milliliter",
                factor: 0.001,
                symbol: "mL"
            },

            cubicMeter: {
                label: "Meter Kubik",
                factor: 1000,
                symbol: "m³"
            },

            gallonUS: {
                label: "US Gallon",
                factor: 3.785411784,
                symbol: "gal"
            },

            cubicFoot: {
                label: "Cubic Foot",
                factor: 28.316846592,
                symbol: "ft³"
            }

        },


        speed: {

            kmh: {
                label: "Kilometer/Jam",
                factor: 1,
                symbol: "km/h"
            },

            ms: {
                label: "Meter/Detik",
                factor: 3.6,
                symbol: "m/s"
            },

            mph: {
                label: "Mile/Jam",
                factor: 1.609344,
                symbol: "mph"
            },

            knot: {
                label: "Knot",
                factor: 1.852,
                symbol: "kn"
            }

        }

    };


    const type =
        document.getElementById(
            "type"
        );

    const from =
        document.getElementById(
            "from"
        );

    const to =
        document.getElementById(
            "to"
        );


    function updateOptions() {

        from.innerHTML =
            "";

        to.innerHTML =
            "";


        let items;


        if (
            type.value ===
            "temperature"
        ) {

            items = [

                [
                    "c",
                    "Celsius"
                ],

                [
                    "f",
                    "Fahrenheit"
                ],

                [
                    "k",
                    "Kelvin"
                ]

            ];

        } else {

            items =
                Object.entries(
                    groups[
                        type.value
                    ]
                )
                    .map(
                        ([key, unit]) => [

                            key,

                            unit.label

                        ]
                    );

        }


        items.forEach(
            ([key, label]) => {

                const optionA =
                    document.createElement(
                        "option"
                    );

                const optionB =
                    document.createElement(
                        "option"
                    );


                optionA.value =
                    key;

                optionB.value =
                    key;

                optionA.textContent =
                    label;

                optionB.textContent =
                    label;


                from.appendChild(
                    optionA
                );

                to.appendChild(
                    optionB
                );

            }
        );


        if (
            to.options.length > 1
        ) {

            to.selectedIndex =
                1;

        }

    }


    type.addEventListener(
        "change",
        updateOptions
    );


    updateOptions();


    document
        .getElementById(
            "calculateButton"
        )
        .addEventListener(
            "click",
            () => {

                const value =
                    num(
                        document.getElementById(
                            "value"
                        ).value
                    );


                if (
                    type.value ===
                    "temperature"
                ) {

                    const result =
                        convertTemperature(
                            value,
                            from.value,
                            to.value
                        );


                    showResult(
                        formatNumber(
                            result,
                            6
                        )
                    );

                    return;

                }


                const group =
                    groups[
                        type.value
                    ];


                const original =
                    group[
                        from.value
                    ];


                const target =
                    group[
                        to.value
                    ];


                const result =
                    value *
                    original.factor /
                    target.factor;


                showResult(
                    `${formatNumber(result, 10)} ${target.symbol}`,
                    `${formatNumber(value)} ${original.symbol}`
                );

            }
        );

}


/* =========================================================
   TEMPERATURE CONVERTER
========================================================= */

function temperatureConverterTool() {

    workspace.innerHTML = `

        <div class="tool-form-grid">

            <div class="tool-field">

                <label>
                    Nilai
                </label>

                <input
                    id="temperatureValue"
                    class="tool-input"
                    type="number"
                    step="any"
                >

            </div>

            <div class="tool-field">

                <label>
                    Dari
                </label>

                <select
                    id="temperatureFrom"
                    class="tool-select"
                >

                    <option value="c">Celsius</option>
                    <option value="f">Fahrenheit</option>
                    <option value="k">Kelvin</option>

                </select>

            </div>

            <div class="tool-field">

                <label>
                    Ke
                </label>

                <select
                    id="temperatureTo"
                    class="tool-select"
                >

                    <option value="f">Fahrenheit</option>
                    <option value="c">Celsius</option>
                    <option value="k">Kelvin</option>

                </select>

            </div>

        </div>

        <div class="tool-action-row">

            <button
                id="calculateButton"
                class="tool-button tool-button-primary"
            >
                Konversi
            </button>

        </div>

        ${createResult()}

    `;


    document
        .getElementById(
            "calculateButton"
        )
        .addEventListener(
            "click",
            () => {

                const value =
                    num(
                        document.getElementById(
                            "temperatureValue"
                        ).value
                    );


                const from =
                    document.getElementById(
                        "temperatureFrom"
                    ).value;

                const to =
                    document.getElementById(
                        "temperatureTo"
                    ).value;


                const result =
                    convertTemperature(
                        value,
                        from,
                        to
                    );


                showResult(
                    formatNumber(
                        result,
                        6
                    )
                );

            }
        );

}


/* =========================================================
   LENGTH
========================================================= */

function lengthConverterTool() {

    linearConverter({

        meter: {
            label: "Meter",
            factor: 1,
            symbol: "m"
        },

        kilometer: {
            label: "Kilometer",
            factor: 1000,
            symbol: "km"
        },

        centimeter: {
            label: "Centimeter",
            factor: 0.01,
            symbol: "cm"
        },

        millimeter: {
            label: "Millimeter",
            factor: 0.001,
            symbol: "mm"
        },

        inch: {
            label: "Inch",
            factor: 0.0254,
            symbol: "in"
        },

        foot: {
            label: "Foot",
            factor: 0.3048,
            symbol: "ft"
        },

        yard: {
            label: "Yard",
            factor: 0.9144,
            symbol: "yd"
        },

        mile: {
            label: "Mile",
            factor: 1609.344,
            symbol: "mi"
        },

        nauticalMile: {
            label: "Nautical Mile",
            factor: 1852,
            symbol: "NM"
        }

    });

}


/* =========================================================
   WEIGHT
========================================================= */

function weightConverterTool() {

    linearConverter({

        kilogram: {
            label: "Kilogram",
            factor: 1,
            symbol: "kg"
        },

        gram: {
            label: "Gram",
            factor: 0.001,
            symbol: "g"
        },

        milligram: {
            label: "Milligram",
            factor: 0.000001,
            symbol: "mg"
        },

        ton: {
            label: "Metric Ton",
            factor: 1000,
            symbol: "t"
        },

        pound: {
            label: "Pound",
            factor: 0.45359237,
            symbol: "lb"
        },

        ounce: {
            label: "Ounce",
            factor: 0.028349523125,
            symbol: "oz"
        }

    });

}


/* =========================================================
   AREA
========================================================= */

function areaConverterTool() {

    linearConverter({

        sqm: {
            label: "Meter Persegi",
            factor: 1,
            symbol: "m²"
        },

        sqkm: {
            label: "Kilometer Persegi",
            factor: 1000000,
            symbol: "km²"
        },

        sqcm: {
            label: "Centimeter Persegi",
            factor: 0.0001,
            symbol: "cm²"
        },

        hectare: {
            label: "Hectare",
            factor: 10000,
            symbol: "ha"
        },

        acre: {
            label: "Acre",
            factor: 4046.8564224,
            symbol: "acre"
        },

        sqft: {
            label: "Square Foot",
            factor: 0.09290304,
            symbol: "ft²"
        }

    });

}


/* =========================================================
   VOLUME
========================================================= */

function volumeConverterTool() {

    linearConverter({

        liter: {
            label: "Liter",
            factor: 1,
            symbol: "L"
        },

        milliliter: {
            label: "Milliliter",
            factor: 0.001,
            symbol: "mL"
        },

        cubicMeter: {
            label: "Meter Kubik",
            factor: 1000,
            symbol: "m³"
        },

        gallonUS: {
            label: "US Gallon",
            factor: 3.785411784,
            symbol: "gal"
        },

        gallonUK: {
            label: "UK Gallon",
            factor: 4.54609,
            symbol: "gal UK"
        },

        cubicFoot: {
            label: "Cubic Foot",
            factor: 28.316846592,
            symbol: "ft³"
        }

    });

}


/* =========================================================
   SPEED
========================================================= */

function speedConverterTool() {

    linearConverter({

        kmh: {
            label: "Kilometer/Jam",
            factor: 1,
            symbol: "km/h"
        },

        ms: {
            label: "Meter/Detik",
            factor: 3.6,
            symbol: "m/s"
        },

        mph: {
            label: "Mile/Jam",
            factor: 1.609344,
            symbol: "mph"
        },

        knot: {
            label: "Knot",
            factor: 1.852,
            symbol: "kn"
        }

    });

}


/* =========================================================
   PRESSURE
========================================================= */

function pressureConverterTool() {

    linearConverter({

        pascal: {
            label: "Pascal",
            factor: 1,
            symbol: "Pa"
        },

        kilopascal: {
            label: "Kilopascal",
            factor: 1000,
            symbol: "kPa"
        },

        megapascal: {
            label: "Megapascal",
            factor: 1000000,
            symbol: "MPa"
        },

        bar: {
            label: "Bar",
            factor: 100000,
            symbol: "bar"
        },

        psi: {
            label: "PSI",
            factor: 6894.757293168,
            symbol: "psi"
        },

        atmosphere: {
            label: "Atmosphere",
            factor: 101325,
            symbol: "atm"
        },

        mmhg: {
            label: "mmHg",
            factor: 133.322387415,
            symbol: "mmHg"
        }

    });

}


/* =========================================================
   ENERGY
========================================================= */

function energyConverterTool() {

    linearConverter({

        joule: {
            label: "Joule",
            factor: 1,
            symbol: "J"
        },

        kilojoule: {
            label: "Kilojoule",
            factor: 1000,
            symbol: "kJ"
        },

        calorie: {
            label: "Calorie",
            factor: 4.184,
            symbol: "cal"
        },

        kilocalorie: {
            label: "Kilocalorie",
            factor: 4184,
            symbol: "kcal"
        },

        wh: {
            label: "Watt-hour",
            factor: 3600,
            symbol: "Wh"
        },

        kwh: {
            label: "Kilowatt-hour",
            factor: 3600000,
            symbol: "kWh"
        },

        btu: {
            label: "BTU",
            factor: 1055.05585262,
            symbol: "BTU"
        }

    });

}


/* =========================================================
   DATA STORAGE
========================================================= */

function dataStorageConverterTool() {

    linearConverter({

        byte: {
            label: "Byte",
            factor: 1,
            symbol: "B"
        },

        kb: {
            label: "Kilobyte",
            factor: 1024,
            symbol: "KB"
        },

        mb: {
            label: "Megabyte",
            factor: 1024 ** 2,
            symbol: "MB"
        },

        gb: {
            label: "Gigabyte",
            factor: 1024 ** 3,
            symbol: "GB"
        },

        tb: {
            label: "Terabyte",
            factor: 1024 ** 4,
            symbol: "TB"
        },

        pb: {
            label: "Petabyte",
            factor: 1024 ** 5,
            symbol: "PB"
        }

    });

}


/* =========================================================
   WORD COUNTER
========================================================= */

function wordCounterTool() {

    workspace.innerHTML = `

        <div class="tool-field">

            <label>
                Masukkan Teks
            </label>

            <textarea
                id="wordText"
                class="tool-textarea"
                placeholder="Ketik atau tempel teks..."
            ></textarea>

        </div>

        <div class="text-stat-grid">

            <div class="text-stat">
                <strong id="words">0</strong>
                <span>Kata</span>
            </div>

            <div class="text-stat">
                <strong id="characters">0</strong>
                <span>Karakter</span>
            </div>

            <div class="text-stat">
                <strong id="noSpaces">0</strong>
                <span>Tanpa Spasi</span>
            </div>

            <div class="text-stat">
                <strong id="sentences">0</strong>
                <span>Kalimat</span>
            </div>

            <div class="text-stat">
                <strong id="paragraphs">0</strong>
                <span>Paragraf</span>
            </div>

        </div>

    `;


    const textarea =
        document.getElementById(
            "wordText"
        );


    textarea.addEventListener(
        "input",
        () => {

            const text =
                textarea.value;

            const trimmed =
                text.trim();


            document.getElementById(
                "words"
            ).textContent =
                trimmed
                    ? trimmed
                        .split(/\s+/)
                        .length
                    : 0;


            document.getElementById(
                "characters"
            ).textContent =
                text.length;


            document.getElementById(
                "noSpaces"
            ).textContent =
                text
                    .replace(
                        /\s/g,
                        ""
                    )
                    .length;


            document.getElementById(
                "sentences"
            ).textContent =
                trimmed
                    ? (
                        trimmed.match(
                            /[^.!?]+[.!?]+|[^.!?]+$/g
                        ) || []
                    ).length
                    : 0;


            document.getElementById(
                "paragraphs"
            ).textContent =
                trimmed
                    ? trimmed
                        .split(
                            /\n\s*\n/
                        )
                        .filter(
                            item =>
                                item.trim()
                        )
                        .length
                    : 0;

        }
    );

}


/* =========================================================
   PASSWORD GENERATOR
========================================================= */

function passwordGeneratorTool() {

    workspace.innerHTML = `

        <div class="tool-form-grid">

            <div class="tool-field">

                <label>
                    Panjang Password
                </label>

                <input
                    id="passwordLength"
                    class="tool-input"
                    type="number"
                    value="16"
                    min="4"
                    max="128"
                >

            </div>

        </div>

        <div class="tool-action-row">

            <button
                id="generatePassword"
                class="tool-button tool-button-primary"
            >
                Generate Password
            </button>

            <button
                id="copyPassword"
                class="tool-button tool-button-secondary"
            >
                Salin
            </button>

        </div>

        ${createResult("PASSWORD")}

    `;


    document
        .getElementById(
            "generatePassword"
        )
        .addEventListener(
            "click",
            () => {

                let length =
                    Math.floor(
                        num(
                            document.getElementById(
                                "passwordLength"
                            ).value
                        )
                    );


                length =
                    Math.max(
                        4,
                        Math.min(
                            128,
                            length
                        )
                    );


                const chars =
                    "abcdefghijklmnopqrstuvwxyz" +
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                    "0123456789" +
                    "!@#$%^&*()-_=+";


                const random =
                    new Uint32Array(
                        length
                    );


                crypto.getRandomValues(
                    random
                );


                let password =
                    "";


                random.forEach(
                    value => {

                        password +=
                            chars[
                                value %
                                chars.length
                            ];

                    }
                );


                showResult(
                    password,
                    `${length} karakter`
                );

            }
        );


    document
        .getElementById(
            "copyPassword"
        )
        .addEventListener(
            "click",
            async () => {

                const result =
                    document.getElementById(
                        "resultValue"
                    );


                if (
                    !result ||
                    result.textContent === "-"
                ) {

                    return;

                }


                try {

                    await navigator
                        .clipboard
                        .writeText(
                            result.textContent
                        );


                    showResult(
                        result.textContent,
                        "Password berhasil disalin."
                    );

                } catch {

                    showResult(
                        result.textContent,
                        "Clipboard tidak tersedia."
                    );

                }

            }
        );

}


/* =========================================================
   FUEL CONSUMPTION
========================================================= */

function fuelConsumptionTool() {

    workspace.innerHTML = `

        <div class="tool-form-grid">

            <div class="tool-field">

                <label>
                    Fuel Awal (L)
                </label>

                <input
                    id="fuelStart"
                    class="tool-input"
                    type="number"
                    step="any"
                >

            </div>

            <div class="tool-field">

                <label>
                    Fuel Akhir (L)
                </label>

                <input
                    id="fuelEnd"
                    class="tool-input"
                    type="number"
                    step="any"
                >

            </div>

            <div class="tool-field">

                <label>
                    Lama Operasi (jam)
                </label>

                <input
                    id="fuelHours"
                    class="tool-input"
                    type="number"
                    step="any"
                >

            </div>

        </div>

        <div class="tool-action-row">

            <button
                id="calculateButton"
                class="tool-button tool-button-primary"
            >
                Hitung
            </button>

        </div>

        ${createResult("KONSUMSI")}

    `;


    document
        .getElementById(
            "calculateButton"
        )
        .addEventListener(
            "click",
            () => {

                const start =
                    num(
                        document.getElementById(
                            "fuelStart"
                        ).value
                    );

                const end =
                    num(
                        document.getElementById(
                            "fuelEnd"
                        ).value
                    );

                const hours =
                    num(
                        document.getElementById(
                            "fuelHours"
                        ).value
                    );


                if (
                    hours <= 0
                ) {

                    showError(
                        "Jam operasi harus lebih besar dari 0."
                    );

                    return;

                }


                const used =
                    Math.abs(
                        start -
                        end
                    );


                const consumption =
                    used /
                    hours;


                showResult(
                    `${formatNumber(consumption)} L/jam`,
                    `Total penggunaan ${formatNumber(used)} liter`
                );

            }
        );

}


/* =========================================================
   OHM'S LAW
========================================================= */

function ohmsLawTool() {

    workspace.innerHTML = `

        <div class="tool-form-grid">

            <div class="tool-field">

                <label>
                    Voltage (V)
                </label>

                <input
                    id="voltage"
                    class="tool-input"
                    type="number"
                    step="any"
                >

            </div>

            <div class="tool-field">

                <label>
                    Current (A)
                </label>

                <input
                    id="current"
                    class="tool-input"
                    type="number"
                    step="any"
                >

            </div>

            <div class="tool-field">

                <label>
                    Resistance (Ω)
                </label>

                <input
                    id="resistance"
                    class="tool-input"
                    type="number"
                    step="any"
                >

            </div>

        </div>

        <p class="tool-result-detail">
            Isi dua nilai dan kosongkan satu nilai yang ingin dihitung.
        </p>

        <div class="tool-action-row">

            <button
                id="calculateButton"
                class="tool-button tool-button-primary"
            >
                Hitung
            </button>

        </div>

        ${createResult()}

    `;


    document
        .getElementById(
            "calculateButton"
        )
        .addEventListener(
            "click",
            () => {

                const voltageText =
                    document.getElementById(
                        "voltage"
                    ).value;

                const currentText =
                    document.getElementById(
                        "current"
                    ).value;

                const resistanceText =
                    document.getElementById(
                        "resistance"
                    ).value;


                const voltage =
                    Number.parseFloat(
                        voltageText
                    );

                const current =
                    Number.parseFloat(
                        currentText
                    );

                const resistance =
                    Number.parseFloat(
                        resistanceText
                    );


                if (
                    voltageText === "" &&
                    Number.isFinite(current) &&
                    Number.isFinite(resistance)
                ) {

                    const answer =
                        current *
                        resistance;


                    showResult(
                        `${formatNumber(answer)} V`,
                        "V = I × R"
                    );

                    return;

                }


                if (
                    currentText === "" &&
                    Number.isFinite(voltage) &&
                    Number.isFinite(resistance) &&
                    resistance !== 0
                ) {

                    const answer =
                        voltage /
                        resistance;


                    showResult(
                        `${formatNumber(answer)} A`,
                        "I = V ÷ R"
                    );

                    return;

                }


                if (
                    resistanceText === "" &&
                    Number.isFinite(voltage) &&
                    Number.isFinite(current) &&
                    current !== 0
                ) {

                    const answer =
                        voltage /
                        current;


                    showResult(
                        `${formatNumber(answer)} Ω`,
                        "R = V ÷ I"
                    );

                    return;

                }


                showError(
                    "Isi tepat dua nilai dan kosongkan satu nilai."
                );

            }
        );

}


/* =========================================================
   TOOL DATABASE
========================================================= */

const toolDatabase = {

    "calculator": {

        title:
            "Calculator",

        category:
            "CALCULATOR",

        icon:
            "+",

        description:
            "Kalkulator cepat untuk perhitungan sehari-hari.",

        run:
            calculatorTool

    },


    "percentage-calculator": {

        title:
            "Percentage Calculator",

        category:
            "CALCULATOR",

        icon:
            "%",

        description:
            "Hitung nilai persentase dengan cepat.",

        run:
            percentageTool

    },


    "age-calculator": {

        title:
            "Age Calculator",

        category:
            "CALCULATOR",

        icon:
            "⌛",

        description:
            "Hitung umur berdasarkan tanggal lahir.",

        run:
            ageCalculatorTool

    },


    "bmi-calculator": {

        title:
            "BMI Calculator",

        category:
            "CALCULATOR",

        icon:
            "BMI",

        description:
            "Hitung Body Mass Index berdasarkan berat dan tinggi badan.",

        run:
            bmiTool

    },


    "date-calculator": {

        title:
            "Date Calculator",

        category:
            "CALCULATOR",

        icon:
            "▣",

        description:
            "Hitung selisih antara dua tanggal.",

        run:
            dateCalculatorTool

    },


    "time-calculator": {

        title:
            "Time Calculator",

        category:
            "CALCULATOR",

        icon:
            "◷",

        description:
            "Hitung durasi antara dua waktu.",

        run:
            timeCalculatorTool

    },


    "average-calculator": {

        title:
            "Average Calculator",

        category:
            "CALCULATOR",

        icon:
            "∑",

        description:
            "Hitung nilai rata-rata dari sejumlah angka.",

        run:
            averageTool

    },


    "discount-calculator": {

        title:
            "Discount Calculator",

        category:
            "CALCULATOR",

        icon:
            "%",

        description:
            "Hitung harga setelah diskon.",

        run:
            discountTool

    },


    "ratio-calculator": {

        title:
            "Ratio Calculator",

        category:
            "CALCULATOR",

        icon:
            ":",

        description:
            "Hitung dan sederhanakan perbandingan angka.",

        run:
            ratioTool

    },


    "scientific-calculator": {

        title:
            "Scientific Calculator",

        category:
            "CALCULATOR",

        icon:
            "ƒ",

        description:
            "Kalkulator ilmiah untuk operasi matematika lanjutan.",

        run:
            scientificCalculatorTool

    },


    "unit-converter": {

        title:
            "Unit Converter",

        category:
            "CONVERTER",

        icon:
            "⇄",

        description:
            "Konversi berbagai jenis satuan dalam satu tool.",

        run:
            unitConverterTool

    },


    "length-converter": {

        title:
            "Length Converter",

        category:
            "CONVERTER",

        icon:
            "↔",

        description:
            "Konversi meter, kilometer, mile, inch, foot dan lainnya.",

        run:
            lengthConverterTool

    },


    "weight-converter": {

        title:
            "Weight Converter",

        category:
            "CONVERTER",

        icon:
            "⚖",

        description:
            "Konversi kilogram, gram, pound, ounce dan lainnya.",

        run:
            weightConverterTool

    },


    "temperature-converter": {

        title:
            "Temperature Converter",

        category:
            "CONVERTER",

        icon:
            "℃",

        description:
            "Konversi Celsius, Fahrenheit dan Kelvin.",

        run:
            temperatureConverterTool

    },


    "area-converter": {

        title:
            "Area Converter",

        category:
            "CONVERTER",

        icon:
            "□",

        description:
            "Konversi berbagai satuan luas.",

        run:
            areaConverterTool

    },


    "volume-converter": {

        title:
            "Volume Converter",

        category:
            "CONVERTER",

        icon:
            "▣",

        description:
            "Konversi liter, meter kubik, gallon dan lainnya.",

        run:
            volumeConverterTool

    },


    "speed-converter": {

        title:
            "Speed Converter",

        category:
            "CONVERTER",

        icon:
            "➜",

        description:
            "Konversi km/h, m/s, mph dan knot.",

        run:
            speedConverterTool

    },


    "pressure-converter": {

        title:
            "Pressure Converter",

        category:
            "CONVERTER",

        icon:
            "P",

        description:
            "Konversi Pascal, bar, PSI, atmosphere dan lainnya.",

        run:
            pressureConverterTool

    },


    "energy-converter": {

        title:
            "Energy Converter",

        category:
            "CONVERTER",

        icon:
            "⚡",

        description:
            "Konversi Joule, kWh, calorie, BTU dan lainnya.",

        run:
            energyConverterTool

    },


    "data-storage-converter": {

        title:
            "Data Storage Converter",

        category:
            "CONVERTER",

        icon:
            "◫",

        description:
            "Konversi Byte, KB, MB, GB, TB dan PB.",

        run:
            dataStorageConverterTool

    },


    "word-counter": {

        title:
            "Word Counter",

        category:
            "TEXT",

        icon:
            "T",

        description:
            "Hitung kata, karakter, kalimat dan paragraf.",

        run:
            wordCounterTool

    },


    "password-generator": {

        title:
            "Password Generator",

        category:
            "GENERATOR",

        icon:
            "*",

        description:
            "Buat password acak yang kuat dan aman.",

        run:
            passwordGeneratorTool

    },


    "fuel-consumption-calculator": {

        title:
            "Fuel Consumption Calculator",

        category:
            "ENGINEERING",

        icon:
            "⛽",

        description:
            "Hitung rata-rata konsumsi bahan bakar berdasarkan waktu operasi.",

        run:
            fuelConsumptionTool

    },


    "ohms-law-calculator": {

        title:
            "Ohm's Law Calculator",

        category:
            "ENGINEERING",

        icon:
            "Ω",

        description:
            "Hitung voltage, current atau resistance berdasarkan Hukum Ohm.",

        run:
            ohmsLawTool

    }

};


if (
    window.AREStyxExtraDatabase &&
    typeof window.AREStyxExtraDatabase === "object"
) {

    Object.assign(
        toolDatabase,
        window.AREStyxExtraDatabase
    );

}


/* =========================================================
   ALIASES
========================================================= */

const toolAliases = {

    "basic-calculator":
        "calculator",

    "calculator":
        "calculator"

};


/* =========================================================
   TOOL NOT READY
========================================================= */

function toolNotReady(
    name
) {

    workspace.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">
                ⚙
            </div>

            <h3>
                Tool Sedang Dikembangkan
            </h3>

            <p>
                ${name} belum tersedia pada versi AREStyx ini.
            </p>

            <a
                href="../index.html#allTools"
                class="tool-button tool-button-primary"
            >
                ← Kembali ke Semua Tools
            </a>

        </div>

    `;

}


/* =========================================================
   INITIALIZE
========================================================= */

function initializeTool() {

    const requestedTool =
        getToolName();


    const resolvedTool =
        toolAliases[
            requestedTool
        ] ||
        requestedTool;


    const tool =
        toolDatabase[
            resolvedTool
        ];


    if (!tool) {

        document.title =
            "Tool Coming Soon | AREStyx";


        if (toolTitle) {

            toolTitle.textContent =
                "AREStyx Tool";

        }


        if (toolDescription) {

            toolDescription.textContent =
                "Tool ini sedang dalam tahap pengembangan.";

        }


        if (toolCategory) {

            toolCategory.textContent =
                "COMING SOON";

        }


        if (toolIcon) {

            toolIcon.textContent =
                "⚙";

        }


        if (breadcrumbTool) {

            breadcrumbTool.textContent =
                requestedTool;

        }


        toolNotReady(
            requestedTool
        );


        return;

    }


    document.title =
        `${tool.title} | AREStyx`;


    if (toolTitle) {

        toolTitle.textContent =
            tool.title;

    }


    if (toolDescription) {

        toolDescription.textContent =
            tool.description;

    }


    if (toolCategory) {

        toolCategory.textContent =
            tool.category;

    }


    if (toolIcon) {

        toolIcon.textContent =
            tool.icon;

    }


    if (breadcrumbTool) {

        breadcrumbTool.textContent =
            tool.title;

    }


    tool.run();

}


/* =========================================================
   START
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeTool
    );

} else {

    initializeTool();

}


/* =========================================================
   END
   Powered by ARESTER GROUP
========================================================= */