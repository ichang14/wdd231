const WHATSAPP_NUMBER = '56900000000';
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

    });
}

if (whatsappBtn) {
    const message = encodeURIComponent('Hi Oruguitas Deco, I would like a quote for a personalized gift.');
    whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

