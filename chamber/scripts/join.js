// Set timestamp
document.addEventListener("DOMContentLoaded", () => {

    const timestamp = document.querySelector("#timestamp");

    if (timestamp) {
        timestamp.value = new Date().toISOString();
    }

    // Dialogs
    const dialogs = {
        np: document.querySelector("#npDialog"),
        bronze: document.querySelector("#bronzeDialog"),
        silver: document.querySelector("#silverDialog"),
        gold: document.querySelector("#goldDialog")
    };

    // Open buttons
    document.querySelector("#npBtn").addEventListener("click", () => {
        dialogs.np.showModal();
    });

    document.querySelector("#bronzeBtn").addEventListener("click", () => {
        dialogs.bronze.showModal();
    });

    document.querySelector("#silverBtn").addEventListener("click", () => {
        dialogs.silver.showModal();
    });

    document.querySelector("#goldBtn").addEventListener("click", () => {
        dialogs.gold.showModal();
    });

    // Close buttons
    document.querySelector("#closeNp").addEventListener("click", () => {
        dialogs.np.close();
    });

    document.querySelector("#closeBronze").addEventListener("click", () => {
        dialogs.bronze.close();
    });

    document.querySelector("#closeSilver").addEventListener("click", () => {
        dialogs.silver.close();
    });

    document.querySelector("#closeGold").addEventListener("click", () => {
        dialogs.gold.close();
    });

});