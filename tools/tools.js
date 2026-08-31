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

function getCatalogTextTranslation(value) {
    const normalized = normalizeToolText(value);
    const catalog = Array.isArray(window.AREStyxToolCatalog)
        ? window.AREStyxToolCatalog
        : [];

    const match = catalog.find(item =>
        normalizeToolText(item.title?.id) === normalized ||
        normalizeToolText(item.description?.id) === normalized
    );

    if (!match) {
        return "";
    }

    return normalizeToolText(
        normalizeToolText(match.title?.id) === normalized
            ? match.title?.en
            : match.description?.en
    );
}

function translateToolTemplateText(value) {
    const normalized = normalizeToolText(value);
    const title = getCatalogTool(activeToolId)?.title?.en || "";

    if (/^PANDUANs+.+$/i.test(normalized)) {
        return "GUIDE: " + normalized.replace(/^PANDUANs+/i, "");
    }

    if (/^.+ online gratis di AREStyx$/i.test(normalized)) {
        return normalized.replace(/ online gratis di AREStyx$/i, " — Free Online Tool at AREStyx");
    }

    if (/^Cara menggunakans+.+$/i.test(normalized)) {
        return normalized.replace(/^Cara menggunakans+/i, "How to use ");
    }

    if (/^Apakahs+.+ gratis?$/i.test(normalized)) {
        return normalized.replace(/^Apakahs+(.+) gratis?$/i, "Is $1 free?");
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
