"use strict";

const PRICE_TIERS = Object.freeze({
    simple: { label: "Simple", price: 49000 },
    standard: { label: "Standard", price: 99000 },
    advanced: { label: "Advanced", price: 199000 },
    custom: { label: "Custom", price: null }
});

const REPOSITORY_ISSUE_URL = "https://github.com/aresterweb/AREStyX/issues/new";
const form = document.getElementById("requestForm");
const resultSection = document.getElementById("requestResult");
const summaryBox = document.getElementById("requestSummary");
const requestIdEl = document.getElementById("requestId");
const ticketTierEl = document.getElementById("ticketTier");
const ticketPriceEl = document.getElementById("ticketPrice");
const exactAmountEl = document.getElementById("exactAmount");
const verificationCodeEl = document.getElementById("verificationCode");
const githubIssue = document.getElementById("githubIssue");
const approvedCheck = document.getElementById("approvedCheck");
const paymentContent = document.getElementById("paymentContent");
const paymentLocked = document.getElementById("paymentLocked");
const languageButton = document.getElementById("languageButton");

let activeTicket = null;
let currentLanguage = "id";

try {
    currentLanguage = localStorage.getItem("arestyx-language") === "en" ? "en" : "id";
} catch {}

const i18n = {
    id: {
        allTools: "Semua Tools", heroTitle: "Minta Tool Baru Dibuat", heroText: "Ajukan tool yang belum tersedia. Permintaan ditinjau terlebih dahulu. Jika disetujui, kamu dapat memilih Priority Paid Request agar pengembangan diprioritaskan.",
        badgeReview: "✓ Review sebelum bayar", badgePublic: "✓ Tool dapat dirilis publik", badgeManual: "✓ Verifikasi pembayaran manual", flowTitle: "Alur aman", flow1: "Isi detail kebutuhan.", flow2: "Buat Request ID dan kirim permintaan.", flow3: "Tunggu persetujuan / penetapan tingkat kompleksitas.", flow4: "Jika disetujui, bayar melalui QRIS dengan nominal verifikasi.", flow5: "Setelah pembayaran cocok, pengembangan masuk antrean prioritas.",
        formTitle: "Detail Tool", toolName: "Nama tool yang diminta", category: "Kategori", tier: "Perkiraan tingkat", description: "Apa yang harus dilakukan tool ini?", inputs: "Input yang dibutuhkan", output: "Output / contoh hasil yang diharapkan", alias: "Nama / alias (opsional)", language: "Bahasa utama", publicConsent: "Saya memahami bahwa biaya Priority Request adalah biaya prioritas pengembangan, bukan pembelian hak eksklusif. Tool yang selesai dapat dirilis gratis untuk publik di AREStyx.", safeConsent: "Saya tidak akan mengirim password, nomor kartu, data rekening, dokumen identitas, atau informasi sensitif melalui request publik.", generate: "Buat Request ID", reset: "Reset",
        priceTitle: "Harga Prioritas", simpleHelp: "Rumus / utilitas kecil, 1 alur utama.", standardHelp: "Beberapa input, validasi, hasil rinci.", advancedHelp: "Logika lebih kompleks / multi-mode.", quote: "Quote", customHelp: "Server/API, akun, file kompleks, atau scope besar.", pricingNote: "Harga di form adalah estimasi. Jangan membayar sebelum request disetujui. AREStyx dapat menaikkan/menurunkan tier setelah scope ditinjau.",
        ticketTitle: "Request Siap Dikirim", selectedTier: "Tier", estimatedPrice: "Estimasi", copy: "Salin Request", download: "Unduh TXT", share: "Bagikan", github: "Kirim via GitHub", ticketNote: "Kirim request terlebih dahulu. Bukti pembayaran, nomor transaksi, nomor rekening, atau data sensitif jangan diposting di GitHub Issue publik.",
        paymentTitle: "Bayar Setelah Disetujui", approvedCheck: "Saya sudah menerima persetujuan untuk request dan tier ini.", paymentLocked: "Pembayaran dikunci sampai kamu menandai bahwa request sudah disetujui.", payExact: "Bayar nominal tepat", verificationHelp: "Tiga digit terakhir adalah kode verifikasi untuk membantu pencocokan transaksi secara manual.", scanQris: "Scan QRIS menggunakan aplikasi pembayaran yang mendukung QRIS.", verificationCode: "Kode verifikasi", manualVerify: "Status pembayaran tidak berubah otomatis. Pemilik AREStyx harus mencocokkan nominal, waktu transaksi, dan Request ID sebelum pengembangan dimulai.",
        rulesTitle: "Aturan Priority Request", rule1: "<strong>Review dulu.</strong> Permintaan yang tidak realistis, melanggar hukum/kebijakan, atau membutuhkan akses data sensitif dapat ditolak.", rule2: "<strong>Tidak eksklusif.</strong> Kecuali ada kesepakatan custom terpisah, tool yang dibuat menjadi bagian AREStyx dan dapat digunakan publik.", rule3: "<strong>Scope terkunci.</strong> Perubahan besar setelah pekerjaan dimulai dapat dinilai sebagai request baru atau upgrade tier.", rule4: "<strong>Keamanan.</strong> Jangan kirim kredensial, API key, kartu, rekening, atau dokumen identitas pada form/issue publik."
    },
    en: {
        allTools: "All Tools", heroTitle: "Request a New Tool", heroText: "Request a tool that is not available yet. Requests are reviewed first. Once approved, you can use Priority Paid Request to move the development higher in the queue.",
        badgeReview: "✓ Review before payment", badgePublic: "✓ Tool may be released publicly", badgeManual: "✓ Manual payment verification", flowTitle: "Safe workflow", flow1: "Describe what you need.", flow2: "Generate a Request ID and submit the request.", flow3: "Wait for approval / complexity tier confirmation.", flow4: "Once approved, pay through QRIS using the verification amount.", flow5: "After payment is matched, development enters the priority queue.",
        formTitle: "Tool Details", toolName: "Requested tool name", category: "Category", tier: "Estimated tier", description: "What should this tool do?", inputs: "Required inputs", output: "Expected output / example", alias: "Name / alias (optional)", language: "Primary language", publicConsent: "I understand that the Priority Request fee pays for development priority, not exclusive ownership. The completed tool may be released publicly for free on AREStyx.", safeConsent: "I will not submit passwords, card numbers, bank-account details, identity documents, or sensitive information through a public request.", generate: "Generate Request ID", reset: "Reset",
        priceTitle: "Priority Pricing", simpleHelp: "Small formula / utility with one main workflow.", standardHelp: "Multiple inputs, validation, and detailed output.", advancedHelp: "More complex logic or multiple modes.", quote: "Quote", customHelp: "Server/API, accounts, complex files, or large scope.", pricingNote: "Prices in the form are estimates. Do not pay before your request is approved. AREStyx may move the request up or down a tier after scope review.",
        ticketTitle: "Request Ready to Submit", selectedTier: "Tier", estimatedPrice: "Estimate", copy: "Copy Request", download: "Download TXT", share: "Share", github: "Submit via GitHub", ticketNote: "Submit the request first. Do not post payment proof, transaction numbers, bank details, or sensitive data in a public GitHub Issue.",
        paymentTitle: "Pay After Approval", approvedCheck: "I have received approval for this request and tier.", paymentLocked: "Payment remains locked until you confirm that the request has been approved.", payExact: "Pay the exact amount", verificationHelp: "The final three digits are a verification code used to help manually match the transaction.", scanQris: "Scan the QRIS code with a payment app that supports QRIS.", verificationCode: "Verification code", manualVerify: "Payment status does not update automatically. The AREStyx owner must match the amount, transaction time, and Request ID before development starts.",
        rulesTitle: "Priority Request Rules", rule1: "<strong>Review first.</strong> Unrealistic, unlawful/policy-violating, or sensitive-data-dependent requests may be rejected.", rule2: "<strong>Non-exclusive.</strong> Unless separately agreed as custom work, the tool becomes part of AREStyx and may be used publicly.", rule3: "<strong>Scope is fixed.</strong> Major changes after work starts may be treated as a new request or tier upgrade.", rule4: "<strong>Security.</strong> Never submit credentials, API keys, card/bank details, or identity documents in a public form/issue."
    }
};

function formatRupiah(value) {
    if (!Number.isFinite(value)) return "Review / Quote";
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

function randomDigits(length) {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, b => String(b % 10)).join("");
}

function makeRequestId() {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `ARX-${yy}${mm}${dd}-${randomDigits(6)}`;
}

function makeVerificationCode() {
    const a = new Uint16Array(1);
    crypto.getRandomValues(a);
    return String((a[0] % 999) + 1).padStart(3, "0");
}

function value(id) {
    return document.getElementById(id).value.trim();
}

function toast(message) {
    document.querySelector(".request-toast")?.remove();
    const node = document.createElement("div");
    node.className = "request-toast";
    node.textContent = message;
    document.body.appendChild(node);
    setTimeout(() => node.remove(), 2600);
}

function buildSummary(ticket) {
    return [
        "AREStyx PAID TOOL REQUEST",
        "=========================",
        `Request ID: ${ticket.id}`,
        `Created: ${ticket.created}`,
        `Requested tool: ${ticket.toolName}`,
        `Category: ${ticket.category}`,
        `Estimated tier: ${ticket.tierLabel}`,
        `Estimated price: ${ticket.priceLabel}`,
        `Preferred language: ${ticket.language}`,
        `Requester alias: ${ticket.alias || "-"}`,
        "",
        "FUNCTION / SCOPE",
        ticket.description,
        "",
        "INPUTS",
        ticket.inputs || "-",
        "",
        "EXPECTED OUTPUT",
        ticket.output || "-",
        "",
        "PUBLIC RELEASE CONSENT: YES",
        "SENSITIVE DATA CONSENT: YES",
        "",
        "PAYMENT STATUS: NOT PAID / WAITING FOR APPROVAL",
        "Do not post payment proof or sensitive financial information publicly."
    ].join("\n");
}

function githubUrl(ticket) {
    const title = `[Paid Tool Request] ${ticket.id} - ${ticket.toolName}`;
    const body = `${ticket.summary}\n\n---\nThis ticket contains no payment proof. Payment is verified separately by the AREStyx owner.`;
    const params = new URLSearchParams({ title, body });
    return `${REPOSITORY_ISSUE_URL}?${params.toString()}`;
}

function applyLanguage() {
    document.documentElement.lang = currentLanguage;
    document.querySelectorAll("[data-i18n]").forEach(node => {
        const key = node.dataset.i18n;
        const text = i18n[currentLanguage][key];
        if (typeof text !== "string") return;
        if (key.startsWith("rule")) node.innerHTML = text;
        else node.textContent = text;
    });
    const english = currentLanguage === "en";
    document.getElementById("toolName").placeholder = english ? "Example: Marine Fuel Density Calculator" : "Contoh: Marine Fuel Density Calculator";
    document.getElementById("description").placeholder = english ? "Explain the function, problem to solve, and intended users." : "Jelaskan fungsi, masalah yang ingin diselesaikan, dan siapa yang akan menggunakannya.";
    document.getElementById("inputs").placeholder = english ? "Example: observed density, temperature, API gravity..." : "Contoh: density @ observed temperature, temperature, API gravity...";
    document.getElementById("output").placeholder = english ? "Example: density @15°C, kg/L, formula used..." : "Contoh: density @15°C, kg/L, formula yang dipakai...";
    document.getElementById("alias").placeholder = english ? "Display name" : "Nama panggilan";
    document.querySelector("#tier option[value='simple']").textContent = `Simple — ${formatRupiah(PRICE_TIERS.simple.price)}`;
    document.querySelector("#tier option[value='standard']").textContent = `Standard — ${formatRupiah(PRICE_TIERS.standard.price)}`;
    document.querySelector("#tier option[value='advanced']").textContent = `Advanced — ${formatRupiah(PRICE_TIERS.advanced.price)}`;
    document.querySelector("#tier option[value='custom']").textContent = english ? "Custom — review first" : "Custom — review dahulu";
    languageButton.textContent = currentLanguage === "id" ? "EN" : "ID";
}

languageButton.addEventListener("click", () => {
    currentLanguage = currentLanguage === "id" ? "en" : "id";
    try {
        localStorage.setItem("arestyx-language", currentLanguage);
    } catch {}
    applyLanguage();
});

form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const tierKey = value("tier");
    const tier = PRICE_TIERS[tierKey];
    const id = makeRequestId();
    const verification = makeVerificationCode();
    const basePrice = tier.price;
    const exactAmount = Number.isFinite(basePrice) ? basePrice + Number(verification) : null;

    activeTicket = {
        id,
        created: new Date().toLocaleString("id-ID"),
        toolName: value("toolName"),
        category: value("category"),
        tierKey,
        tierLabel: tier.label,
        basePrice,
        priceLabel: formatRupiah(basePrice),
        exactAmount,
        verification,
        description: value("description"),
        inputs: value("inputs"),
        output: value("output"),
        alias: value("alias"),
        language: value("language")
    };
    activeTicket.summary = buildSummary(activeTicket);

    requestIdEl.textContent = id;
    ticketTierEl.textContent = tier.label;
    ticketPriceEl.textContent = activeTicket.priceLabel;
    summaryBox.value = activeTicket.summary;
    githubIssue.href = githubUrl(activeTicket);

    approvedCheck.checked = false;
    paymentContent.hidden = true;
    paymentLocked.hidden = false;
    if (Number.isFinite(exactAmount)) {
        exactAmountEl.textContent = formatRupiah(exactAmount);
        verificationCodeEl.textContent = verification;
        approvedCheck.disabled = false;
    } else {
        exactAmountEl.textContent = "Quote";
        verificationCodeEl.textContent = "---";
        approvedCheck.disabled = true;
    }

    resultSection.hidden = false;
    resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

approvedCheck.addEventListener("change", () => {
    if (!activeTicket || !Number.isFinite(activeTicket.exactAmount)) return;
    paymentContent.hidden = !approvedCheck.checked;
    paymentLocked.hidden = approvedCheck.checked;
});

document.getElementById("copySummary").addEventListener("click", async () => {
    if (!activeTicket) return;
    try {
        await navigator.clipboard.writeText(activeTicket.summary);
        toast(currentLanguage === "id" ? "Request berhasil disalin." : "Request copied.");
    } catch {
        summaryBox.select();
        document.execCommand("copy");
        toast(currentLanguage === "id" ? "Request berhasil disalin." : "Request copied.");
    }
});

document.getElementById("downloadSummary").addEventListener("click", () => {
    if (!activeTicket) return;
    const blob = new Blob([activeTicket.summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${activeTicket.id}-arestyx-tool-request.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
});

document.getElementById("shareSummary").addEventListener("click", async () => {
    if (!activeTicket) return;
    if (!navigator.share) {
        toast(currentLanguage === "id" ? "Web Share tidak tersedia; gunakan Salin Request." : "Web Share is unavailable; use Copy Request.");
        return;
    }
    try {
        await navigator.share({ title: `AREStyx ${activeTicket.id}`, text: activeTicket.summary });
    } catch (error) {
        if (error && error.name !== "AbortError") toast("Share failed.");
    }
});

document.getElementById("resetRequest").addEventListener("click", () => {
    form.reset();
    document.getElementById("tier").value = "standard";
    resultSection.hidden = true;
    activeTicket = null;
});

applyLanguage();
