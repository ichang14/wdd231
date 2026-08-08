
const PRODUCTS_URL = 'data/products.json';
const FAVORITES_KEY = 'oruguitas-favorites';
const CART_KEY = 'oruguitas-cart';
const RECENT_KEY = 'oruguitas-recently-viewed';

const productGrid = document.getElementById('productGrid');
const resultsCount = document.getElementById('resultsCount');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const favoritesOnly = document.getElementById('favoritesOnly');
const productModal = document.getElementById('productModal');
const productModalContent = document.getElementById('productModalContent');
const closeModal = document.getElementById('closeModal');
const cartList = document.getElementById('cartList');
const cartTotal = document.getElementById('cartTotal');

let allProducts = [];

function getFavorites() {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
}

function toggleFavorite(id) {
    const favorites = getFavorites();
    const index = favorites.indexOf(id);
    if (index === -1) {
        favorites.push(id);
    } else {
        favorites.splice(index, 1);
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function addToCart(id) {
    const cart = getCart();
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, qty: 1 });
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
}

function removeFromCart(id) {
    const cart = getCart().filter(item => item.id !== id);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
}

function trackRecentlyViewed(id) {
    let recent = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    recent = recent.filter(existingId => existingId !== id);
    recent.unshift(id);
    recent = recent.slice(0, 8);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
}

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
    const favorites = getFavorites();
    resultsCount.textContent = `${list.length} product(s) found`;

    if (list.length === 0) {
        productGrid.innerHTML = `<p>No products match your search.</p>`;
        return;
    }

    productGrid.innerHTML = list.map(product => cardTemplate(product, favorites.includes(product.id))).join('');
}

function cardTemplate(product, isFavorite) {
    return `
        <article class="card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="card-body">
                <h3>${product.name}</h3>
                <p class="card-price">$${product.price.toLocaleString('en-US')}</p>
                <div class="card-actions">
                    <button class="btn" data-action="details" data-id="${product.id}">View details</button>
                    <button class="icon-btn${isFavorite ? ' is-favorite' : ''}" data-action="favorite" data-id="${product.id}" aria-label="Toggle favorite">♥</button>
                </div>
            </div>
        </article>
    `;
}

function filterProducts() {
    const term = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;
    const onlyFavorites = favoritesOnly.checked;
    const favorites = getFavorites();

    const filtered = allProducts.filter(product => {
        const matchesTerm = !term ||
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term) ||
            product.tags.some(tag => tag.toLowerCase().includes(term));

        const matchesCategory = category === 'all' || product.category === category;
        const matchesFavorite = !onlyFavorites || favorites.includes(product.id);

        return matchesTerm && matchesCategory && matchesFavorite;
    });

    renderProducts(filtered);
}

searchInput.addEventListener('input', filterProducts);
categorySelect.addEventListener('change', filterProducts);
favoritesOnly.addEventListener('change', filterProducts);

productGrid.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;

    const { action, id } = button.dataset;

    if (action === 'details') {
        openProductModal(id);
    }

    if (action === 'favorite') {
        toggleFavorite(id);
        button.classList.toggle('is-favorite');
    }
});

function openProductModal(id) {
    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    trackRecentlyViewed(id);

    productModalContent.innerHTML = `
        <button class="modal-close" id="closeModal" aria-label="Close">&times;</button>
        <img src="${product.image}" alt="${product.name}" style="border-radius: var(--radius); margin-bottom: 1rem;">
        <h3>${product.name}</h3>
        <p class="card-price">$${product.price.toLocaleString('en-US')}</p>
        <p>${product.description}</p>
        <p><strong>Colors:</strong> ${product.colors.join(', ')}</p>
        <p><strong>Sizes:</strong> ${product.sizes.length ? product.sizes.join(', ') : 'One size'}</p>
        <p><strong>Customizable:</strong> ${product.customizable.join(', ')}</p>
        <div class="card-actions">
            <button class="btn" id="modalAddToCart" data-id="${product.id}">Add to cart</button>
            <a class="btn btn-accent" href="customize.html">Customize this</a>
        </div>
    `;

    productModal.showModal();

    document.getElementById('closeModal').addEventListener('click', () => productModal.close());
    document.getElementById('modalAddToCart').addEventListener('click', () => {
        addToCart(product.id);
        productModal.close();
    });
}

closeModal.addEventListener('click', () => productModal.close());
productModal.addEventListener('click', (event) => {
    if (event.target === productModal) productModal.close();
});


function renderCart() {
    const cart = getCart();

    if (cart.length === 0) {
        cartList.innerHTML = '<li>Your cart is empty.</li>';
        cartTotal.textContent = '';
        return;
    }

    let total = 0;
    cartList.innerHTML = cart.map(item => {
        const product = allProducts.find(p => p.id === item.id);
        if (!product) return '';
        const lineTotal = product.price * item.qty;
        total += lineTotal;
        return `
            <li>
                ${product.name} × ${item.qty} — $${lineTotal.toLocaleString('en-US')}
                <button class="icon-btn" data-remove="${item.id}" aria-label="Remove from cart">✕</button>
            </li>
        `;
    }).join('');

    cartTotal.textContent = `Total: $${total.toLocaleString('en-US')}`;
}

cartList.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-remove]');
    if (!button) return;
    removeFromCart(button.dataset.remove);
});


loadProducts().then(renderCart);