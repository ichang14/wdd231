const summaryList = document.getElementById('summaryList');
const params = new URLSearchParams(window.location.search);

const labels = {
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    productType: 'Product of interest',
    message: 'Message',
};

if (summaryList) {
    const entries = [...params.entries()].filter(([, value]) => value.trim() !== '');

    if (entries.length === 0) {
        summaryList.innerHTML = '<p>We could not find any submitted data.</p>';
    } else {
        summaryList.innerHTML = entries
            .map(([key, value]) => `<dt>${labels[key] || key}</dt><dd>${value}</dd>`)
            .join('');
    }
}
