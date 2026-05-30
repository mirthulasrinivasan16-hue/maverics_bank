// ==========================================
// MAVERICS BANK - MAIN JS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Maverics Bank Loaded");

    // Tooltips

    const tooltipTriggerList =
        document.querySelectorAll('[data-bs-toggle="tooltip"]');

    [...tooltipTriggerList].forEach(el => {
        new bootstrap.Tooltip(el);
    });

});