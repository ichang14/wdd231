
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('primaryNav');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

const themeToggle = document.getElementById('themeToggle');
const THEME_KEY = 'oruguitas-theme';

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
        themeToggle.textContent = theme === 'dark' ? '☀️ Light mode' : '🌙 Dark mode';
    }
}

const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
    });
}

export { applyTheme };
