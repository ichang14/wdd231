
const PRODUCTS_URL = 'data/products.json';

const productSelect = document.getElementById('productSelect');
const colorSelect = document.getElementById('colorSelect');
const sizeSelect = document.getElementById('sizeSelect');
const customText = document.getElementById('customText');
const fontSelect = document.getElementById('fontSelect');
const previewFrame = document.getElementById('previewFrame');
const estimatedPrice = document.getElementById('estimatedPrice');
const addToCartBtn = document.getElementById('addToCartBtn');
const requestQuoteBtn = document.getElementById('requestQuoteBtn');

let allProducts = [];
let currentProduct = null;

async function loadProducts() {
    try {
        const response = await fetch(PRODUCTS_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        allProducts = await response.json();
        populateProductSelect(allProducts);
        selectProduct(allProducts[0]?.id);
    } catch (error) {
        previewFrame.innerHTML = `<p>We couldn't load the catalog.</p>`;
        console.error('Error loading products.json:', error);
    }
}

function populateProductSelect(list) {
    productSelect.innerHTML = list.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
}

function selectProduct(id) {
    currentProduct = allProducts.find(p => p.id === id);
    if (!currentProduct) return;

    colorSelect.innerHTML = currentProduct.colors.map(c => `<option value="${c}">${c}</option>`).join('');
    sizeSelect.innerHTML = (currentProduct.sizes.length ? currentProduct.sizes : ['One size']).map(s => `<option value="${s}">${s}</option>`).join('');

    updatePreview();
}

function updatePreview() {
    if (!currentProduct) return;

    previewFrame.innerHTML = `
        <img src="${currentProduct.image}" alt="Preview of ${currentProduct.name}">
        <div class="preview-text-overlay" style="font-family:${fontSelect.value}">${customText.value}</div>
    `;

    estimatedPrice.textContent = `$${currentProduct.price.toLocaleString('en-US')}`;
}

if (productSelect) productSelect.addEventListener('change', (e) => selectProduct(e.target.value));
[colorSelect, sizeSelect, customText, fontSelect].forEach(el => {
    if (el) el.addEventListener('input', updatePreview);
});

loadProducts();
