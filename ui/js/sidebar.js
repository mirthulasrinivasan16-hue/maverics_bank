// ==========================================
// SIDEBAR TOGGLE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const toggleBtn =
        document.querySelector(".mobile-toggle");

    const sidebar =
        document.querySelector(".sidebar");

    if(toggleBtn && sidebar){

        toggleBtn.addEventListener("click", () => {

            sidebar.classList.toggle("show");

        });

    }

});