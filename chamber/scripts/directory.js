const directoryContainer = document.querySelector("#directory");
const gridBtn = document.querySelector("#grid-view");
const listBtn = document.querySelector("#list-view");

const membershipLabels = {
    1: "Member",
    2: "Silver",
    3: "Gold"
};

async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        directoryContainer.innerHTML = "<p>Sorry, member information could not be loaded.</p>";
        console.error("Error fetching members.json:", error);
    }
}

function displayMembers(members) {
    directoryContainer.innerHTML = "";

    const memberCount = document.querySelector("#member-count");
    memberCount.textContent = `${members.length} Member Businesses`;

    members.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" width="72" height="72" loading="lazy">
            <div class="member-info">
                <span class="badge badge-${member.membership}">${membershipLabels[member.membership]}</span>
                <h2>${member.name}</h2>
                <p class="category">${member.category}</p>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p>${member.description}</p>
                <a class="website" href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
            </div>
        `;

        directoryContainer.appendChild(card);
    });
}

gridBtn.addEventListener("click", () => {
    directoryContainer.classList.remove("list-view");
    gridBtn.classList.add("active-view");
    listBtn.classList.remove("active-view");
});

listBtn.addEventListener("click", () => {
    directoryContainer.classList.add("list-view");
    listBtn.classList.add("active-view");
    gridBtn.classList.remove("active-view");
});

getMembers();