// products.js
// Products page: dynamic catalog from data/products.json + search,
// category filters, favorites, cart (Local Storage) and detail modal.

const PRODUCTS_URL = 'data/products.json';

const productGrid = document.getElementById('productGrid');
const resultsCount = document.getElementById('resultsCount');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const favoritesOnly = document.getElementById('favoritesOnly');
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');

let allProducts = [];

async function loadProducts() {
    try {
        const response = await fetch(PRODUCTS_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        allProducts = await response.json();
        renderProducts(allProducts);
    } catch (error) {
        productGrid.innerHTML = `<p>We couldn't load the products. Please try again later.</p>`;
        console.error('Error loading products.json:', error);
    }
}

function renderProducts(list) {
    // TODO: build cards with template literals from `list`
    // TODO: each card shows image, name, price, "View details" (opens modal) and "Add" (cart) buttons
    resultsCount.textContent = `${list.length} product(s) found`;
    productGrid.innerHTML = list.map(cardTemplate).join('');
}

function cardTemplate(product) {
    return `
        <article class="card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="card-body">
                <h3>${product.name}</h3>
                <p class="card-price">$${product.price.toLocaleString('en-US')}</p>
                <div class="card-actions">
                    <button class="btn" data-action="details" data-id="${product.id}">View details</button>
                    <button class="icon-btn" data-action="favorite" data-id="${product.id}" aria-label="Add to favorites">♥</button>
                </div>
            </div>
        </article>
    `;
}

function filterProducts() {
    // TODO: combine searchInput value, categorySelect value, and favoritesOnly checkbox
    // against allProducts (array methods: filter), then call renderProducts()
}

if (searchInput) searchInput.addEventListener('input', filterProducts);
if (categorySelect) categorySelect.addEventListener('change', filterProducts);
if (favoritesOnly) favoritesOnly.addEventListener('change', filterProducts);

// TODO: openProductModal(id) — populate #productModalContent and productModal.showModal()
if (closeModal) closeModal.addEventListener('click', () => productModal.close());

// TODO: cart functions — addToCart(id), removeFromCart(id), renderCart() using Local Storage key 'oruguitas-cart'
// TODO: favorites functions — toggleFavorite(id), using Local Storage key 'oruguitas-favorites'

loadProducts();
