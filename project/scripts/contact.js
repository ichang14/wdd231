// contact.js
// Contact page: client-side form validation + WhatsApp Click to Chat link.
// The <form> uses action="thankyou.html" method="get", so once validated,
// the browser builds the URL with the data as Search Params.

const WHATSAPP_NUMBER = '56900000000'; // TODO: replace with Oruguitas Deco's real number

const contactForm = document.getElementById('contactForm');
const whatsappBtn = document.getElementById('whatsappBtn');

function validateField(input, errorEl, message) {
    if (!input.checkValidity()) {
        errorEl.textContent = message;
        return false;
    }
    errorEl.textContent = '';
    return true;
}

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        // TODO: validate name, email, phone, message; event.preventDefault() if invalid
        // If valid, let the native GET submission proceed to thankyou.html?name=...&email=...
        const nameOk = validateField(
            document.getElementById('nameInput'),
            document.getElementById('nameError'),
            'Please enter your name (at least 2 characters).'
        );
        const emailOk = validateField(
            document.getElementById('emailInput'),
            document.getElementById('emailError'),
            'Please enter a valid email address.'
        );
        const messageOk = validateField(
            document.getElementById('messageInput'),
            document.getElementById('messageError'),
            'Please tell us a bit more (at least 10 characters).'
        );

        if (!nameOk || !emailOk || !messageOk) {
            event.preventDefault();
        }

        // TODO: also send via EmailJS here (in addition to, or instead of, the GET redirect)
    });
}

if (whatsappBtn) {
    const message = encodeURIComponent('Hi Oruguitas Deco, I would like a quote for a personalized gift.');
    whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

// TODO: Google Maps Embed — insert an <iframe> in #mapEmbed with the real business address
