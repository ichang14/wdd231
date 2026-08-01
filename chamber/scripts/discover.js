const url = "data/locations.json";
const cards = document.querySelector("#discover-grid");

async function getLocations() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Could not fetch locations.");
        }

        const data = await response.json();

        displayLocations(data);

    } catch (error) {
        console.error(error);
    }
}

const displayLocations = (locations) => {

    locations.forEach(location => {

        const card = document.createElement("article");
        card.classList.add("discover-card");

        const image = document.createElement("img");
        image.src = location.image;
        image.alt = location.alt;
        image.loading = "lazy";
        image.width = 400;
        image.height = 250;

        const section = document.createElement("section");

        const title = document.createElement("h2");
        title.textContent = location.name;

        const address = document.createElement("address");
        address.textContent = location.address;

        const description = document.createElement("p");
        description.textContent = location.description;

        const button = document.createElement("button");
        button.textContent = "Learn More";

        button.addEventListener("click", () => {
            window.open(location.learnMore, "_blank");
        });

        section.appendChild(title);
        section.appendChild(address);
        section.appendChild(description);
        section.appendChild(button);

        card.appendChild(image);
        card.appendChild(section);

        cards.appendChild(card);

    });

};


getLocations();

const visitMessage = document.querySelector("#visit-message");

const lastVisit = localStorage.getItem("lastVisit");

const now = Date.now();

if (!lastVisit) {

    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";

} else {

    const daysBetween = Math.floor(
        (now - Number(lastVisit)) / (1000 * 60 * 60 * 24)
    );

    if (daysBetween < 1) {

        visitMessage.textContent =
            "Back so soon! Awesome!";

    } else if (daysBetween === 1) {

        visitMessage.textContent =
            "You last visited 1 day ago.";

    } else {

        visitMessage.textContent =
            `You last visited ${daysBetween} days ago.`;

    }

}

localStorage.setItem("lastVisit", now);
