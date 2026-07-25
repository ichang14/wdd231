const params = new URLSearchParams(window.location.search);

document.querySelector("#firstName").textContent =
    params.get("firstname") || "";

document.querySelector("#lastName").textContent =
    params.get("lastname") || "";

document.querySelector("#email").textContent =
    params.get("email") || "";

document.querySelector("#phone").textContent =
    params.get("phone") || "";

document.querySelector("#organization").textContent =
    params.get("organization") || "";

const membership = params.get("membership");

const membershipNames = {
    np: "NP Membership",
    bronze: "Bronze Membership",
    silver: "Silver Membership",
    gold: "Gold Membership"
};

document.querySelector("#membership").textContent =
    membershipNames[membership] || membership;

const timestamp = params.get("timestamp");

if (timestamp) {
    document.querySelector("#timestampDisplay").textContent =
        new Date(timestamp).toLocaleString();
}
