
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

const PRODUCTS_URL = 'data/products.json';
const RECENT_KEY = 'oruguitas-recently-viewed';

const featuredGrid = document.getElementById('featuredProducts');
const recentGrid = document.getElementById('recentlyViewed');

function homeCardTemplate(product) {
    return `
        <article class="card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="card-body">
                <h3>${product.name}</h3>
                <p class="card-price">$${product.price.toLocaleString('en-US')}</p>
                <div class="card-actions">
                    <a class="btn" href="products.html">View in catalog</a>
                </div>
            </div>
        </article>
    `;
}

async function loadHomeSections() {
    if (!featuredGrid && !recentGrid) return;

    try {
        const response = await fetch(PRODUCTS_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const allProducts = await response.json();

        if (featuredGrid) {
            const featured = allProducts.filter(product => product.featured);
            featuredGrid.innerHTML = featured.length
                ? featured.map(homeCardTemplate).join('')
                : '<p>No featured products yet.</p>';
        }

        if (recentGrid) {
            const recentIds = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
            const recentProducts = recentIds
                .map(id => allProducts.find(product => product.id === id))
                .filter(Boolean);

            recentGrid.innerHTML = recentProducts.length
                ? recentProducts.map(homeCardTemplate).join('')
                : `<p>You haven't viewed any products yet. <a href="products.html">Browse the catalog</a>.</p>`;
        }
    } catch (error) {
        if (featuredGrid) featuredGrid.innerHTML = '<p>We couldn\'t load featured products.</p>';
        console.error('Error loading products.json on Home:', error);
    }
}

loadHomeSections();

export { applyTheme };