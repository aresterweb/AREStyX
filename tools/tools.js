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
   LANGUAGE STATE

   tools.html previously had no language controller. The
   language layer below reads the same saved preference used
   by the homepage, adds the existing styled language button
   to the tool header, and translates only visible interface
   text. Input values and calculation logic are untouched.
========================================================= */

let currentToolLanguage =
    "id";

let activeToolId =
    "";

let activeToolDefinition =
    null;

let toolLanguageObserver =
    null;


try {

    const savedLanguage =
        localStorage.getItem(
            "arestyx-language"
        );


    if (
        savedLanguage === "id" ||
        savedLanguage === "en"
    ) {

        currentToolLanguage =
            savedLanguage;

    }

} catch {}


const toolTextTranslations =
    Object.freeze({

        "← Semua Tools":
            "← All Tools",

        "Memuat tool AREStyx...":
            "Loading AREStyx tool...",

        "Memuat tool...":
            "Loading tool...",

        "Gratis, Cepat dan Mudah":
            "Free, Fast and Easy",

        "Tool ini berjalan langsung melalui browser. AREStyx dirancang agar berbagai perhitungan dan pekerjaan digital dapat dilakukan dengan lebih cepat.":
            "This tool runs directly in your browser. AREStyx is designed to make calculations and digital tasks faster.",

        "Ekspresi kosong":
            "Expression is empty",

        "Ekspresi mengandung karakter tidak valid":
            "The expression contains invalid characters",

        "Angka tidak valid":
            "Invalid number",

        "Tanda kurung tidak seimbang":
            "Unbalanced parentheses",

        "Tidak dapat dibagi dengan nol":
            "Cannot divide by zero",

        "Ekspresi tidak valid":
            "Invalid expression",

        "Hasil tidak valid":
            "Invalid result",

        "HASIL":
            "RESULT",

        "Periksa kembali nilai yang dimasukkan.":
            "Check the values you entered.",

        "Input tidak valid":
            "Invalid input",

        "Hitung":
            "Calculate",

        "Persentase (%)":
            "Percentage (%)",

        "Dari Nilai":
            "Of Value",

        "UMUR":
            "AGE",

        "Tanggal Lahir":
            "Date of Birth",

        "Hitung Umur":
            "Calculate Age",

        "Masukkan tanggal lahir.":
            "Enter a date of birth.",

        "Tanggal lahir tidak boleh berada di masa depan.":
            "The date of birth cannot be in the future.",

        "Berat Badan (kg)":
            "Body Weight (kg)",

        "Tinggi Badan (cm)":
            "Height (cm)",

        "Hitung BMI":
            "Calculate BMI",

        "Berat badan kurang":
            "Underweight",

        "Berat badan berlebih":
            "Overweight",

        "Obesitas":
            "Obesity",

        "Tanggal Awal":
            "Start Date",

        "Tanggal Akhir":
            "End Date",

        "Hitung Selisih":
            "Calculate Difference",

        "SELISIH":
            "DIFFERENCE",

        "Masukkan kedua tanggal.":
            "Enter both dates.",

        "Waktu Mulai":
            "Start Time",

        "Waktu Selesai":
            "End Time",

        "Hitung Durasi":
            "Calculate Duration",

        "DURASI":
            "DURATION",

        "Masukkan waktu mulai dan selesai.":
            "Enter the start and end times.",

        "Daftar Angka":
            "Number List",

        "Daftar angka":
            "Number list",

        "Contoh: 10, 20, 30, 40":
            "Example: 10, 20, 30, 40",

        "Hitung Rata-rata":
            "Calculate Average",

        "RATA-RATA":
            "AVERAGE",

        "Masukkan minimal satu angka.":
            "Enter at least one number.",

        "Harga Awal":
            "Original Price",

        "Harga awal":
            "Original price",

        "Diskon (%)":
            "Discount (%)",

        "Hitung Diskon":
            "Calculate Discount",

        "HARGA AKHIR":
            "FINAL PRICE",

        "Nilai A":
            "Value A",

        "Nilai B":
            "Value B",

        "Sederhanakan":
            "Simplify",

        "RASIO":
            "RATIO",

        "Nilai":
            "Value",

        "Operasi":
            "Operation",

        "√ Akar Kuadrat":
            "√ Square Root",

        "Operasi tidak valid untuk nilai tersebut.":
            "The operation is not valid for that value.",

        "Jenis Satuan":
            "Unit Type",

        "Panjang":
            "Length",

        "Berat":
            "Weight",

        "Suhu":
            "Temperature",

        "Luas":
            "Area",

        "Kecepatan":
            "Speed",

        "Dari":
            "From",

        "Ke":
            "To",

        "Konversi":
            "Convert",

        "HASIL KONVERSI":
            "CONVERSION RESULT",

        "Meter Persegi":
            "Square Meter",

        "Kilometer Persegi":
            "Square Kilometer",

        "Meter Kubik":
            "Cubic Meter",

        "Kilometer/Jam":
            "Kilometer/Hour",

        "Meter/Detik":
            "Meter/Second",

        "Mile/Jam":
            "Mile/Hour",

        "Masukkan Teks":
            "Enter Text",

        "Ketik atau tempel teks...":
            "Type or paste text...",

        "Kata":
            "Words",

        "Karakter":
            "Characters",

        "Tanpa Spasi":
            "Without Spaces",

        "Kalimat":
            "Sentences",

        "Paragraf":
            "Paragraphs",

        "Panjang Password":
            "Password Length",

        "Salin":
            "Copy",

        "PASSWORD":
            "PASSWORD",

        "Password berhasil disalin.":
            "Password copied successfully.",

        "Clipboard tidak tersedia.":
            "Clipboard is unavailable.",

        "Fuel Awal (L)":
            "Starting Fuel (L)",

        "Fuel Akhir (L)":
            "Remaining Fuel (L)",

        "Lama Operasi (jam)":
            "Operating Time (hours)",

        "KONSUMSI":
            "CONSUMPTION",

        "Jam operasi harus lebih besar dari 0.":
            "Operating time must be greater than 0.",

        "Isi dua nilai dan kosongkan satu nilai yang ingin dihitung.":
            "Enter two values and leave the value to calculate empty.",

        "Isi tepat dua nilai dan kosongkan satu nilai.":
            "Enter exactly two values and leave one value empty.",

        "Kalkulator cepat untuk perhitungan sehari-hari.":
            "A fast calculator for everyday calculations.",

        "Hitung nilai persentase dengan cepat.":
            "Calculate percentage values quickly.",

        "Hitung umur berdasarkan tanggal lahir.":
            "Calculate age based on a date of birth.",

        "Hitung Body Mass Index berdasarkan berat dan tinggi badan.":
            "Calculate Body Mass Index from body weight and height.",

        "Hitung selisih antara dua tanggal.":
            "Calculate the difference between two dates.",

        "Hitung durasi antara dua waktu.":
            "Calculate the duration between two times.",

        "Hitung nilai rata-rata dari sejumlah angka.":
            "Calculate the average of multiple numbers.",

        "Hitung harga setelah diskon.":
            "Calculate the price after a discount.",

        "Hitung dan sederhanakan perbandingan angka.":
            "Calculate and simplify a number ratio.",

        "Kalkulator ilmiah untuk operasi matematika lanjutan.":
            "A scientific calculator for advanced mathematical operations.",

        "Konversi berbagai jenis satuan dalam satu tool.":
            "Convert multiple unit types in one tool.",

        "Konversi meter, kilometer, mile, inch, foot dan lainnya.":
            "Convert meters, kilometers, miles, inches, feet and more.",

        "Konversi kilogram, gram, pound, ounce dan lainnya.":
            "Convert kilograms, grams, pounds, ounces and more.",

        "Konversi Celsius, Fahrenheit dan Kelvin.":
            "Convert Celsius, Fahrenheit and Kelvin.",

        "Konversi berbagai satuan luas.":
            "Convert multiple area units.",

        "Konversi liter, meter kubik, gallon dan lainnya.":
            "Convert liters, cubic meters, gallons and more.",

        "Konversi km/h, m/s, mph dan knot.":
            "Convert km/h, m/s, mph and knots.",

        "Konversi Pascal, bar, PSI, atmosphere dan lainnya.":
            "Convert Pascal, bar, PSI, atmospheres and more.",

        "Konversi Joule, kWh, calorie, BTU dan lainnya.":
            "Convert Joules, kWh, calories, BTU and more.",

        "Konversi Byte, KB, MB, GB, TB dan PB.":
            "Convert Bytes, KB, MB, GB, TB and PB.",

        "Hitung kata, karakter, kalimat dan paragraf.":
            "Count words, characters, sentences and paragraphs.",

        "Buat password acak yang kuat dan aman.":
            "Generate a strong and secure random password.",

        "Hitung rata-rata konsumsi bahan bakar berdasarkan waktu operasi.":
            "Calculate average fuel consumption based on operating time.",

        "Hitung voltage, current atau resistance berdasarkan Hukum Ohm.":
            "Calculate voltage, current or resistance using Ohm's Law.",

        "Tool Sedang Dikembangkan":
            "Tool Under Development",

        "Tool ini sedang dalam tahap pengembangan.":
            "This tool is currently under development.",

        "← Kembali ke Semua Tools":
            "← Back to All Tools",

        "Masukkan angka yang valid.":
            "Enter a valid number.",

        "Masukkan bilangan bulat yang valid.":
            "Enter a valid integer.",

        "Daftar angka tidak valid.":
            "Invalid number list.",

        "Reset":
            "Reset",

        "Proses":
            "Process",

        "Teks":
            "Text",

        "Hasil siap disalin.":
            "The result is ready to copy.",

        "Pembilang 1":
            "Numerator 1",

        "Penyebut 1":
            "Denominator 1",

        "Pembilang 2":
            "Numerator 2",

        "Penyebut 2":
            "Denominator 2",

        "Penyebut tidak boleh 0.":
            "The denominator cannot be 0.",

        "Tidak dapat membagi dengan pecahan nol.":
            "Cannot divide by a zero fraction.",

        "Bilangan A":
            "Number A",

        "Bilangan B":
            "Number B",

        "detik":
            "seconds",

        "menit":
            "minutes",

        "jam":
            "hours",

        "hari":
            "days",

        "minggu":
            "weeks",

        "derajat":
            "degrees",

        "putaran":
            "revolutions",

        "Base64 tidak valid.":
            "Invalid Base64.",

        "URL encoding tidak valid.":
            "Invalid URL encoding.",

        "JSON tidak valid":
            "Invalid JSON",

        "JSON valid":
            "Valid JSON",

        "Sintaks berhasil diparse.":
            "The syntax was parsed successfully.",

        "URL atau query string":
            "URL or query string",

        "Jumlah kata":
            "Word count",

        "Basis asal":
            "Source base",

        "Biner (2)":
            "Binary (2)",

        "Oktal (8)":
            "Octal (8)",

        "Desimal (10)":
            "Decimal (10)",

        "Heksadesimal (16)":
            "Hexadecimal (16)",

        "Bilangan tidak valid atau terlalu besar.":
            "The number is invalid or too large.",

        "HEX harus 3 atau 6 digit.":
            "HEX must contain 3 or 6 digits.",

        "IPv4 tidak valid.":
            "Invalid IPv4 address.",

        "CIDR harus 0–32.":
            "CIDR must be between 0 and 32.",

        "Jumlah digit":
            "Number of digits",

        "PIN acak":
            "Random PIN",

        "Jumlah dadu":
            "Number of dice",

        "Sisi per dadu":
            "Sides per die",

        "Lempar":
            "Roll",

        "Lempar Koin":
            "Flip Coin",

        "Kepala":
            "Heads",

        "Ekor":
            "Tails",

        "Minimum":
            "Minimum",

        "Maksimum":
            "Maximum",

        "Rentang tidak valid.":
            "Invalid range.",

        "Rentang terlalu besar.":
            "The range is too large.",

        "Pilih gambar":
            "Choose Image",

        "Pilih gambar terlebih dahulu.":
            "Choose an image first.",

        "File harus berupa gambar.":
            "The file must be an image.",

        "Gambar tidak dapat dibaca.":
            "The image could not be read.",

        "Gagal membuat output gambar.":
            "Failed to create the output image.",

        "Lebar px":
            "Width px",

        "Tinggi px (0 = otomatis)":
            "Height px (0 = automatic)",

        "Lebar harus > 0.":
            "Width must be greater than 0.",

        "Kualitas 1–100":
            "Quality 1–100",

        "Format output":
            "Output format",

        "Preview hasil":
            "Result preview",

        "Grayscale selesai":
            "Grayscale complete",

        "Unduh hasil":
            "Download result",

        "Pokok pinjaman":
            "Loan principal",

        "Bunga per tahun (%)":
            "Annual interest (%)",

        "Tenor (bulan)":
            "Term (months)",

        "Estimasi matematis; biaya administrasi dan biaya produk finansial tidak dimasukkan.":
            "Mathematical estimate; administration fees and financial product charges are not included.",

        "Nilai tidak valid.":
            "Invalid value.",

        "Pokok":
            "Principal",

        "Waktu (tahun)":
            "Time (years)",

        "Modal awal":
            "Initial capital",

        "Tahun":
            "Years",

        "Compounding per tahun":
            "Compounding per year",

        "Frekuensi harus > 0.":
            "Frequency must be greater than 0.",

        "Biaya investasi":
            "Investment cost",

        "Nilai akhir/hasil":
            "Final value/return",

        "Biaya tidak boleh 0.":
            "Cost cannot be 0.",

        "Biaya":
            "Cost",

        "Harga jual":
            "Selling price",

        "Harga jual tidak boleh 0.":
            "Selling price cannot be 0.",

        "Pajak (%)":
            "Tax (%)",

        "Tambah pajak":
            "Add tax",

        "Nilai sudah termasuk pajak":
            "Tax-inclusive value",

        "Pajak tidak boleh negatif.":
            "Tax cannot be negative.",

        "Harga total":
            "Total price",

        "Jumlah/berat":
            "Quantity/weight",

        "Jumlah harus > 0.":
            "Quantity must be greater than 0.",

        "Harga per unit":
            "Price per unit",

        "Biaya tetap":
            "Fixed cost",

        "Harga jual per unit":
            "Selling price per unit",

        "Biaya variabel per unit":
            "Variable cost per unit",

        "Harga jual harus lebih besar dari biaya variabel.":
            "Selling price must be greater than variable cost.",

        "Target":
            "Target",

        "Tabungan sekarang":
            "Current savings",

        "Waktu (bulan)":
            "Time (months)",

        "Bulan harus > 0.":
            "Months must be greater than 0.",

        "Nilai awal":
            "Initial value",

        "Nilai akhir":
            "Final value",

        "Nilai harus valid dan tahun > 0.":
            "Values must be valid and years must be greater than 0.",

        "Harga perolehan":
            "Acquisition cost",

        "Nilai sisa":
            "Residual value",

        "Umur manfaat (tahun)":
            "Useful life (years)",

        "Periksa nilai sisa dan umur manfaat.":
            "Check the residual value and useful life.",

        "Depresiasi per tahun metode garis lurus":
            "Annual straight-line depreciation",

        "Total tagihan":
            "Total bill",

        "Jumlah orang":
            "Number of people",

        "Jumlah orang harus > 0.":
            "Number of people must be greater than 0.",

        "Diskon 1 (%)":
            "Discount 1 (%)",

        "Diskon 2 (%)":
            "Discount 2 (%)",

        "Diskon harus 0–100%.":
            "Discount must be between 0 and 100%.",

        "Tegangan (V)":
            "Voltage (V)",

        "Arus (A)":
            "Current (A)",

        "Resistansi Ω":
            "Resistance Ω",

        "Semua resistansi harus > 0.":
            "All resistance values must be greater than 0.",

        "Kapasitas (Ah)":
            "Capacity (Ah)",

        "Arus beban (A)":
            "Load current (A)",

        "Efisiensi usable (%)":
            "Usable efficiency (%)",

        "Arus beban harus > 0.":
            "Load current must be greater than 0.",

        "Estimasi ideal; kondisi nyata tergantung baterai dan beban.":
            "Ideal estimate; actual performance depends on the battery and load.",

        "Tegangan primer (V)":
            "Primary voltage (V)",

        "Lilitan primer":
            "Primary turns",

        "Lilitan sekunder":
            "Secondary turns",

        "Jumlah lilitan tidak boleh 0.":
            "The number of turns cannot be 0.",

        "Diketahui":
            "Known Value",

        "Frekuensi (Hz)":
            "Frequency (Hz)",

        "Periode (s)":
            "Period (s)",

        "Nilai harus > 0.":
            "Value must be greater than 0.",

        "Arah":
            "Direction",

        "RPM ke rad/s":
            "RPM to rad/s",

        "rad/s ke RPM":
            "rad/s to RPM",

        "Daya (kW)":
            "Power (kW)",

        "RPM harus > 0.":
            "RPM must be greater than 0.",

        "Gigi penggerak":
            "Driving gear teeth",

        "Gigi digerakkan":
            "Driven gear teeth",

        "RPM input":
            "Input RPM",

        "Jumlah gigi harus > 0.":
            "The number of gear teeth must be greater than 0.",

        "Tekanan (bar)":
            "Pressure (bar)",

        "Debit (L/min)":
            "Flow Rate (L/min)",

        "Efisiensi (%)":
            "Efficiency (%)",

        "Debit (m³/h)":
            "Flow Rate (m³/h)",

        "Diameter dalam (mm)":
            "Internal diameter (mm)",

        "Diameter harus > 0.":
            "Diameter must be greater than 0.",

        "Densitas ρ (kg/m³)":
            "Density ρ (kg/m³)",

        "Kecepatan (m/s)":
            "Velocity (m/s)",

        "Diameter (m)":
            "Diameter (m)",

        "Viskositas dinamis μ (Pa·s)":
            "Dynamic viscosity μ (Pa·s)",

        "Viskositas harus > 0.":
            "Viscosity must be greater than 0.",

        "Aliran cenderung laminar":
            "Flow is likely laminar",

        "Aliran cenderung turbulen":
            "Flow is likely turbulent",

        "Zona transisi":
            "Transition zone",

        "Tekanan (kPa)":
            "Pressure (kPa)",

        "Densitas fluida (kg/m³)":
            "Fluid density (kg/m³)",

        "Densitas harus > 0.":
            "Density must be greater than 0.",

        "Referensi air = 1000 kg/m³":
            "Water reference = 1000 kg/m³",

        "Rumus petroleum standar: SG = 141.5 / (API + 131.5).":
            "Standard petroleum formula: SG = 141.5 / (API + 131.5).",

        "Pitch propeller (m/rev)":
            "Propeller pitch (m/rev)",

        "Waktu (menit)":
            "Time (minutes)",

        "Jarak aktual (m)":
            "Actual distance (m)",

        "Jarak teoritis tidak boleh 0.":
            "Theoretical distance cannot be 0.",

        "Apparent slip sederhana; arus, wake, dan kondisi kapal dapat memengaruhi hasil.":
            "Simplified apparent slip; current, wake and vessel conditions can affect the result.",

        "Jumlah silinder":
            "Number of cylinders",

        "Silinder harus > 0.":
            "The number of cylinders must be greater than 0.",

        "Isi salah satu field.":
            "Fill in one of the fields.",

        "Tanggal tidak valid.":
            "Invalid date.",

        "Timestamp tidak valid.":
            "Invalid timestamp.",

        "JWT tidak valid.":
            "Invalid JWT.",

        "Signature tidak diverifikasi.":
            "The signature is not verified."

    });


const toolEnglishToIndonesian =
    Object.freeze(
        Object.fromEntries(
            Object.entries(
                toolTextTranslations
            )
                .map(
                    ([indonesian, english]) =>
                        [english, indonesian]
                )
        )
    );


const toolPhraseTranslations = [

    [/\bSetoran per bulan tanpa asumsi bunga\b/g, "Monthly deposit without assumed interest"],
    [/\bDiskon efektif\b/g, "Effective discount"],
    [/\bDensitas perkiraan\b/g, "Estimated density"],
    [/\bJarak teoritis\b/g, "Theoretical distance"],
    [/\bliter total displacement\b/g, "liters total displacement"],
    [/\bTotal penggunaan\b/g, "Total usage"],
    [/\bHarga per unit\b/g, "Price per unit"],
    [/\bRPM output\b/g, "Output RPM"],
    [/\/ tahun\b/g, "/ year"],
    [/\/ bulan\b/g, "/ month"],
    [/\/ orang\b/g, "/ person"],
    [/\bTahun\b/g, "Years"],
    [/\btahun\b/g, "years"],
    [/\bBulan\b/g, "Months"],
    [/\bbulan\b/g, "months"],
    [/\bHari\b/g, "Days"],
    [/\bhari\b/g, "days"],
    [/\bJam\b/g, "Hours"],
    [/\bjam\b/g, "hours"],
    [/\bMenit\b/g, "Minutes"],
    [/\bmenit\b/g, "minutes"],
    [/\bdetik\b/g, "seconds"],
    [/\bminggu\b/g, "weeks"],
    [/\bkarakter\b/g, "characters"],
    [/\bangka\b/g, "numbers"],
    [/\btanpa spasi\b/g, "without spaces"],
    [/\bkalimat\b/g, "sentences"],
    [/\bparagraf\b/g, "paragraphs"],
    [/\bkata unik\b/g, "unique words"],
    [/\bkata\b/g, "words"],
    [/\bnon-kosong\b/g, "non-empty"],
    [/\bkosong\b/g, "empty"],
    [/\bbaris\b/g, "lines"],
    [/\bpenggantian\b/g, "replacements"],
    [/\bparameter\b/g, "parameters"],
    [/\bresistor seri\b/g, "series resistors"],
    [/\bresistor paralel\b/g, "parallel resistors"],
    [/\bPerbandingan\b/g, "Ratio"],
    [/\bterhadap\b/g, "to"],
    [/\bPotongan\b/g, "Discount"],
    [/\bUkuran awal\b/g, "Original size"],
    [/\brasio\b/g, "ratio"],
    [/\bDiputar\b/g, "Rotated"],
    [/\bBasis asal\b/g, "Source base"],
    [/\bDesimal\b/g, "Decimal"],
    [/\bFPB\b/g, "GCD"],
    [/\bKPK\b/g, "LCM"],
    [/\bBunga\b/g, "Interest"],
    [/\bbunga\b/g, "interest"],
    [/\bNilai akhir\b/g, "Final value"],
    [/\bPertumbuhan\b/g, "Growth"],
    [/\bLaba\/rugi\b/g, "Profit/loss"],
    [/\bLaba\b/g, "Profit"],
    [/\bTambahan\b/g, "Addition"],
    [/\bPajak\b/g, "Tax"],
    [/\bDasar\b/g, "Base amount"],
    [/\bsisa\b/g, "remaining"],
    [/\bhemat\b/g, "savings"],
    [/\bRasio\b/g, "Ratio"],
    [/\bunit\b/g, "units"],
    [/\borang\b/g, "person"],
    [/\bdata\b/g, "data"],
    [/belum tersedia pada versi AREStyx ini\./g, "is not available in this AREStyx version."],
    [/% dari /g, "% of "]

];



const toolAdditionalTranslations =
    Object.freeze({
        "PANDUAN": "GUIDE",
        "Tools terkait": "Related tools",
        "Cara menggunakan": "How to use",
        "Pertanyaan umum": "Frequently asked questions",
        "Masukkan data pada kolom yang tersedia.": "Enter the requested data in the available fields.",
        "Tekan tombol proses atau hitung.": "Press the process or calculate button.",
        "Periksa hasil, satuan, dan detail yang ditampilkan.": "Review the displayed result, units, and details.",
        "Ya. Tool ini gratis dan dapat digunakan langsung melalui browser tanpa instalasi.": "Yes. This tool is free and works directly in your browser without installation.",
        "Apakah data dikirim ke server?": "Is data sent to a server?",
        "Perhitungan utama dijalankan secara lokal di browser. Tetap hindari memasukkan data rahasia pada layanan online apa pun.": "Core calculations run locally in your browser. Avoid entering confidential data into any online service.",
        "Pilih gambar": "Choose an image",
        "Preview hasil": "Preview result",
        "Pilih gambar terlebih dahulu.": "Choose an image first.",
        "Base64 tidak valid.": "Invalid Base64 input.",
        "URL encoding tidak valid.": "Invalid URL encoding.",
        "JSON tidak valid": "Invalid JSON",
        "URL atau query string": "URL or query string",
        "JWT tidak valid.": "Invalid JWT.",
        "Buat Hash": "Create Hash",
        "Tanggal tidak valid.": "Invalid date.",
        "Timestamp tidak valid.": "Invalid timestamp.",
        "Bilangan tidak valid atau terlalu besar.": "The number is invalid or too large.",
        "HEX harus 3 atau 6 digit.": "HEX must contain 3 or 6 digits.",
        "IPv4 tidak valid.": "Invalid IPv4 address.",
        "Rentang tidak valid.": "Invalid range.",
        "Jumlah kata": "Word count",
        "Bunga per tahun (%)": "Annual interest rate (%)",
        "Tenor (bulan)": "Term (months)",
        "Estimasi matematis; biaya administrasi dan biaya produk finansial tidak dimasukkan.": "Mathematical estimate; administrative and financial-product fees are not included.",
        "Nilai tidak valid.": "Invalid value.",
        "Waktu (tahun)": "Time (years)",
        "Compounding per tahun": "Compounding per year",
        "Nilai akhir/hasil": "Final value/result",
        "Jumlah/berat": "Quantity/weight",
        "Harga jual harus lebih besar dari biaya variabel.": "Selling price must be greater than variable cost.",
        "Waktu (bulan)": "Time (months)",
        "Bulan harus > 0.": "Months must be greater than 0.",
        "Nilai harus valid dan tahun > 0.": "Value must be valid and years must be greater than 0.",
        "Umur manfaat (tahun)": "Useful life (years)",
        "Periksa nilai sisa dan umur manfaat.": "Check the residual value and useful life.",
        "Depresiasi per tahun metode garis lurus": "Annual straight-line depreciation",
        "Estimasi ideal; kondisi nyata tergantung baterai dan beban.": "Ideal estimate; actual conditions depend on the battery and load.",
        "RPM ke rad/s": "RPM to rad/s",
        "rad/s ke RPM": "rad/s to RPM",
        "Daya (kW)": "Power (kW)",
        "Tekanan (bar)": "Pressure (bar)",
        "Kecepatan (m/s)": "Velocity (m/s)",
        "Tekanan (kPa)": "Pressure (kPa)",
        "Waktu (menit)": "Time (minutes)",
        "Apparent slip sederhana; arus, wake, dan kondisi kapal dapat memengaruhi hasil.": "Simplified apparent slip; current, wake, and vessel conditions can affect the result.",
        "Pembilang 1": "Numerator 1",
        "Penyebut 1": "Denominator 1",
        "Pembilang 2": "Numerator 2",
        "Penyebut 2": "Denominator 2",
        "Penyebut tidak boleh 0.": "A denominator cannot be 0.",
        "Tidak dapat membagi dengan pecahan nol.": "Cannot divide by a zero fraction.",
        "Hasil siap disalin.": "Result is ready to copy.",
        "Gunakan": "Use",
        "di AREStyx untuk perhitungan teknik dan marine engineering secara praktis. Proses utama berjalan langsung di browser agar cepat dan mudah digunakan.": "at AREStyx for practical engineering and marine calculations. Core processing runs directly in your browser for speed and convenience.",
        "INTERNAL LINKING": "RELATED TOOLS"
    });


const toolCatalogTranslations =
    Object.freeze({
    "Kalkulator": "Calculator",
    "Hitung ekspresi aritmetika dasar dengan parser aman.": "Calculate basic arithmetic expressions with a safe parser.",
    "Hitung ekspresi aritmetika dasar dengan parser aman. Gunakan": "Calculate basic arithmetic expressions with a safe parser. Use",
    "PANDUAN KALKULATOR": "GUIDE: CALCULATOR",
    "Kalkulator online gratis di AREStyx": "Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Kalkulator": "How to use Calculator",
    "Apakah Kalkulator gratis?": "Is Calculator free?",
    "kalkulator online gratis": "Free online Calculator",
    "Kalkulator Persentase": "Percentage Calculator",
    "Hitung persentase suatu nilai dengan cepat.": "Calculate a percentage of a value quickly.",
    "Hitung persentase suatu nilai dengan cepat. Gunakan": "Calculate a percentage of a value quickly. Use",
    "PANDUAN KALKULATOR PERSENTASE": "GUIDE: PERCENTAGE CALCULATOR",
    "Kalkulator Persentase online gratis di AREStyx": "Percentage Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Kalkulator Persentase": "How to use Percentage Calculator",
    "Apakah Kalkulator Persentase gratis?": "Is Percentage Calculator free?",
    "kalkulator persentase online gratis": "Free online Percentage Calculator",
    "Kalkulator Umur": "Age Calculator",
    "Hitung umur lengkap berdasarkan tanggal lahir.": "Calculate age from a date of birth.",
    "Hitung umur lengkap berdasarkan tanggal lahir. Gunakan": "Calculate age from a date of birth. Use",
    "PANDUAN KALKULATOR UMUR": "GUIDE: AGE CALCULATOR",
    "Kalkulator Umur online gratis di AREStyx": "Age Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Kalkulator Umur": "How to use Age Calculator",
    "Apakah Kalkulator Umur gratis?": "Is Age Calculator free?",
    "kalkulator umur online gratis": "Free online Age Calculator",
    "Kalkulator BMI": "BMI Calculator",
    "Hitung indeks massa tubuh dari berat dan tinggi.": "Calculate body mass index from weight and height.",
    "Hitung indeks massa tubuh dari berat dan tinggi. Gunakan": "Calculate body mass index from weight and height. Use",
    "PANDUAN KALKULATOR BMI": "GUIDE: BMI CALCULATOR",
    "Kalkulator BMI online gratis di AREStyx": "BMI Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Kalkulator BMI": "How to use BMI Calculator",
    "Apakah Kalkulator BMI gratis?": "Is BMI Calculator free?",
    "kalkulator bmi online gratis": "Free online BMI Calculator",
    "Selisih Tanggal": "Date Difference",
    "Hitung selisih hari antara dua tanggal.": "Calculate the number of days between two dates.",
    "Hitung selisih hari antara dua tanggal. Gunakan": "Calculate the number of days between two dates. Use",
    "PANDUAN SELISIH TANGGAL": "GUIDE: DATE DIFFERENCE",
    "Selisih Tanggal online gratis di AREStyx": "Date Difference — Free Online Tool at AREStyx",
    "Cara menggunakan Selisih Tanggal": "How to use Date Difference",
    "Apakah Selisih Tanggal gratis?": "Is Date Difference free?",
    "selisih tanggal online gratis": "Free online Date Difference",
    "Kalkulator Durasi Waktu": "Time Duration Calculator",
    "Hitung durasi antara dua waktu, termasuk melewati tengah malam.": "Calculate duration between two times, including overnight spans.",
    "Hitung durasi antara dua waktu, termasuk melewati tengah malam. Gunakan": "Calculate duration between two times, including overnight spans. Use",
    "PANDUAN KALKULATOR DURASI WAKTU": "GUIDE: TIME DURATION CALCULATOR",
    "Kalkulator Durasi Waktu online gratis di AREStyx": "Time Duration Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Kalkulator Durasi Waktu": "How to use Time Duration Calculator",
    "Apakah Kalkulator Durasi Waktu gratis?": "Is Time Duration Calculator free?",
    "kalkulator durasi waktu online gratis": "Free online Time Duration Calculator",
    "Kalkulator Rata-rata": "Average Calculator",
    "Hitung rata-rata dari daftar angka.": "Calculate the mean of a list of numbers.",
    "Hitung rata-rata dari daftar angka. Gunakan": "Calculate the mean of a list of numbers. Use",
    "PANDUAN KALKULATOR RATA-RATA": "GUIDE: AVERAGE CALCULATOR",
    "Kalkulator Rata-rata online gratis di AREStyx": "Average Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Kalkulator Rata-rata": "How to use Average Calculator",
    "Apakah Kalkulator Rata-rata gratis?": "Is Average Calculator free?",
    "kalkulator rata-rata online gratis": "Free online Average Calculator",
    "Kalkulator Diskon": "Discount Calculator",
    "Hitung harga akhir dan nilai penghematan setelah diskon.": "Calculate final price and savings after a discount.",
    "Hitung harga akhir dan nilai penghematan setelah diskon. Gunakan": "Calculate final price and savings after a discount. Use",
    "PANDUAN KALKULATOR DISKON": "GUIDE: DISCOUNT CALCULATOR",
    "Kalkulator Diskon online gratis di AREStyx": "Discount Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Kalkulator Diskon": "How to use Discount Calculator",
    "Apakah Kalkulator Diskon gratis?": "Is Discount Calculator free?",
    "kalkulator diskon online gratis": "Free online Discount Calculator",
    "Kalkulator Rasio": "Ratio Calculator",
    "Sederhanakan rasio dua bilangan bulat.": "Simplify a ratio of two integers.",
    "Sederhanakan rasio dua bilangan bulat. Gunakan": "Simplify a ratio of two integers. Use",
    "PANDUAN KALKULATOR RASIO": "GUIDE: RATIO CALCULATOR",
    "Kalkulator Rasio online gratis di AREStyx": "Ratio Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Kalkulator Rasio": "How to use Ratio Calculator",
    "Apakah Kalkulator Rasio gratis?": "Is Ratio Calculator free?",
    "kalkulator rasio online gratis": "Free online Ratio Calculator",
    "Kalkulator Ilmiah": "Scientific Calculator",
    "Hitung ekspresi ilmiah tanpa eksekusi kode dinamis.": "Evaluate scientific expressions without dynamic code execution.",
    "Hitung ekspresi ilmiah tanpa eksekusi kode dinamis. Gunakan": "Evaluate scientific expressions without dynamic code execution. Use",
    "PANDUAN KALKULATOR ILMIAH": "GUIDE: SCIENTIFIC CALCULATOR",
    "Kalkulator Ilmiah online gratis di AREStyx": "Scientific Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Kalkulator Ilmiah": "How to use Scientific Calculator",
    "Apakah Kalkulator Ilmiah gratis?": "Is Scientific Calculator free?",
    "kalkulator ilmiah online gratis": "Free online Scientific Calculator",
    "Kalkulator Pecahan": "Fraction Calculator",
    "Tambah, kurang, kali, atau bagi dua pecahan.": "Add, subtract, multiply, or divide two fractions.",
    "Tambah, kurang, kali, atau bagi dua pecahan. Gunakan": "Add, subtract, multiply, or divide two fractions. Use",
    "PANDUAN KALKULATOR PECAHAN": "GUIDE: FRACTION CALCULATOR",
    "Kalkulator Pecahan online gratis di AREStyx": "Fraction Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Kalkulator Pecahan": "How to use Fraction Calculator",
    "Apakah Kalkulator Pecahan gratis?": "Is Fraction Calculator free?",
    "kalkulator pecahan online gratis": "Free online Fraction Calculator",
    "FPB & KPK": "GCD & LCM",
    "Hitung faktor persekutuan terbesar dan kelipatan persekutuan terkecil.": "Calculate greatest common divisor and least common multiple.",
    "Hitung faktor persekutuan terbesar dan kelipatan persekutuan terkecil. Gunakan": "Calculate greatest common divisor and least common multiple. Use",
    "PANDUAN FPB & KPK": "GUIDE: GCD & LCM",
    "FPB & KPK online gratis di AREStyx": "GCD & LCM — Free Online Tool at AREStyx",
    "Cara menggunakan FPB & KPK": "How to use GCD & LCM",
    "Apakah FPB & KPK gratis?": "Is GCD & LCM free?",
    "fpb & kpk online gratis": "Free online GCD & LCM",
    "Kalkulator Median": "Median Calculator",
    "Hitung median dari daftar angka.": "Calculate the median of a list of numbers.",
    "Hitung median dari daftar angka. Gunakan": "Calculate the median of a list of numbers. Use",
    "PANDUAN KALKULATOR MEDIAN": "GUIDE: MEDIAN CALCULATOR",
    "Kalkulator Median online gratis di AREStyx": "Median Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Kalkulator Median": "How to use Median Calculator",
    "Apakah Kalkulator Median gratis?": "Is Median Calculator free?",
    "kalkulator median online gratis": "Free online Median Calculator",
    "Standar Deviasi": "Standard Deviation",
    "Hitung standar deviasi populasi dan sampel.": "Calculate population and sample standard deviation.",
    "Hitung standar deviasi populasi dan sampel. Gunakan": "Calculate population and sample standard deviation. Use",
    "PANDUAN STANDAR DEVIASI": "GUIDE: STANDARD DEVIATION",
    "Standar Deviasi online gratis di AREStyx": "Standard Deviation — Free Online Tool at AREStyx",
    "Cara menggunakan Standar Deviasi": "How to use Standard Deviation",
    "Apakah Standar Deviasi gratis?": "Is Standard Deviation free?",
    "standar deviasi online gratis": "Free online Standard Deviation",
    "Konverter Satuan Universal": "Universal Unit Converter",
    "Konversi panjang, massa, area, volume, kecepatan, dan energi dalam satu tool.": "Convert length, mass, area, volume, speed, and energy in one tool.",
    "Konversi panjang, massa, area, volume, kecepatan, dan energi dalam satu tool. Gunakan": "Convert length, mass, area, volume, speed, and energy in one tool. Use",
    "PANDUAN KONVERTER SATUAN UNIVERSAL": "GUIDE: UNIVERSAL UNIT CONVERTER",
    "Konverter Satuan Universal online gratis di AREStyx": "Universal Unit Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Konverter Satuan Universal": "How to use Universal Unit Converter",
    "Apakah Konverter Satuan Universal gratis?": "Is Universal Unit Converter free?",
    "konverter satuan universal online gratis": "Free online Universal Unit Converter",
    "Konverter Panjang": "Length Converter",
    "Konversi meter, kilometer, mil, kaki dan satuan panjang lainnya.": "Convert meter, kilometer, mil, kaki dan satuan panjang lainnya.",
    "Konversi meter, kilometer, mil, kaki dan satuan panjang lainnya. Gunakan": "Convert meter, kilometer, mil, kaki dan satuan panjang lainnya. Use",
    "PANDUAN KONVERTER PANJANG": "GUIDE: LENGTH CONVERTER",
    "Konverter Panjang online gratis di AREStyx": "Length Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Konverter Panjang": "How to use Length Converter",
    "Apakah Konverter Panjang gratis?": "Is Length Converter free?",
    "konverter panjang online gratis": "Free online Length Converter",
    "Konverter Berat": "Weight Converter",
    "Konversi kilogram, gram, pound, ounce dan satuan massa lainnya.": "Convert kilogram, gram, pound, ounce dan satuan massa lainnya.",
    "Konversi kilogram, gram, pound, ounce dan satuan massa lainnya. Gunakan": "Convert kilogram, gram, pound, ounce dan satuan massa lainnya. Use",
    "PANDUAN KONVERTER BERAT": "GUIDE: WEIGHT CONVERTER",
    "Konverter Berat online gratis di AREStyx": "Weight Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Konverter Berat": "How to use Weight Converter",
    "Apakah Konverter Berat gratis?": "Is Weight Converter free?",
    "konverter berat online gratis": "Free online Weight Converter",
    "Konverter Suhu": "Temperature Converter",
    "Konversi Celsius, Fahrenheit dan Kelvin.": "Convert Celsius, Fahrenheit dan Kelvin.",
    "Konversi Celsius, Fahrenheit dan Kelvin. Gunakan": "Convert Celsius, Fahrenheit dan Kelvin. Use",
    "PANDUAN KONVERTER SUHU": "GUIDE: TEMPERATURE CONVERTER",
    "Konverter Suhu online gratis di AREStyx": "Temperature Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Konverter Suhu": "How to use Temperature Converter",
    "Apakah Konverter Suhu gratis?": "Is Temperature Converter free?",
    "konverter suhu online gratis": "Free online Temperature Converter",
    "Konverter Luas": "Area Converter",
    "Konversi meter persegi, hektar, acre dan satuan luas lainnya.": "Convert meter persegi, hektar, acre dan satuan luas lainnya.",
    "Konversi meter persegi, hektar, acre dan satuan luas lainnya. Gunakan": "Convert meter persegi, hektar, acre dan satuan luas lainnya. Use",
    "PANDUAN KONVERTER LUAS": "GUIDE: AREA CONVERTER",
    "Konverter Luas online gratis di AREStyx": "Area Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Konverter Luas": "How to use Area Converter",
    "Apakah Konverter Luas gratis?": "Is Area Converter free?",
    "konverter luas online gratis": "Free online Area Converter",
    "Konverter Volume": "Volume Converter",
    "Konversi liter, meter kubik, gallon dan satuan volume lainnya.": "Convert liter, meter kubik, gallon dan satuan volume lainnya.",
    "Konversi liter, meter kubik, gallon dan satuan volume lainnya. Gunakan": "Convert liter, meter kubik, gallon dan satuan volume lainnya. Use",
    "PANDUAN KONVERTER VOLUME": "GUIDE: VOLUME CONVERTER",
    "Konverter Volume online gratis di AREStyx": "Volume Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Konverter Volume": "How to use Volume Converter",
    "Apakah Konverter Volume gratis?": "Is Volume Converter free?",
    "konverter volume online gratis": "Free online Volume Converter",
    "Konverter Kecepatan": "Speed Converter",
    "Konversi km/jam, m/s, mph dan knot.": "Convert km/jam, m/s, mph dan knot.",
    "Konversi km/jam, m/s, mph dan knot. Gunakan": "Convert km/jam, m/s, mph dan knot. Use",
    "PANDUAN KONVERTER KECEPATAN": "GUIDE: SPEED CONVERTER",
    "Konverter Kecepatan online gratis di AREStyx": "Speed Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Konverter Kecepatan": "How to use Speed Converter",
    "Apakah Konverter Kecepatan gratis?": "Is Speed Converter free?",
    "konverter kecepatan online gratis": "Free online Speed Converter",
    "Konverter Tekanan": "Pressure Converter",
    "Konversi Pascal, bar, PSI dan atmosphere.": "Convert Pascal, bar, PSI dan atmosphere.",
    "Konversi Pascal, bar, PSI dan atmosphere. Gunakan": "Convert Pascal, bar, PSI dan atmosphere. Use",
    "PANDUAN KONVERTER TEKANAN": "GUIDE: PRESSURE CONVERTER",
    "Konverter Tekanan online gratis di AREStyx": "Pressure Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Konverter Tekanan": "How to use Pressure Converter",
    "Apakah Konverter Tekanan gratis?": "Is Pressure Converter free?",
    "konverter tekanan online gratis": "Free online Pressure Converter",
    "Konverter Energi": "Energy Converter",
    "Konversi Joule, kWh, kalori dan BTU.": "Convert Joule, kWh, kalori dan BTU.",
    "Konversi Joule, kWh, kalori dan BTU. Gunakan": "Convert Joule, kWh, kalori dan BTU. Use",
    "PANDUAN KONVERTER ENERGI": "GUIDE: ENERGY CONVERTER",
    "Konverter Energi online gratis di AREStyx": "Energy Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Konverter Energi": "How to use Energy Converter",
    "Apakah Konverter Energi gratis?": "Is Energy Converter free?",
    "konverter energi online gratis": "Free online Energy Converter",
    "Konverter Penyimpanan Data": "Data Storage Converter",
    "Konversi Byte, KB, MB, GB, TB dan PB.": "Convert Byte, KB, MB, GB, TB dan PB.",
    "Konversi Byte, KB, MB, GB, TB dan PB. Gunakan": "Convert Byte, KB, MB, GB, TB dan PB. Use",
    "PANDUAN KONVERTER PENYIMPANAN DATA": "GUIDE: DATA STORAGE CONVERTER",
    "Konverter Penyimpanan Data online gratis di AREStyx": "Data Storage Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Konverter Penyimpanan Data": "How to use Data Storage Converter",
    "Apakah Konverter Penyimpanan Data gratis?": "Is Data Storage Converter free?",
    "konverter penyimpanan data online gratis": "Free online Data Storage Converter",
    "Konverter Satuan Waktu": "Time Unit Converter",
    "Konversi detik, menit, jam, hari dan minggu.": "Convert detik, menit, jam, hari dan minggu.",
    "Konversi detik, menit, jam, hari dan minggu. Gunakan": "Convert detik, menit, jam, hari dan minggu. Use",
    "PANDUAN KONVERTER SATUAN WAKTU": "GUIDE: TIME UNIT CONVERTER",
    "Konverter Satuan Waktu online gratis di AREStyx": "Time Unit Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Konverter Satuan Waktu": "How to use Time Unit Converter",
    "Apakah Konverter Satuan Waktu gratis?": "Is Time Unit Converter free?",
    "konverter satuan waktu online gratis": "Free online Time Unit Converter",
    "Konverter Sudut": "Angle Converter",
    "Konversi derajat, radian dan gradian.": "Convert derajat, radian dan gradian.",
    "Konversi derajat, radian dan gradian. Gunakan": "Convert derajat, radian dan gradian. Use",
    "PANDUAN KONVERTER SUDUT": "GUIDE: ANGLE CONVERTER",
    "Konverter Sudut online gratis di AREStyx": "Angle Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Konverter Sudut": "How to use Angle Converter",
    "Apakah Konverter Sudut gratis?": "Is Angle Converter free?",
    "konverter sudut online gratis": "Free online Angle Converter",
    "Konverter Frekuensi": "Frequency Converter",
    "Konversi Hz, kHz, MHz dan GHz.": "Convert Hz, kHz, MHz dan GHz.",
    "Konversi Hz, kHz, MHz dan GHz. Gunakan": "Convert Hz, kHz, MHz dan GHz. Use",
    "PANDUAN KONVERTER FREKUENSI": "GUIDE: FREQUENCY CONVERTER",
    "Konverter Frekuensi online gratis di AREStyx": "Frequency Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Konverter Frekuensi": "How to use Frequency Converter",
    "Apakah Konverter Frekuensi gratis?": "Is Frequency Converter free?",
    "konverter frekuensi online gratis": "Free online Frequency Converter",
    "Konverter Gaya": "Force Converter",
    "Konversi Newton, kilonewton, kilogram-force dan pound-force.": "Convert Newton, kilonewton, kilogram-force dan pound-force.",
    "Konversi Newton, kilonewton, kilogram-force dan pound-force. Gunakan": "Convert Newton, kilonewton, kilogram-force dan pound-force. Use",
    "PANDUAN KONVERTER GAYA": "GUIDE: FORCE CONVERTER",
    "Konverter Gaya online gratis di AREStyx": "Force Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Konverter Gaya": "How to use Force Converter",
    "Apakah Konverter Gaya gratis?": "Is Force Converter free?",
    "konverter gaya online gratis": "Free online Force Converter",
    "Konverter Daya": "Power Converter",
    "Konversi Watt, kW, horsepower dan BTU/jam.": "Convert Watt, kW, horsepower dan BTU/jam.",
    "Konversi Watt, kW, horsepower dan BTU/jam. Gunakan": "Convert Watt, kW, horsepower dan BTU/jam. Use",
    "PANDUAN KONVERTER DAYA": "GUIDE: POWER CONVERTER",
    "Konverter Daya online gratis di AREStyx": "Power Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Konverter Daya": "How to use Power Converter",
    "Apakah Konverter Daya gratis?": "Is Power Converter free?",
    "konverter daya online gratis": "Free online Power Converter",
    "Konverter Torsi": "Torque Converter",
    "Konversi N·m, kN·m, lb-ft dan kgf·m.": "Convert N·m, kN·m, lb-ft dan kgf·m.",
    "Konversi N·m, kN·m, lb-ft dan kgf·m. Gunakan": "Convert N·m, kN·m, lb-ft dan kgf·m. Use",
    "PANDUAN KONVERTER TORSI": "GUIDE: TORQUE CONVERTER",
    "Konverter Torsi online gratis di AREStyx": "Torque Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Konverter Torsi": "How to use Torque Converter",
    "Apakah Konverter Torsi gratis?": "Is Torque Converter free?",
    "konverter torsi online gratis": "Free online Torque Converter",
    "Konverter Densitas": "Density Converter",
    "Konversi kg/m³, g/cm³ dan lb/ft³.": "Convert kg/m³, g/cm³ dan lb/ft³.",
    "Konversi kg/m³, g/cm³ dan lb/ft³. Gunakan": "Convert kg/m³, g/cm³ dan lb/ft³. Use",
    "PANDUAN KONVERTER DENSITAS": "GUIDE: DENSITY CONVERTER",
    "Konverter Densitas online gratis di AREStyx": "Density Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Konverter Densitas": "How to use Density Converter",
    "Apakah Konverter Densitas gratis?": "Is Density Converter free?",
    "konverter densitas online gratis": "Free online Density Converter",
    "Konverter Debit": "Flow Rate Converter",
    "Konversi L/s, L/min, m³/jam dan gallon/min.": "Convert L/s, L/min, m³/jam dan gallon/min.",
    "Konversi L/s, L/min, m³/jam dan gallon/min. Gunakan": "Convert L/s, L/min, m³/jam dan gallon/min. Use",
    "PANDUAN KONVERTER DEBIT": "GUIDE: FLOW RATE CONVERTER",
    "Konverter Debit online gratis di AREStyx": "Flow Rate Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Konverter Debit": "How to use Flow Rate Converter",
    "Apakah Konverter Debit gratis?": "Is Flow Rate Converter free?",
    "konverter debit online gratis": "Free online Flow Rate Converter",
    "Penghitung Kata": "Word Counter",
    "Hitung kata, karakter, kalimat, dan paragraf.": "Hitung kata, karakter, kalimat, dan paragraf.",
    "Hitung kata, karakter, kalimat, dan paragraf. Gunakan": "Hitung kata, karakter, kalimat, dan paragraf. Use",
    "PANDUAN PENGHITUNG KATA": "GUIDE: WORD COUNTER",
    "Penghitung Kata online gratis di AREStyx": "Word Counter — Free Online Tool at AREStyx",
    "Cara menggunakan Penghitung Kata": "How to use Word Counter",
    "Apakah Penghitung Kata gratis?": "Is Word Counter free?",
    "penghitung kata online gratis": "Free online Word Counter",
    "Penghitung Karakter": "Character Counter",
    "Hitung karakter dengan dan tanpa spasi.": "Hitung karakter dengan dan tanpa spasi.",
    "Hitung karakter dengan dan tanpa spasi. Gunakan": "Hitung karakter dengan dan tanpa spasi. Use",
    "PANDUAN PENGHITUNG KARAKTER": "GUIDE: CHARACTER COUNTER",
    "Penghitung Karakter online gratis di AREStyx": "Character Counter — Free Online Tool at AREStyx",
    "Cara menggunakan Penghitung Karakter": "How to use Character Counter",
    "Apakah Penghitung Karakter gratis?": "Is Character Counter free?",
    "penghitung karakter online gratis": "Free online Character Counter",
    "Pengubah Huruf": "Case Converter",
    "Ubah teks menjadi UPPERCASE, lowercase, Title Case, atau Sentence case.": "Ubah teks menjadi UPPERCASE, lowercase, Title Case, atau Sentence case.",
    "Ubah teks menjadi UPPERCASE, lowercase, Title Case, atau Sentence case. Gunakan": "Ubah teks menjadi UPPERCASE, lowercase, Title Case, atau Sentence case. Use",
    "PANDUAN PENGUBAH HURUF": "GUIDE: CASE CONVERTER",
    "Pengubah Huruf online gratis di AREStyx": "Case Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Pengubah Huruf": "How to use Case Converter",
    "Apakah Pengubah Huruf gratis?": "Is Case Converter free?",
    "pengubah huruf online gratis": "Free online Case Converter",
    "Pembersih Spasi": "Whitespace Cleaner",
    "Rapikan spasi ganda dan spasi berlebih.": "Rapikan spasi ganda dan spasi berlebih.",
    "Rapikan spasi ganda dan spasi berlebih. Gunakan": "Rapikan spasi ganda dan spasi berlebih. Use",
    "PANDUAN PEMBERSIH SPASI": "GUIDE: WHITESPACE CLEANER",
    "Pembersih Spasi online gratis di AREStyx": "Whitespace Cleaner — Free Online Tool at AREStyx",
    "Cara menggunakan Pembersih Spasi": "How to use Whitespace Cleaner",
    "Apakah Pembersih Spasi gratis?": "Is Whitespace Cleaner free?",
    "pembersih spasi online gratis": "Free online Whitespace Cleaner",
    "Hapus Baris Duplikat": "Duplicate Line Remover",
    "Hapus baris yang sama sambil mempertahankan urutan.": "Hapus baris yang sama sambil mempertahankan urutan.",
    "Hapus baris yang sama sambil mempertahankan urutan. Gunakan": "Hapus baris yang sama sambil mempertahankan urutan. Use",
    "PANDUAN HAPUS BARIS DUPLIKAT": "GUIDE: DUPLICATE LINE REMOVER",
    "Hapus Baris Duplikat online gratis di AREStyx": "Duplicate Line Remover — Free Online Tool at AREStyx",
    "Cara menggunakan Hapus Baris Duplikat": "How to use Duplicate Line Remover",
    "Apakah Hapus Baris Duplikat gratis?": "Is Duplicate Line Remover free?",
    "hapus baris duplikat online gratis": "Free online Duplicate Line Remover",
    "Pengurut Baris": "Line Sorter",
    "Urutkan baris A-Z, Z-A, atau numerik.": "Urutkan baris A-Z, Z-A, atau numerik.",
    "Urutkan baris A-Z, Z-A, atau numerik. Gunakan": "Urutkan baris A-Z, Z-A, atau numerik. Use",
    "PANDUAN PENGURUT BARIS": "GUIDE: LINE SORTER",
    "Pengurut Baris online gratis di AREStyx": "Line Sorter — Free Online Tool at AREStyx",
    "Cara menggunakan Pengurut Baris": "How to use Line Sorter",
    "Apakah Pengurut Baris gratis?": "Is Line Sorter free?",
    "pengurut baris online gratis": "Free online Line Sorter",
    "Pembalik Teks": "Reverse Text",
    "Balik karakter atau urutan baris.": "Balik karakter atau urutan baris.",
    "Balik karakter atau urutan baris. Gunakan": "Balik karakter atau urutan baris. Use",
    "PANDUAN PEMBALIK TEKS": "GUIDE: REVERSE TEXT",
    "Pembalik Teks online gratis di AREStyx": "Reverse Text — Free Online Tool at AREStyx",
    "Cara menggunakan Pembalik Teks": "How to use Reverse Text",
    "Apakah Pembalik Teks gratis?": "Is Reverse Text free?",
    "pembalik teks online gratis": "Free online Reverse Text",
    "Cari & Ganti": "Find & Replace",
    "Cari teks dan ganti semua kemunculannya.": "Cari teks dan ganti semua kemunculannya.",
    "Cari teks dan ganti semua kemunculannya. Gunakan": "Cari teks dan ganti semua kemunculannya. Use",
    "PANDUAN CARI & GANTI": "GUIDE: FIND & REPLACE",
    "Cari & Ganti online gratis di AREStyx": "Find & Replace — Free Online Tool at AREStyx",
    "Cara menggunakan Cari & Ganti": "How to use Find & Replace",
    "Apakah Cari & Ganti gratis?": "Is Find & Replace free?",
    "cari & ganti online gratis": "Free online Find & Replace",
    "Generator Slug": "Slug Generator",
    "Ubah judul menjadi slug URL yang bersih.": "Ubah judul menjadi slug URL yang bersih.",
    "Ubah judul menjadi slug URL yang bersih. Gunakan": "Ubah judul menjadi slug URL yang bersih. Use",
    "PANDUAN GENERATOR SLUG": "GUIDE: SLUG GENERATOR",
    "Generator Slug online gratis di AREStyx": "Slug Generator — Free Online Tool at AREStyx",
    "Cara menggunakan Generator Slug": "How to use Slug Generator",
    "Apakah Generator Slug gratis?": "Is Slug Generator free?",
    "generator slug online gratis": "Free online Slug Generator",
    "Penghitung Baris": "Line Counter",
    "Hitung jumlah baris, baris kosong, dan baris non-kosong.": "Hitung jumlah baris, baris kosong, dan baris non-kosong.",
    "Hitung jumlah baris, baris kosong, dan baris non-kosong. Gunakan": "Hitung jumlah baris, baris kosong, dan baris non-kosong. Use",
    "PANDUAN PENGHITUNG BARIS": "GUIDE: LINE COUNTER",
    "Penghitung Baris online gratis di AREStyx": "Line Counter — Free Online Tool at AREStyx",
    "Cara menggunakan Penghitung Baris": "How to use Line Counter",
    "Apakah Penghitung Baris gratis?": "Is Line Counter free?",
    "penghitung baris online gratis": "Free online Line Counter",
    "Frekuensi Kata": "Word Frequency",
    "Tampilkan kata yang paling sering muncul.": "Tampilkan kata yang paling sering muncul.",
    "Tampilkan kata yang paling sering muncul. Gunakan": "Tampilkan kata yang paling sering muncul. Use",
    "PANDUAN FREKUENSI KATA": "GUIDE: WORD FREQUENCY",
    "Frekuensi Kata online gratis di AREStyx": "Word Frequency — Free Online Tool at AREStyx",
    "Cara menggunakan Frekuensi Kata": "How to use Word Frequency",
    "Apakah Frekuensi Kata gratis?": "Is Word Frequency free?",
    "frekuensi kata online gratis": "Free online Word Frequency",
    "Ekstrak Email": "Email Extractor",
    "Ambil alamat email unik dari teks.": "Ambil alamat email unik dari teks.",
    "Ambil alamat email unik dari teks. Gunakan": "Ambil alamat email unik dari teks. Use",
    "PANDUAN EKSTRAK EMAIL": "GUIDE: EMAIL EXTRACTOR",
    "Ekstrak Email online gratis di AREStyx": "Email Extractor — Free Online Tool at AREStyx",
    "Cara menggunakan Ekstrak Email": "How to use Email Extractor",
    "Apakah Ekstrak Email gratis?": "Is Email Extractor free?",
    "ekstrak email online gratis": "Free online Email Extractor",
    "Ekstrak URL": "URL Extractor",
    "Ambil URL unik dari teks.": "Ambil URL unik dari teks.",
    "Ambil URL unik dari teks. Gunakan": "Ambil URL unik dari teks. Use",
    "PANDUAN EKSTRAK URL": "GUIDE: URL EXTRACTOR",
    "Ekstrak URL online gratis di AREStyx": "URL Extractor — Free Online Tool at AREStyx",
    "Cara menggunakan Ekstrak URL": "How to use URL Extractor",
    "Apakah Ekstrak URL gratis?": "Is URL Extractor free?",
    "ekstrak url online gratis": "Free online URL Extractor",
    "Hapus Baris Kosong": "Blank Line Remover",
    "Hapus semua baris kosong dari teks.": "Hapus semua baris kosong dari teks.",
    "Hapus semua baris kosong dari teks. Gunakan": "Hapus semua baris kosong dari teks. Use",
    "PANDUAN HAPUS BARIS KOSONG": "GUIDE: BLANK LINE REMOVER",
    "Hapus Baris Kosong online gratis di AREStyx": "Blank Line Remover — Free Online Tool at AREStyx",
    "Cara menggunakan Hapus Baris Kosong": "How to use Blank Line Remover",
    "Apakah Hapus Baris Kosong gratis?": "Is Blank Line Remover free?",
    "hapus baris kosong online gratis": "Free online Blank Line Remover",
    "Info Gambar": "Image Info",
    "Baca dimensi, ukuran file, tipe, dan rasio aspek gambar.": "Baca dimensi, ukuran file, tipe, dan rasio aspek gambar.",
    "Baca dimensi, ukuran file, tipe, dan rasio aspek gambar. Gunakan": "Baca dimensi, ukuran file, tipe, dan rasio aspek gambar. Use",
    "PANDUAN INFO GAMBAR": "GUIDE: IMAGE INFO",
    "Info Gambar online gratis di AREStyx": "Image Info — Free Online Tool at AREStyx",
    "Cara menggunakan Info Gambar": "How to use Image Info",
    "Apakah Info Gambar gratis?": "Is Image Info free?",
    "info gambar online gratis": "Free online Image Info",
    "Ubah Ukuran Gambar": "Image Resizer",
    "Ubah lebar dan tinggi gambar langsung di browser.": "Ubah lebar dan tinggi gambar langsung di browser.",
    "Ubah lebar dan tinggi gambar langsung di browser. Gunakan": "Ubah lebar dan tinggi gambar langsung di browser. Use",
    "PANDUAN UBAH UKURAN GAMBAR": "GUIDE: IMAGE RESIZER",
    "Ubah Ukuran Gambar online gratis di AREStyx": "Image Resizer — Free Online Tool at AREStyx",
    "Cara menggunakan Ubah Ukuran Gambar": "How to use Image Resizer",
    "Apakah Ubah Ukuran Gambar gratis?": "Is Image Resizer free?",
    "ubah ukuran gambar online gratis": "Free online Image Resizer",
    "Kompres Gambar": "Image Compressor",
    "Kompres JPEG/WebP dengan pengaturan kualitas.": "Kompres JPEG/WebP dengan pengaturan kualitas.",
    "Kompres JPEG/WebP dengan pengaturan kualitas. Gunakan": "Kompres JPEG/WebP dengan pengaturan kualitas. Use",
    "PANDUAN KOMPRES GAMBAR": "GUIDE: IMAGE COMPRESSOR",
    "Kompres Gambar online gratis di AREStyx": "Image Compressor — Free Online Tool at AREStyx",
    "Cara menggunakan Kompres Gambar": "How to use Image Compressor",
    "Apakah Kompres Gambar gratis?": "Is Image Compressor free?",
    "kompres gambar online gratis": "Free online Image Compressor",
    "Konverter Format Gambar": "Image Format Converter",
    "Konversi gambar ke PNG, JPEG, atau WebP.": "Konversi gambar ke PNG, JPEG, atau WebP.",
    "Konversi gambar ke PNG, JPEG, atau WebP. Gunakan": "Konversi gambar ke PNG, JPEG, atau WebP. Use",
    "PANDUAN KONVERTER FORMAT GAMBAR": "GUIDE: IMAGE FORMAT CONVERTER",
    "Konverter Format Gambar online gratis di AREStyx": "Image Format Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Konverter Format Gambar": "How to use Image Format Converter",
    "Apakah Konverter Format Gambar gratis?": "Is Image Format Converter free?",
    "konverter format gambar online gratis": "Free online Image Format Converter",
    "Gambar Grayscale": "Image Grayscale",
    "Ubah gambar menjadi hitam putih melalui canvas lokal.": "Ubah gambar menjadi hitam putih melalui canvas lokal.",
    "Ubah gambar menjadi hitam putih melalui canvas lokal. Gunakan": "Ubah gambar menjadi hitam putih melalui canvas lokal. Use",
    "PANDUAN GAMBAR GRAYSCALE": "GUIDE: IMAGE GRAYSCALE",
    "Gambar Grayscale online gratis di AREStyx": "Image Grayscale — Free Online Tool at AREStyx",
    "Cara menggunakan Gambar Grayscale": "How to use Image Grayscale",
    "Apakah Gambar Grayscale gratis?": "Is Image Grayscale free?",
    "gambar grayscale online gratis": "Free online Image Grayscale",
    "Putar Gambar": "Image Rotator",
    "Putar gambar 90°, 180°, atau 270°.": "Putar gambar 90°, 180°, atau 270°.",
    "Putar gambar 90°, 180°, atau 270°. Gunakan": "Putar gambar 90°, 180°, atau 270°. Use",
    "PANDUAN PUTAR GAMBAR": "GUIDE: IMAGE ROTATOR",
    "Putar Gambar online gratis di AREStyx": "Image Rotator — Free Online Tool at AREStyx",
    "Cara menggunakan Putar Gambar": "How to use Image Rotator",
    "Apakah Putar Gambar gratis?": "Is Image Rotator free?",
    "putar gambar online gratis": "Free online Image Rotator",
    "Base64 Encoder": "Base64 Encoder",
    "Encode teks UTF-8 menjadi Base64.": "Encode teks UTF-8 menjadi Base64.",
    "Encode teks UTF-8 menjadi Base64. Gunakan": "Encode teks UTF-8 menjadi Base64. Use",
    "PANDUAN BASE64 ENCODER": "GUIDE: BASE64 ENCODER",
    "Base64 Encoder online gratis di AREStyx": "Base64 Encoder — Free Online Tool at AREStyx",
    "Cara menggunakan Base64 Encoder": "How to use Base64 Encoder",
    "Apakah Base64 Encoder gratis?": "Is Base64 Encoder free?",
    "base64 encoder online gratis": "Free online Base64 Encoder",
    "Base64 Decoder": "Base64 Decoder",
    "Decode Base64 menjadi teks UTF-8.": "Decode Base64 menjadi teks UTF-8.",
    "Decode Base64 menjadi teks UTF-8. Gunakan": "Decode Base64 menjadi teks UTF-8. Use",
    "PANDUAN BASE64 DECODER": "GUIDE: BASE64 DECODER",
    "Base64 Decoder online gratis di AREStyx": "Base64 Decoder — Free Online Tool at AREStyx",
    "Cara menggunakan Base64 Decoder": "How to use Base64 Decoder",
    "Apakah Base64 Decoder gratis?": "Is Base64 Decoder free?",
    "base64 decoder online gratis": "Free online Base64 Decoder",
    "URL Encoder": "URL Encoder",
    "Encode teks untuk parameter URL.": "Encode teks untuk parameter URL.",
    "Encode teks untuk parameter URL. Gunakan": "Encode teks untuk parameter URL. Use",
    "PANDUAN URL ENCODER": "GUIDE: URL ENCODER",
    "URL Encoder online gratis di AREStyx": "URL Encoder — Free Online Tool at AREStyx",
    "Cara menggunakan URL Encoder": "How to use URL Encoder",
    "Apakah URL Encoder gratis?": "Is URL Encoder free?",
    "url encoder online gratis": "Free online URL Encoder",
    "URL Decoder": "URL Decoder",
    "Decode komponen URL yang telah di-encode.": "Decode komponen URL yang telah di-encode.",
    "Decode komponen URL yang telah di-encode. Gunakan": "Decode komponen URL yang telah di-encode. Use",
    "PANDUAN URL DECODER": "GUIDE: URL DECODER",
    "URL Decoder online gratis di AREStyx": "URL Decoder — Free Online Tool at AREStyx",
    "Cara menggunakan URL Decoder": "How to use URL Decoder",
    "Apakah URL Decoder gratis?": "Is URL Decoder free?",
    "url decoder online gratis": "Free online URL Decoder",
    "JSON Formatter": "JSON Formatter",
    "Format JSON dengan indentasi yang mudah dibaca.": "Format JSON dengan indentasi yang mudah dibaca.",
    "Format JSON dengan indentasi yang mudah dibaca. Gunakan": "Format JSON dengan indentasi yang mudah dibaca. Use",
    "PANDUAN JSON FORMATTER": "GUIDE: JSON FORMATTER",
    "JSON Formatter online gratis di AREStyx": "JSON Formatter — Free Online Tool at AREStyx",
    "Cara menggunakan JSON Formatter": "How to use JSON Formatter",
    "Apakah JSON Formatter gratis?": "Is JSON Formatter free?",
    "json formatter online gratis": "Free online JSON Formatter",
    "JSON Minifier": "JSON Minifier",
    "Minify JSON tanpa mengubah data.": "Minify JSON tanpa mengubah data.",
    "Minify JSON tanpa mengubah data. Gunakan": "Minify JSON tanpa mengubah data. Use",
    "PANDUAN JSON MINIFIER": "GUIDE: JSON MINIFIER",
    "JSON Minifier online gratis di AREStyx": "JSON Minifier — Free Online Tool at AREStyx",
    "Cara menggunakan JSON Minifier": "How to use JSON Minifier",
    "Apakah JSON Minifier gratis?": "Is JSON Minifier free?",
    "json minifier online gratis": "Free online JSON Minifier",
    "JSON Validator": "JSON Validator",
    "Validasi sintaks JSON dan tampilkan posisi kesalahan.": "Validasi sintaks JSON dan tampilkan posisi kesalahan.",
    "Validasi sintaks JSON dan tampilkan posisi kesalahan. Gunakan": "Validasi sintaks JSON dan tampilkan posisi kesalahan. Use",
    "PANDUAN JSON VALIDATOR": "GUIDE: JSON VALIDATOR",
    "JSON Validator online gratis di AREStyx": "JSON Validator — Free Online Tool at AREStyx",
    "Cara menggunakan JSON Validator": "How to use JSON Validator",
    "Apakah JSON Validator gratis?": "Is JSON Validator free?",
    "json validator online gratis": "Free online JSON Validator",
    "HTML Escape": "HTML Escape",
    "Escape karakter HTML menjadi entity aman.": "Escape karakter HTML menjadi entity aman.",
    "Escape karakter HTML menjadi entity aman. Gunakan": "Escape karakter HTML menjadi entity aman. Use",
    "PANDUAN HTML ESCAPE": "GUIDE: HTML ESCAPE",
    "HTML Escape online gratis di AREStyx": "HTML Escape — Free Online Tool at AREStyx",
    "Cara menggunakan HTML Escape": "How to use HTML Escape",
    "Apakah HTML Escape gratis?": "Is HTML Escape free?",
    "html escape online gratis": "Free online HTML Escape",
    "HTML Unescape": "HTML Unescape",
    "Ubah HTML entities dasar kembali menjadi karakter.": "Ubah HTML entities dasar kembali menjadi karakter.",
    "Ubah HTML entities dasar kembali menjadi karakter. Gunakan": "Ubah HTML entities dasar kembali menjadi karakter. Use",
    "PANDUAN HTML UNESCAPE": "GUIDE: HTML UNESCAPE",
    "HTML Unescape online gratis di AREStyx": "HTML Unescape — Free Online Tool at AREStyx",
    "Cara menggunakan HTML Unescape": "How to use HTML Unescape",
    "Apakah HTML Unescape gratis?": "Is HTML Unescape free?",
    "html unescape online gratis": "Free online HTML Unescape",
    "Query String Parser": "Query String Parser",
    "Parse query string URL menjadi pasangan key-value.": "Parse query string URL menjadi pasangan key-value.",
    "Parse query string URL menjadi pasangan key-value. Gunakan": "Parse query string URL menjadi pasangan key-value. Use",
    "PANDUAN QUERY STRING PARSER": "GUIDE: QUERY STRING PARSER",
    "Query String Parser online gratis di AREStyx": "Query String Parser — Free Online Tool at AREStyx",
    "Cara menggunakan Query String Parser": "How to use Query String Parser",
    "Apakah Query String Parser gratis?": "Is Query String Parser free?",
    "query string parser online gratis": "Free online Query String Parser",
    "JWT Decoder": "JWT Decoder",
    "Decode header dan payload JWT tanpa memverifikasi signature.": "Decode header dan payload JWT tanpa memverifikasi signature.",
    "Decode header dan payload JWT tanpa memverifikasi signature. Gunakan": "Decode header dan payload JWT tanpa memverifikasi signature. Use",
    "PANDUAN JWT DECODER": "GUIDE: JWT DECODER",
    "JWT Decoder online gratis di AREStyx": "JWT Decoder — Free Online Tool at AREStyx",
    "Cara menggunakan JWT Decoder": "How to use JWT Decoder",
    "Apakah JWT Decoder gratis?": "Is JWT Decoder free?",
    "jwt decoder online gratis": "Free online JWT Decoder",
    "SHA-256 Generator": "SHA-256 Generator",
    "Buat hash SHA-256 melalui Web Crypto API.": "Buat hash SHA-256 melalui Web Crypto API.",
    "Buat hash SHA-256 melalui Web Crypto API. Gunakan": "Buat hash SHA-256 melalui Web Crypto API. Use",
    "PANDUAN SHA-256 GENERATOR": "GUIDE: SHA-256 GENERATOR",
    "SHA-256 Generator online gratis di AREStyx": "SHA-256 Generator — Free Online Tool at AREStyx",
    "Cara menggunakan SHA-256 Generator": "How to use SHA-256 Generator",
    "Apakah SHA-256 Generator gratis?": "Is SHA-256 Generator free?",
    "sha-256 generator online gratis": "Free online SHA-256 Generator",
    "Unix Timestamp Converter": "Unix Timestamp Converter",
    "Konversi tanggal ke Unix timestamp dan sebaliknya.": "Konversi tanggal ke Unix timestamp dan sebaliknya.",
    "Konversi tanggal ke Unix timestamp dan sebaliknya. Gunakan": "Konversi tanggal ke Unix timestamp dan sebaliknya. Use",
    "PANDUAN UNIX TIMESTAMP CONVERTER": "GUIDE: UNIX TIMESTAMP CONVERTER",
    "Unix Timestamp Converter online gratis di AREStyx": "Unix Timestamp Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Unix Timestamp Converter": "How to use Unix Timestamp Converter",
    "Apakah Unix Timestamp Converter gratis?": "Is Unix Timestamp Converter free?",
    "unix timestamp converter online gratis": "Free online Unix Timestamp Converter",
    "Konverter Basis Bilangan": "Number Base Converter",
    "Konversi bilangan biner, oktal, desimal, dan heksadesimal.": "Konversi bilangan biner, oktal, desimal, dan heksadesimal.",
    "Konversi bilangan biner, oktal, desimal, dan heksadesimal. Gunakan": "Konversi bilangan biner, oktal, desimal, dan heksadesimal. Use",
    "PANDUAN KONVERTER BASIS BILANGAN": "GUIDE: NUMBER BASE CONVERTER",
    "Konverter Basis Bilangan online gratis di AREStyx": "Number Base Converter — Free Online Tool at AREStyx",
    "Cara menggunakan Konverter Basis Bilangan": "How to use Number Base Converter",
    "Apakah Konverter Basis Bilangan gratis?": "Is Number Base Converter free?",
    "konverter basis bilangan online gratis": "Free online Number Base Converter",
    "HEX ke RGB": "HEX to RGB",
    "Konversi warna HEX menjadi RGB.": "Konversi warna HEX menjadi RGB.",
    "Konversi warna HEX menjadi RGB. Gunakan": "Konversi warna HEX menjadi RGB. Use",
    "PANDUAN HEX KE RGB": "GUIDE: HEX TO RGB",
    "HEX ke RGB online gratis di AREStyx": "HEX to RGB — Free Online Tool at AREStyx",
    "Cara menggunakan HEX ke RGB": "How to use HEX to RGB",
    "Apakah HEX ke RGB gratis?": "Is HEX to RGB free?",
    "hex ke rgb online gratis": "Free online HEX to RGB",
    "IPv4 Subnet Calculator": "IPv4 Subnet Calculator",
    "Hitung network, broadcast, netmask, dan host dari IPv4/CIDR.": "Hitung network, broadcast, netmask, dan host dari IPv4/CIDR.",
    "Hitung network, broadcast, netmask, dan host dari IPv4/CIDR. Gunakan": "Hitung network, broadcast, netmask, dan host dari IPv4/CIDR. Use",
    "PANDUAN IPV4 SUBNET CALCULATOR": "GUIDE: IPV4 SUBNET CALCULATOR",
    "IPv4 Subnet Calculator online gratis di AREStyx": "IPv4 Subnet Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan IPv4 Subnet Calculator": "How to use IPv4 Subnet Calculator",
    "Apakah IPv4 Subnet Calculator gratis?": "Is IPv4 Subnet Calculator free?",
    "ipv4 subnet calculator online gratis": "Free online IPv4 Subnet Calculator",
    "Generator Password": "Password Generator",
    "Buat password acak yang kuat menggunakan Web Crypto.": "Buat password acak yang kuat menggunakan Web Crypto.",
    "Buat password acak yang kuat menggunakan Web Crypto. Gunakan": "Buat password acak yang kuat menggunakan Web Crypto. Use",
    "PANDUAN GENERATOR PASSWORD": "GUIDE: PASSWORD GENERATOR",
    "Generator Password online gratis di AREStyx": "Password Generator — Free Online Tool at AREStyx",
    "Cara menggunakan Generator Password": "How to use Password Generator",
    "Apakah Generator Password gratis?": "Is Password Generator free?",
    "generator password online gratis": "Free online Password Generator",
    "Generator UUID": "UUID Generator",
    "Buat UUID v4 acak.": "Buat UUID v4 acak.",
    "Buat UUID v4 acak. Gunakan": "Buat UUID v4 acak. Use",
    "PANDUAN GENERATOR UUID": "GUIDE: UUID GENERATOR",
    "Generator UUID online gratis di AREStyx": "UUID Generator — Free Online Tool at AREStyx",
    "Cara menggunakan Generator UUID": "How to use UUID Generator",
    "Apakah Generator UUID gratis?": "Is UUID Generator free?",
    "generator uuid online gratis": "Free online UUID Generator",
    "Generator Angka Acak": "Random Number Generator",
    "Buat angka bulat acak dalam rentang pilihan.": "Buat angka bulat acak dalam rentang pilihan.",
    "Buat angka bulat acak dalam rentang pilihan. Gunakan": "Buat angka bulat acak dalam rentang pilihan. Use",
    "PANDUAN GENERATOR ANGKA ACAK": "GUIDE: RANDOM NUMBER GENERATOR",
    "Generator Angka Acak online gratis di AREStyx": "Random Number Generator — Free Online Tool at AREStyx",
    "Cara menggunakan Generator Angka Acak": "How to use Random Number Generator",
    "Apakah Generator Angka Acak gratis?": "Is Random Number Generator free?",
    "generator angka acak online gratis": "Free online Random Number Generator",
    "Generator String Acak": "Random String Generator",
    "Buat string acak dari karakter pilihan.": "Buat string acak dari karakter pilihan.",
    "Buat string acak dari karakter pilihan. Gunakan": "Buat string acak dari karakter pilihan. Use",
    "PANDUAN GENERATOR STRING ACAK": "GUIDE: RANDOM STRING GENERATOR",
    "Generator String Acak online gratis di AREStyx": "Random String Generator — Free Online Tool at AREStyx",
    "Cara menggunakan Generator String Acak": "How to use Random String Generator",
    "Apakah Generator String Acak gratis?": "Is Random String Generator free?",
    "generator string acak online gratis": "Free online Random String Generator",
    "Generator PIN": "PIN Generator",
    "Buat PIN numerik acak dengan panjang pilihan.": "Buat PIN numerik acak dengan panjang pilihan.",
    "Buat PIN numerik acak dengan panjang pilihan. Gunakan": "Buat PIN numerik acak dengan panjang pilihan. Use",
    "PANDUAN GENERATOR PIN": "GUIDE: PIN GENERATOR",
    "Generator PIN online gratis di AREStyx": "PIN Generator — Free Online Tool at AREStyx",
    "Cara menggunakan Generator PIN": "How to use PIN Generator",
    "Apakah Generator PIN gratis?": "Is PIN Generator free?",
    "generator pin online gratis": "Free online PIN Generator",
    "Generator Passphrase": "Passphrase Generator",
    "Buat passphrase dari beberapa kata acak.": "Buat passphrase dari beberapa kata acak.",
    "Buat passphrase dari beberapa kata acak. Gunakan": "Buat passphrase dari beberapa kata acak. Use",
    "PANDUAN GENERATOR PASSPHRASE": "GUIDE: PASSPHRASE GENERATOR",
    "Generator Passphrase online gratis di AREStyx": "Passphrase Generator — Free Online Tool at AREStyx",
    "Cara menggunakan Generator Passphrase": "How to use Passphrase Generator",
    "Apakah Generator Passphrase gratis?": "Is Passphrase Generator free?",
    "generator passphrase online gratis": "Free online Passphrase Generator",
    "Lempar Dadu": "Dice Roller",
    "Simulasikan lemparan dadu dengan jumlah sisi pilihan.": "Simulasikan lemparan dadu dengan jumlah sisi pilihan.",
    "Simulasikan lemparan dadu dengan jumlah sisi pilihan. Gunakan": "Simulasikan lemparan dadu dengan jumlah sisi pilihan. Use",
    "PANDUAN LEMPAR DADU": "GUIDE: DICE ROLLER",
    "Lempar Dadu online gratis di AREStyx": "Dice Roller — Free Online Tool at AREStyx",
    "Cara menggunakan Lempar Dadu": "How to use Dice Roller",
    "Apakah Lempar Dadu gratis?": "Is Dice Roller free?",
    "lempar dadu online gratis": "Free online Dice Roller",
    "Lempar Koin": "Coin Flip",
    "Simulasikan hasil kepala atau ekor.": "Simulasikan hasil kepala atau ekor.",
    "Simulasikan hasil kepala atau ekor. Gunakan": "Simulasikan hasil kepala atau ekor. Use",
    "PANDUAN LEMPAR KOIN": "GUIDE: COIN FLIP",
    "Lempar Koin online gratis di AREStyx": "Coin Flip — Free Online Tool at AREStyx",
    "Cara menggunakan Lempar Koin": "How to use Coin Flip",
    "Apakah Lempar Koin gratis?": "Is Coin Flip free?",
    "lempar koin online gratis": "Free online Coin Flip",
    "Kalkulator Cicilan": "Loan Calculator",
    "Hitung estimasi cicilan bulanan pinjaman dengan bunga tetap.": "Hitung estimasi cicilan bulanan pinjaman dengan bunga tetap.",
    "Hitung estimasi cicilan bulanan pinjaman dengan bunga tetap. Gunakan": "Hitung estimasi cicilan bulanan pinjaman dengan bunga tetap. Use",
    "PANDUAN KALKULATOR CICILAN": "GUIDE: LOAN CALCULATOR",
    "Kalkulator Cicilan online gratis di AREStyx": "Loan Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Kalkulator Cicilan": "How to use Loan Calculator",
    "Apakah Kalkulator Cicilan gratis?": "Is Loan Calculator free?",
    "kalkulator cicilan online gratis": "Free online Loan Calculator",
    "Bunga Sederhana": "Simple Interest",
    "Hitung bunga sederhana dan nilai akhir.": "Hitung bunga sederhana dan nilai akhir.",
    "Hitung bunga sederhana dan nilai akhir. Gunakan": "Hitung bunga sederhana dan nilai akhir. Use",
    "PANDUAN BUNGA SEDERHANA": "GUIDE: SIMPLE INTEREST",
    "Bunga Sederhana online gratis di AREStyx": "Simple Interest — Free Online Tool at AREStyx",
    "Cara menggunakan Bunga Sederhana": "How to use Simple Interest",
    "Apakah Bunga Sederhana gratis?": "Is Simple Interest free?",
    "bunga sederhana online gratis": "Free online Simple Interest",
    "Bunga Majemuk": "Compound Interest",
    "Hitung pertumbuhan modal dengan bunga majemuk.": "Hitung pertumbuhan modal dengan bunga majemuk.",
    "Hitung pertumbuhan modal dengan bunga majemuk. Gunakan": "Hitung pertumbuhan modal dengan bunga majemuk. Use",
    "PANDUAN BUNGA MAJEMUK": "GUIDE: COMPOUND INTEREST",
    "Bunga Majemuk online gratis di AREStyx": "Compound Interest — Free Online Tool at AREStyx",
    "Cara menggunakan Bunga Majemuk": "How to use Compound Interest",
    "Apakah Bunga Majemuk gratis?": "Is Compound Interest free?",
    "bunga majemuk online gratis": "Free online Compound Interest",
    "Kalkulator ROI": "ROI Calculator",
    "Hitung return on investment dalam persen.": "Hitung return on investment dalam persen.",
    "Hitung return on investment dalam persen. Gunakan": "Hitung return on investment dalam persen. Use",
    "PANDUAN KALKULATOR ROI": "GUIDE: ROI CALCULATOR",
    "Kalkulator ROI online gratis di AREStyx": "ROI Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Kalkulator ROI": "How to use ROI Calculator",
    "Apakah Kalkulator ROI gratis?": "Is ROI Calculator free?",
    "kalkulator roi online gratis": "Free online ROI Calculator",
    "Margin Keuntungan": "Profit Margin",
    "Hitung laba kotor dan margin keuntungan.": "Hitung laba kotor dan margin keuntungan.",
    "Hitung laba kotor dan margin keuntungan. Gunakan": "Hitung laba kotor dan margin keuntungan. Use",
    "PANDUAN MARGIN KEUNTUNGAN": "GUIDE: PROFIT MARGIN",
    "Margin Keuntungan online gratis di AREStyx": "Profit Margin — Free Online Tool at AREStyx",
    "Cara menggunakan Margin Keuntungan": "How to use Profit Margin",
    "Apakah Margin Keuntungan gratis?": "Is Profit Margin free?",
    "margin keuntungan online gratis": "Free online Profit Margin",
    "Kalkulator Markup": "Markup Calculator",
    "Hitung harga jual berdasarkan biaya dan markup.": "Hitung harga jual berdasarkan biaya dan markup.",
    "Hitung harga jual berdasarkan biaya dan markup. Gunakan": "Hitung harga jual berdasarkan biaya dan markup. Use",
    "PANDUAN KALKULATOR MARKUP": "GUIDE: MARKUP CALCULATOR",
    "Kalkulator Markup online gratis di AREStyx": "Markup Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Kalkulator Markup": "How to use Markup Calculator",
    "Apakah Kalkulator Markup gratis?": "Is Markup Calculator free?",
    "kalkulator markup online gratis": "Free online Markup Calculator",
    "Kalkulator Pajak Persentase": "Percentage Tax Calculator",
    "Tambahkan atau keluarkan pajak persentase dari harga.": "Tambahkan atau keluarkan pajak persentase dari harga.",
    "Tambahkan atau keluarkan pajak persentase dari harga. Gunakan": "Tambahkan atau keluarkan pajak persentase dari harga. Use",
    "PANDUAN KALKULATOR PAJAK PERSENTASE": "GUIDE: PERCENTAGE TAX CALCULATOR",
    "Kalkulator Pajak Persentase online gratis di AREStyx": "Percentage Tax Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Kalkulator Pajak Persentase": "How to use Percentage Tax Calculator",
    "Apakah Kalkulator Pajak Persentase gratis?": "Is Percentage Tax Calculator free?",
    "kalkulator pajak persentase online gratis": "Free online Percentage Tax Calculator",
    "Harga per Unit": "Unit Price Calculator",
    "Bandingkan harga per unit dari total harga dan jumlah.": "Bandingkan harga per unit dari total harga dan jumlah.",
    "Bandingkan harga per unit dari total harga dan jumlah. Gunakan": "Bandingkan harga per unit dari total harga dan jumlah. Use",
    "PANDUAN HARGA PER UNIT": "GUIDE: UNIT PRICE CALCULATOR",
    "Harga per Unit online gratis di AREStyx": "Unit Price Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Harga per Unit": "How to use Unit Price Calculator",
    "Apakah Harga per Unit gratis?": "Is Unit Price Calculator free?",
    "harga per unit online gratis": "Free online Unit Price Calculator",
    "Titik Impas": "Break-even Calculator",
    "Hitung unit minimum untuk mencapai break-even.": "Hitung unit minimum untuk mencapai break-even.",
    "Hitung unit minimum untuk mencapai break-even. Gunakan": "Hitung unit minimum untuk mencapai break-even. Use",
    "PANDUAN TITIK IMPAS": "GUIDE: BREAK-EVEN CALCULATOR",
    "Titik Impas online gratis di AREStyx": "Break-even Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Titik Impas": "How to use Break-even Calculator",
    "Apakah Titik Impas gratis?": "Is Break-even Calculator free?",
    "titik impas online gratis": "Free online Break-even Calculator",
    "Target Tabungan": "Savings Goal Calculator",
    "Hitung setoran bulanan sederhana untuk mencapai target.": "Hitung setoran bulanan sederhana untuk mencapai target.",
    "Hitung setoran bulanan sederhana untuk mencapai target. Gunakan": "Hitung setoran bulanan sederhana untuk mencapai target. Use",
    "PANDUAN TARGET TABUNGAN": "GUIDE: SAVINGS GOAL CALCULATOR",
    "Target Tabungan online gratis di AREStyx": "Savings Goal Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Target Tabungan": "How to use Savings Goal Calculator",
    "Apakah Target Tabungan gratis?": "Is Savings Goal Calculator free?",
    "target tabungan online gratis": "Free online Savings Goal Calculator",
    "Kalkulator CAGR": "CAGR Calculator",
    "Hitung compound annual growth rate.": "Hitung compound annual growth rate.",
    "Hitung compound annual growth rate. Gunakan": "Hitung compound annual growth rate. Use",
    "PANDUAN KALKULATOR CAGR": "GUIDE: CAGR CALCULATOR",
    "Kalkulator CAGR online gratis di AREStyx": "CAGR Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Kalkulator CAGR": "How to use CAGR Calculator",
    "Apakah Kalkulator CAGR gratis?": "Is CAGR Calculator free?",
    "kalkulator cagr online gratis": "Free online CAGR Calculator",
    "Depresiasi Garis Lurus": "Straight-line Depreciation",
    "Hitung depresiasi tahunan metode garis lurus.": "Hitung depresiasi tahunan metode garis lurus.",
    "Hitung depresiasi tahunan metode garis lurus. Gunakan": "Hitung depresiasi tahunan metode garis lurus. Use",
    "PANDUAN DEPRESIASI GARIS LURUS": "GUIDE: STRAIGHT-LINE DEPRECIATION",
    "Depresiasi Garis Lurus online gratis di AREStyx": "Straight-line Depreciation — Free Online Tool at AREStyx",
    "Cara menggunakan Depresiasi Garis Lurus": "How to use Straight-line Depreciation",
    "Apakah Depresiasi Garis Lurus gratis?": "Is Straight-line Depreciation free?",
    "depresiasi garis lurus online gratis": "Free online Straight-line Depreciation",
    "Kalkulator Tip": "Tip Calculator",
    "Hitung tip dan pembagian total per orang.": "Hitung tip dan pembagian total per orang.",
    "Hitung tip dan pembagian total per orang. Gunakan": "Hitung tip dan pembagian total per orang. Use",
    "PANDUAN KALKULATOR TIP": "GUIDE: TIP CALCULATOR",
    "Kalkulator Tip online gratis di AREStyx": "Tip Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Kalkulator Tip": "How to use Tip Calculator",
    "Apakah Kalkulator Tip gratis?": "Is Tip Calculator free?",
    "kalkulator tip online gratis": "Free online Tip Calculator",
    "Diskon Bertingkat": "Stacked Discount Calculator",
    "Hitung efek dua diskon yang diterapkan berurutan.": "Hitung efek dua diskon yang diterapkan berurutan.",
    "Hitung efek dua diskon yang diterapkan berurutan. Gunakan": "Hitung efek dua diskon yang diterapkan berurutan. Use",
    "PANDUAN DISKON BERTINGKAT": "GUIDE: STACKED DISCOUNT CALCULATOR",
    "Diskon Bertingkat online gratis di AREStyx": "Stacked Discount Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Diskon Bertingkat": "How to use Stacked Discount Calculator",
    "Apakah Diskon Bertingkat gratis?": "Is Stacked Discount Calculator free?",
    "diskon bertingkat online gratis": "Free online Stacked Discount Calculator",
    "Konsumsi Bahan Bakar": "Fuel Consumption Calculator",
    "Hitung konsumsi bahan bakar per jam dari volume dan durasi.": "Hitung konsumsi bahan bakar per jam dari volume dan durasi.",
    "Hitung konsumsi bahan bakar per jam dari volume dan durasi. Gunakan": "Hitung konsumsi bahan bakar per jam dari volume dan durasi. Use",
    "PANDUAN KONSUMSI BAHAN BAKAR": "GUIDE: FUEL CONSUMPTION CALCULATOR",
    "Konsumsi Bahan Bakar online gratis di AREStyx": "Fuel Consumption Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Konsumsi Bahan Bakar": "How to use Fuel Consumption Calculator",
    "Apakah Konsumsi Bahan Bakar gratis?": "Is Fuel Consumption Calculator free?",
    "konsumsi bahan bakar online gratis": "Free online Fuel Consumption Calculator",
    "Hukum Ohm": "Ohm’s Law Calculator",
    "Hitung tegangan, arus, atau resistansi dari dua nilai yang diketahui.": "Hitung tegangan, arus, atau resistansi dari dua nilai yang diketahui.",
    "Hitung tegangan, arus, atau resistansi dari dua nilai yang diketahui. Gunakan": "Hitung tegangan, arus, atau resistansi dari dua nilai yang diketahui. Use",
    "PANDUAN HUKUM OHM": "GUIDE: OHM’S LAW CALCULATOR",
    "Hukum Ohm online gratis di AREStyx": "Ohm’s Law Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Hukum Ohm": "How to use Ohm’s Law Calculator",
    "Apakah Hukum Ohm gratis?": "Is Ohm’s Law Calculator free?",
    "hukum ohm online gratis": "Free online Ohm’s Law Calculator",
    "Daya Listrik": "Electrical Power Calculator",
    "Hitung daya dari tegangan dan arus.": "Hitung daya dari tegangan dan arus.",
    "Hitung daya dari tegangan dan arus. Gunakan": "Hitung daya dari tegangan dan arus. Use",
    "PANDUAN DAYA LISTRIK": "GUIDE: ELECTRICAL POWER CALCULATOR",
    "Daya Listrik online gratis di AREStyx": "Electrical Power Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Daya Listrik": "How to use Electrical Power Calculator",
    "Apakah Daya Listrik gratis?": "Is Electrical Power Calculator free?",
    "daya listrik online gratis": "Free online Electrical Power Calculator",
    "Resistor Seri": "Series Resistance",
    "Jumlahkan resistansi beberapa resistor seri.": "Jumlahkan resistansi beberapa resistor seri.",
    "Jumlahkan resistansi beberapa resistor seri. Gunakan": "Jumlahkan resistansi beberapa resistor seri. Use",
    "PANDUAN RESISTOR SERI": "GUIDE: SERIES RESISTANCE",
    "Resistor Seri online gratis di AREStyx": "Series Resistance — Free Online Tool at AREStyx",
    "Cara menggunakan Resistor Seri": "How to use Series Resistance",
    "Apakah Resistor Seri gratis?": "Is Series Resistance free?",
    "resistor seri online gratis": "Free online Series Resistance",
    "Resistor Paralel": "Parallel Resistance",
    "Hitung resistansi ekuivalen resistor paralel.": "Hitung resistansi ekuivalen resistor paralel.",
    "Hitung resistansi ekuivalen resistor paralel. Gunakan": "Hitung resistansi ekuivalen resistor paralel. Use",
    "PANDUAN RESISTOR PARALEL": "GUIDE: PARALLEL RESISTANCE",
    "Resistor Paralel online gratis di AREStyx": "Parallel Resistance — Free Online Tool at AREStyx",
    "Cara menggunakan Resistor Paralel": "How to use Parallel Resistance",
    "Apakah Resistor Paralel gratis?": "Is Parallel Resistance free?",
    "resistor paralel online gratis": "Free online Parallel Resistance",
    "Pembagi Tegangan": "Voltage Divider",
    "Hitung tegangan keluaran rangkaian pembagi tegangan.": "Hitung tegangan keluaran rangkaian pembagi tegangan.",
    "Hitung tegangan keluaran rangkaian pembagi tegangan. Gunakan": "Hitung tegangan keluaran rangkaian pembagi tegangan. Use",
    "PANDUAN PEMBAGI TEGANGAN": "GUIDE: VOLTAGE DIVIDER",
    "Pembagi Tegangan online gratis di AREStyx": "Voltage Divider — Free Online Tool at AREStyx",
    "Cara menggunakan Pembagi Tegangan": "How to use Voltage Divider",
    "Apakah Pembagi Tegangan gratis?": "Is Voltage Divider free?",
    "pembagi tegangan online gratis": "Free online Voltage Divider",
    "Runtime Baterai": "Battery Runtime",
    "Estimasi durasi baterai dari kapasitas dan arus beban.": "Estimasi durasi baterai dari kapasitas dan arus beban.",
    "Estimasi durasi baterai dari kapasitas dan arus beban. Gunakan": "Estimasi durasi baterai dari kapasitas dan arus beban. Use",
    "PANDUAN RUNTIME BATERAI": "GUIDE: BATTERY RUNTIME",
    "Runtime Baterai online gratis di AREStyx": "Battery Runtime — Free Online Tool at AREStyx",
    "Cara menggunakan Runtime Baterai": "How to use Battery Runtime",
    "Apakah Runtime Baterai gratis?": "Is Battery Runtime free?",
    "runtime baterai online gratis": "Free online Battery Runtime",
    "Rasio Transformator": "Transformer Ratio",
    "Hitung tegangan sekunder dari rasio lilitan.": "Hitung tegangan sekunder dari rasio lilitan.",
    "Hitung tegangan sekunder dari rasio lilitan. Gunakan": "Hitung tegangan sekunder dari rasio lilitan. Use",
    "PANDUAN RASIO TRANSFORMATOR": "GUIDE: TRANSFORMER RATIO",
    "Rasio Transformator online gratis di AREStyx": "Transformer Ratio — Free Online Tool at AREStyx",
    "Cara menggunakan Rasio Transformator": "How to use Transformer Ratio",
    "Apakah Rasio Transformator gratis?": "Is Transformer Ratio free?",
    "rasio transformator online gratis": "Free online Transformer Ratio",
    "Frekuensi & Periode": "Frequency & Period",
    "Konversi frekuensi ke periode atau sebaliknya.": "Konversi frekuensi ke periode atau sebaliknya.",
    "Konversi frekuensi ke periode atau sebaliknya. Gunakan": "Konversi frekuensi ke periode atau sebaliknya. Use",
    "PANDUAN FREKUENSI & PERIODE": "GUIDE: FREQUENCY & PERIOD",
    "Frekuensi & Periode online gratis di AREStyx": "Frequency & Period — Free Online Tool at AREStyx",
    "Cara menggunakan Frekuensi & Periode": "How to use Frequency & Period",
    "Apakah Frekuensi & Periode gratis?": "Is Frequency & Period free?",
    "frekuensi & periode online gratis": "Free online Frequency & Period",
    "RPM ↔ rad/s": "RPM ↔ rad/s",
    "Konversi putaran per menit ke radian per detik.": "Konversi putaran per menit ke radian per detik.",
    "Konversi putaran per menit ke radian per detik. Gunakan": "Konversi putaran per menit ke radian per detik. Use",
    "PANDUAN RPM ↔ RAD/S": "GUIDE: RPM ↔ RAD/S",
    "RPM ↔ rad/s online gratis di AREStyx": "RPM ↔ rad/s — Free Online Tool at AREStyx",
    "Cara menggunakan RPM ↔ rad/s": "How to use RPM ↔ rad/s",
    "Apakah RPM ↔ rad/s gratis?": "Is RPM ↔ rad/s free?",
    "rpm ↔ rad/s online gratis": "Free online RPM ↔ rad/s",
    "Torsi dari Daya & RPM": "Torque from Power & RPM",
    "Hitung torsi poros dari daya kW dan RPM.": "Hitung torsi poros dari daya kW dan RPM.",
    "Hitung torsi poros dari daya kW dan RPM. Gunakan": "Hitung torsi poros dari daya kW dan RPM. Use",
    "PANDUAN TORSI DARI DAYA & RPM": "GUIDE: TORQUE FROM POWER & RPM",
    "Torsi dari Daya & RPM online gratis di AREStyx": "Torque from Power & RPM — Free Online Tool at AREStyx",
    "Cara menggunakan Torsi dari Daya & RPM": "How to use Torque from Power & RPM",
    "Apakah Torsi dari Daya & RPM gratis?": "Is Torque from Power & RPM free?",
    "torsi dari daya & rpm online gratis": "Free online Torque from Power & RPM",
    "Rasio Gear": "Gear Ratio Calculator",
    "Hitung rasio gear dan RPM keluaran.": "Hitung rasio gear dan RPM keluaran.",
    "Hitung rasio gear dan RPM keluaran. Gunakan": "Hitung rasio gear dan RPM keluaran. Use",
    "PANDUAN RASIO GEAR": "GUIDE: GEAR RATIO CALCULATOR",
    "Rasio Gear online gratis di AREStyx": "Gear Ratio Calculator — Free Online Tool at AREStyx",
    "Cara menggunakan Rasio Gear": "How to use Gear Ratio Calculator",
    "Apakah Rasio Gear gratis?": "Is Gear Ratio Calculator free?",
    "rasio gear online gratis": "Free online Gear Ratio Calculator",
    "Daya Hidrolik": "Hydraulic Power",
    "Hitung daya hidrolik ideal dari tekanan dan debit.": "Hitung daya hidrolik ideal dari tekanan dan debit.",
    "Hitung daya hidrolik ideal dari tekanan dan debit. Gunakan": "Hitung daya hidrolik ideal dari tekanan dan debit. Use",
    "PANDUAN DAYA HIDROLIK": "GUIDE: HYDRAULIC POWER",
    "Daya Hidrolik online gratis di AREStyx": "Hydraulic Power — Free Online Tool at AREStyx",
    "Cara menggunakan Daya Hidrolik": "How to use Hydraulic Power",
    "Apakah Daya Hidrolik gratis?": "Is Hydraulic Power free?",
    "daya hidrolik online gratis": "Free online Hydraulic Power",
    "Kecepatan Aliran Pipa": "Pipe Velocity",
    "Hitung kecepatan fluida dari debit dan diameter pipa.": "Hitung kecepatan fluida dari debit dan diameter pipa.",
    "Hitung kecepatan fluida dari debit dan diameter pipa. Gunakan": "Hitung kecepatan fluida dari debit dan diameter pipa. Use",
    "PANDUAN KECEPATAN ALIRAN PIPA": "GUIDE: PIPE VELOCITY",
    "Kecepatan Aliran Pipa online gratis di AREStyx": "Pipe Velocity — Free Online Tool at AREStyx",
    "Cara menggunakan Kecepatan Aliran Pipa": "How to use Pipe Velocity",
    "Apakah Kecepatan Aliran Pipa gratis?": "Is Pipe Velocity free?",
    "kecepatan aliran pipa online gratis": "Free online Pipe Velocity",
    "Bilangan Reynolds": "Reynolds Number",
    "Hitung Reynolds number dari densitas, kecepatan, diameter, dan viskositas.": "Hitung Reynolds number dari densitas, kecepatan, diameter, dan viskositas.",
    "Hitung Reynolds number dari densitas, kecepatan, diameter, dan viskositas. Gunakan": "Hitung Reynolds number dari densitas, kecepatan, diameter, dan viskositas. Use",
    "PANDUAN BILANGAN REYNOLDS": "GUIDE: REYNOLDS NUMBER",
    "Bilangan Reynolds online gratis di AREStyx": "Reynolds Number — Free Online Tool at AREStyx",
    "Cara menggunakan Bilangan Reynolds": "How to use Reynolds Number",
    "Apakah Bilangan Reynolds gratis?": "Is Reynolds Number free?",
    "bilangan reynolds online gratis": "Free online Reynolds Number",
    "Pressure Head": "Pressure Head",
    "Konversi tekanan ke head fluida berdasarkan densitas.": "Konversi tekanan ke head fluida berdasarkan densitas.",
    "Konversi tekanan ke head fluida berdasarkan densitas. Gunakan": "Konversi tekanan ke head fluida berdasarkan densitas. Use",
    "PANDUAN PRESSURE HEAD": "GUIDE: PRESSURE HEAD",
    "Pressure Head online gratis di AREStyx": "Pressure Head — Free Online Tool at AREStyx",
    "Cara menggunakan Pressure Head": "How to use Pressure Head",
    "Apakah Pressure Head gratis?": "Is Pressure Head free?",
    "pressure head online gratis": "Free online Pressure Head",
    "Specific Gravity": "Specific Gravity",
    "Hitung specific gravity dari densitas fluida.": "Hitung specific gravity dari densitas fluida.",
    "Hitung specific gravity dari densitas fluida. Gunakan": "Hitung specific gravity dari densitas fluida. Use",
    "PANDUAN SPECIFIC GRAVITY": "GUIDE: SPECIFIC GRAVITY",
    "Specific Gravity online gratis di AREStyx": "Specific Gravity — Free Online Tool at AREStyx",
    "Cara menggunakan Specific Gravity": "How to use Specific Gravity",
    "Apakah Specific Gravity gratis?": "Is Specific Gravity free?",
    "specific gravity online gratis": "Free online Specific Gravity",
    "API Gravity": "API Gravity",
    "Konversi API gravity ke specific gravity dan densitas perkiraan.": "Konversi API gravity ke specific gravity dan densitas perkiraan.",
    "Konversi API gravity ke specific gravity dan densitas perkiraan. Gunakan": "Konversi API gravity ke specific gravity dan densitas perkiraan. Use",
    "PANDUAN API GRAVITY": "GUIDE: API GRAVITY",
    "API Gravity online gratis di AREStyx": "API Gravity — Free Online Tool at AREStyx",
    "Cara menggunakan API Gravity": "How to use API Gravity",
    "Apakah API Gravity gratis?": "Is API Gravity free?",
    "api gravity online gratis": "Free online API Gravity",
    "Propeller Slip": "Propeller Slip",
    "Hitung apparent propeller slip dari pitch, RPM, waktu, dan jarak aktual.": "Hitung apparent propeller slip dari pitch, RPM, waktu, dan jarak aktual.",
    "Hitung apparent propeller slip dari pitch, RPM, waktu, dan jarak aktual. Gunakan": "Hitung apparent propeller slip dari pitch, RPM, waktu, dan jarak aktual. Use",
    "PANDUAN PROPELLER SLIP": "GUIDE: PROPELLER SLIP",
    "Propeller Slip online gratis di AREStyx": "Propeller Slip — Free Online Tool at AREStyx",
    "Cara menggunakan Propeller Slip": "How to use Propeller Slip",
    "Apakah Propeller Slip gratis?": "Is Propeller Slip free?",
    "propeller slip online gratis": "Free online Propeller Slip",
    "Engine Displacement": "Engine Displacement",
    "Hitung total displacement mesin dari bore, stroke, dan jumlah silinder.": "Hitung total displacement mesin dari bore, stroke, dan jumlah silinder.",
    "Hitung total displacement mesin dari bore, stroke, dan jumlah silinder. Gunakan": "Hitung total displacement mesin dari bore, stroke, dan jumlah silinder. Use",
    "PANDUAN ENGINE DISPLACEMENT": "GUIDE: ENGINE DISPLACEMENT",
    "Engine Displacement online gratis di AREStyx": "Engine Displacement — Free Online Tool at AREStyx",
    "Cara menggunakan Engine Displacement": "How to use Engine Displacement",
    "Apakah Engine Displacement gratis?": "Is Engine Displacement free?",
    "engine displacement online gratis": "Free online Engine Displacement"
});

function getCatalogTextTranslation(value) {
    const normalized = normalizeToolText(value);
    const catalog = Array.isArray(window.AREStyxToolCatalog)
        ? window.AREStyxToolCatalog
        : [];

    const match = catalog.find(item =>
        normalizeToolText(item.title?.id) === normalized ||
        normalizeToolText(item.description?.id) === normalized
    );

    if (match) {
        return normalizeToolText(
            normalizeToolText(match.title?.id) === normalized
                ? match.title?.en
                : match.description?.en
        );
    }

    const descriptionPrefix = catalog.find(item => {
        const sourceDescription = normalizeToolText(item.description?.id);
        return sourceDescription && normalized.startsWith(sourceDescription);
    });

    if (descriptionPrefix) {
        const sourceDescription = normalizeToolText(descriptionPrefix.description.id);
        const englishDescription = normalizeToolText(descriptionPrefix.description.en);
        return normalized.replace(sourceDescription, englishDescription);
    }

    return "";
}

function translateToolTemplateText(value) {
    const normalized = normalizeToolText(value);
    const title = getCatalogTool(activeToolId)?.title?.en || "";

    if (/^PANDUAN\s+.+$/i.test(normalized)) {
        return "GUIDE: " + normalized.replace(/^PANDUAN\s+/i, "");
    }

    if (/^.+ online gratis di AREStyx$/i.test(normalized)) {
        return normalized.replace(/ online gratis di AREStyx$/i, " — Free Online Tool at AREStyx");
    }

    if (/^Cara menggunakan\s+.+$/i.test(normalized)) {
        return normalized.replace(/^Cara menggunakan\s+/i, "How to use ");
    }

    if (/^Apakah\s+.+ gratis?$/i.test(normalized)) {
        return normalized.replace(/^Apakah\s+(.+) gratis?$/i, "Is $1 free?");
    }

    if (/^.+ online gratis$/i.test(normalized)) {
        return "Free online " + normalized.replace(/ online gratis$/i, "");
    }

    if (normalized === "Konversi" || normalized === "Hitung") {
        return normalized === "Konversi" ? "Convert" : "Calculate";
    }

    return title && normalized === "Tool ini sedang dalam tahap pengembangan."
        ? "This tool is currently under development."
        : "";
}


const toolTextSources =
    new WeakMap();

const toolAttributeSources =
    new WeakMap();


function normalizeToolText(value) {

    return String(value || "")
        .replace(/\s+/g, " ")
        .trim();

}


function translateToolTextToEnglish(
    value
) {
    const normalized =
        normalizeToolText(value);

    const catalogTranslation =
        getCatalogTextTranslation(normalized);

    if (catalogTranslation) {
        return catalogTranslation;
    }

    if (Object.prototype.hasOwnProperty.call(toolCatalogTranslations, normalized)) {
        return toolCatalogTranslations[normalized];
    }

    if (Object.prototype.hasOwnProperty.call(toolAdditionalTranslations, normalized)) {
        return toolAdditionalTranslations[normalized];
    }

    if (Object.prototype.hasOwnProperty.call(toolTextTranslations, normalized)) {
        return toolTextTranslations[normalized];
    }

    const templateTranslation =
        translateToolTemplateText(normalized);

    if (templateTranslation) {
        return templateTranslation;
    }

    return toolPhraseTranslations
        .reduce(
            (translated, rule) =>
                translated.replace(rule[0], rule[1]),
            normalized
        );
}


function getToolSourceText(value) {

    const normalized =
        normalizeToolText(value);


    if (!normalized) {
        return "";
    }


    if (
        Object.prototype.hasOwnProperty.call(
            toolTextTranslations,
            normalized
        )
    ) {

        return normalized;

    }


    if (
        Object.prototype.hasOwnProperty.call(
            toolEnglishToIndonesian,
            normalized
        )
    ) {

        return toolEnglishToIndonesian[
            normalized
        ];

    }


    return (
        translateToolTextToEnglish(
            normalized
        ) !== normalized
            ? normalized
            : ""
    );

}


function preserveToolTextSpacing(
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


function applyToolLanguageToDocument() {

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
                toolTextSources.get(
                    node
                );


            if (!source) {

                source =
                    getToolSourceText(
                        node.nodeValue
                    );


                if (source) {

                    toolTextSources.set(
                        node,
                        source
                    );

                }

            }


            if (source) {

                node.nodeValue =
                    preserveToolTextSpacing(
                        node.nodeValue,
                        currentToolLanguage === "en"
                            ? translateToolTextToEnglish(
                                source
                            )
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
                    toolAttributeSources.get(
                        element
                    );


                if (!sources) {

                    sources = {};

                    toolAttributeSources.set(
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
                                    getToolSourceText(
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
                                currentToolLanguage === "en"
                                    ? translateToolTextToEnglish(
                                        source
                                    )
                                    : source
                            );

                        }
                    );

            }
        );

}


function ensureToolLanguageButton() {

    let button =
        document.getElementById(
            "languageButton"
        );


    if (!button) {

        const headerContainer =
            document.querySelector(
                ".header-container"
            );

        const backButton =
            headerContainer?.querySelector(
                ".tool-back-button"
            );


        if (!headerContainer) {
            return null;
        }


        let actions =
            headerContainer.querySelector(
                ".header-actions"
            );


        if (!actions) {

            actions =
                document.createElement(
                    "div"
                );

            actions.className =
                "header-actions";


            if (backButton) {

                headerContainer.insertBefore(
                    actions,
                    backButton
                );

                actions.appendChild(
                    backButton
                );

            } else {

                headerContainer.appendChild(
                    actions
                );

            }

        }


        button =
            document.createElement(
                "button"
            );

        button.id =
            "languageButton";

        button.type =
            "button";

        button.className =
            "language-button";


        actions.insertBefore(
            button,
            actions.firstChild
        );

    }


    if (
        button.dataset.arestyxLanguageReady !==
        "true"
    ) {

        button.addEventListener(
            "click",
            () => {

                setToolLanguage(
                    currentToolLanguage === "id"
                        ? "en"
                        : "id"
                );

            }
        );

        button.dataset.arestyxLanguageReady =
            "true";

    }


    return button;

}


function getCatalogTool(
    toolId
) {

    if (
        !Array.isArray(
            window.AREStyxToolCatalog
        )
    ) {
        return null;
    }


    return (
        window.AREStyxToolCatalog.find(
            item =>
                item.id === toolId
        ) ||
        null
    );

}


function applyActiveToolMetadata() {

    if (!activeToolDefinition) {
        return;
    }


    const catalogTool =
        getCatalogTool(
            activeToolId
        );

    const localizedTitle =
        catalogTool?.title?.[
            currentToolLanguage
        ] ||
        (
            currentToolLanguage === "en"
                ? translateToolTextToEnglish(
                    activeToolDefinition.title
                )
                : activeToolDefinition.title
        );

    const localizedDescription =
        catalogTool?.description?.[
            currentToolLanguage
        ] ||
        (
            currentToolLanguage === "en"
                ? translateToolTextToEnglish(
                    activeToolDefinition.description
                )
                : activeToolDefinition.description
        );


    const isStandaloneSeoPage =
        Boolean(
            document.body?.dataset?.toolId
        );


    document.title =
        isStandaloneSeoPage
            ? `${localizedTitle} Online Gratis | AREStyx`
            : `${localizedTitle} | AREStyx`;


    if (toolTitle) {

        toolTitle.textContent =
            localizedTitle;

    }


    if (toolDescription) {

        toolDescription.textContent =
            localizedDescription;

    }


    if (breadcrumbTool) {

        breadcrumbTool.textContent =
            localizedTitle;

    }

}


function observeToolLanguageChanges() {

    if (toolLanguageObserver) {

        toolLanguageObserver.disconnect();

    }


    toolLanguageObserver =
        new MutationObserver(
            mutations => {

                toolLanguageObserver.disconnect();


                mutations.forEach(
                    mutation => {

                        if (
                            mutation.type ===
                            "characterData"
                        ) {

                            toolTextSources.delete(
                                mutation.target
                            );

                        }


                        if (
                            mutation.type ===
                            "attributes"
                        ) {

                            toolAttributeSources.delete(
                                mutation.target
                            );

                        }

                    }
                );


                applyToolLanguageToDocument();


                toolLanguageObserver.observe(
                    document.body,
                    {
                        childList: true,
                        subtree: true,
                        characterData: true,
                        attributes: true,
                        attributeFilter: [
                            "placeholder",
                            "aria-label",
                            "title"
                        ]
                    }
                );

            }
        );


    toolLanguageObserver.observe(
        document.body,
        {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: [
                "placeholder",
                "aria-label",
                "title"
            ]
        }
    );

}


function setToolLanguage(
    language,
    persist = true
) {

    currentToolLanguage =
        language === "en"
            ? "en"
            : "id";


    document.documentElement.lang =
        currentToolLanguage;


    if (toolLanguageObserver) {

        toolLanguageObserver.disconnect();

    }


    const button =
        ensureToolLanguageButton();


    if (button) {

        button.textContent =
            currentToolLanguage === "id"
                ? "EN"
                : "ID";

        button.setAttribute(
            "aria-label",
            currentToolLanguage === "id"
                ? "Switch to English"
                : "Ganti ke Bahasa Indonesia"
        );

    }


    if (persist) {

        try {

            localStorage.setItem(
                "arestyx-language",
                currentToolLanguage
            );

        } catch {}

    }


    applyActiveToolMetadata();

    applyToolLanguageToDocument();

    observeToolLanguageChanges();

}


/* =========================================================
   HELPERS
========================================================= */

function getToolName() {

    const pageToolId =
        document.body?.dataset?.toolId;


    if (pageToolId) {

        return pageToolId;

    }

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
        currentToolLanguage === "en"
            ? "en-US"
            : "id-ID",
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


    activeToolId =
        resolvedTool;

    activeToolDefinition =
        tool ||
        null;


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


        setToolLanguage(
            currentToolLanguage,
            false
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


    setToolLanguage(
        currentToolLanguage,
        false
    );

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
