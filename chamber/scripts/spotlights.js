async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();
        displaySpotlights(members);
    } catch (error) {
        console.error("Error fetching members data:", error);
    }
}

function displaySpotlights(members) {

    const eligible = members.filter(
        (member) => member.membership === 2 || member.membership === 3
    );

    for (let i = eligible.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [eligible[i], eligible[j]] = [eligible[j], eligible[i]];
    }

    const count = Math.min(eligible.length, Math.random() < 0.5 ? 2 : 3);
    const selected = eligible.slice(0, count);

    const container = document.querySelector("#spotlight-cards");
    container.innerHTML = "";

    selected.forEach((member) => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card", "card");

        const levelText = member.membership === 3 ? "Gold Member" : "Silver Member";

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" width="120" height="120" loading="lazy">
            <h3>${member.name}</h3>
            <p class="spotlight-level">${levelText}</p>
            <p>${member.phone}</p>
            <p>${member.address}</p>
            <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a>
        `;

        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", getSpotlights);