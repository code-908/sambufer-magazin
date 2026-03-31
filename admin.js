// =============================================
// SAMBUFER — Admin Panel JS
// =============================================

// ============ AUTH CHECK ============
(function () {
    const auth = localStorage.getItem('sambufer_admin_auth');
    if (auth === '1') {
        document.getElementById('auth-guard').style.display = 'none';
        document.getElementById('admin-app').style.display  = 'flex';
        initAdmin();
    } else {
        document.getElementById('auth-guard').style.display = 'flex';
        document.getElementById('admin-app').style.display  = 'none';
    }
})();

// ============ INIT ============
function initAdmin() {
    updateClock();
    setInterval(updateClock, 1000);
    loadOrdersPage();
    updateOrdersBadge();
}

function updateClock() {
    const el = document.getElementById('current-time');
    if (el) el.textContent = new Date().toLocaleTimeString('uz-UZ');
}

// ============ LOGOUT ============
function adminLogout() {
    localStorage.removeItem('sambufer_admin_auth');
    window.location.href = 'index.html';
}

// ============ SIDEBAR TOGGLE ============
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// ============ PAGE SWITCH ============
let currentPage = 'orders';

function switchPage(page) {
    // Hide all pages
    document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    document.getElementById('page-' + page).classList.add('active');
    document.getElementById('nav-' + page).classList.add('active');
    currentPage = page;

    // Update topbar
    const titles = {
        orders:    ['📦 Buyurtmalar',   'Yangi buyurtmalarni boshqaring'],
        warehouse: ['🏪 Ombor',          'Mahsulotlarni boshqaring'],
        reports:   ['📊 Hisobot',        'Savdo statistikasi va tarix']
    };
    document.getElementById('page-title').textContent    = titles[page][0];
    document.getElementById('page-subtitle').textContent = titles[page][1];

    if (page === 'orders')    loadOrdersPage();
    if (page === 'warehouse') loadWarehousePage();
    if (page === 'reports')   loadReportsPage();

    // Close sidebar on mobile
    if (window.innerWidth < 900) {
        document.getElementById('sidebar').classList.remove('open');
    }
}

// =============================================
// ORDERS
// =============================================
let orderFilter = 'all';

function getOrders() {
    return JSON.parse(localStorage.getItem('sambufer_orders') || '[]');
}
function saveOrders(orders) {
    localStorage.setItem('sambufer_orders', JSON.stringify(orders));
}

function updateOrdersBadge() {
    const pending = getOrders().filter(o => o.status === 'pending').length;
    const badge = document.getElementById('orders-badge');
    if (badge) {
        badge.textContent = pending;
        badge.style.display = pending > 0 ? 'flex' : 'none';
    }
}

function filterOrders(filter, btn) {
    orderFilter = filter;
    document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderOrders();
}

function loadOrdersPage() {
    renderStats();
    renderOrders();
}

function renderStats() {
    const orders = getOrders();
    const pending = orders.filter(o => o.status === 'pending').length;
    const sold    = orders.filter(o => o.status === 'sold').length;
    const revenue = orders
        .filter(o => o.status === 'sold')
        .reduce((s, o) => s + (o.total || 0), 0);

    const ep = document.getElementById('stat-pending');
    const es = document.getElementById('stat-sold');
    const er = document.getElementById('stat-revenue');
    if (ep) ep.textContent = pending;
    if (es) es.textContent = sold;
    if (er) er.textContent = revenue.toLocaleString() + ' som';
}

function renderOrders() {
    const container = document.getElementById('orders-container');
    if (!container) return;

    let orders = getOrders();
    if (orderFilter === 'pending') orders = orders.filter(o => o.status === 'pending');
    if (orderFilter === 'sold')    orders = orders.filter(o => o.status === 'sold');

    // Sort: newest first
    orders = orders.slice().reverse();

    if (orders.length === 0) {
        container.innerHTML = `
        <div class="empty-state">
            <div class="es-icon">📭</div>
            <h3>Buyurtmalar yo'q</h3>
            <p>Hozircha hech qanday buyurtma kelib tushmagan</p>
        </div>`;
        return;
    }

    container.innerHTML = orders.map(order => {
        const isSold = order.status === 'sold';
        const itemPills = order.items.map(it =>
            `<span class="order-item-pill">${it.name.split('—')[0].trim()} × ${it.qty}</span>`
        ).join('');

        return `
        <div class="order-card ${isSold ? 'sold' : ''}" id="ocard-${order.id}">
            <div class="order-card-header">
                <div>
                    <p class="order-id">🆔 #${order.id}</p>
                    <p class="order-customer">👤 ${order.customer.name}</p>
                    <p class="order-phone">📞 ${order.customer.phone}</p>
                    <p class="order-address">📍 ${order.customer.address}</p>
                    ${order.customer.note ? `<p class="order-address">💬 ${order.customer.note}</p>` : ''}
                </div>
                <div style="text-align:right;">
                    <span class="order-status-badge ${isSold ? 'badge-sold' : 'badge-pending'}">
                        ${isSold ? '✅ Sotildi' : '⏳ Kutilmoqda'}
                    </span>
                    <p class="order-date" style="margin-top:8px;">🕐 ${order.date}</p>
                    <p class="order-date">${order.items.length} ta mahsulot</p>
                </div>
            </div>
            <div class="order-items-row">${itemPills}</div>
            <div class="order-footer">
                <span class="order-total">${(order.total || 0).toLocaleString()} som</span>
                <div class="order-actions">
                    <button class="btn-detail" onclick="openOrderDetail(${order.id})">👁 Batafsil</button>
                    ${!isSold ? `<button class="btn-sold" onclick="markAsSold(${order.id})">✅ Sotildi</button>` : ''}
                    <button class="btn-delete" onclick="deleteOrder(${order.id})">🗑</button>
                </div>
            </div>
        </div>`;
    }).join('');
}

function markAsSold(orderId) {
    const orders = getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) return;
    orders[idx].status = 'sold';
    orders[idx].soldAt = new Date().toLocaleString('uz-UZ');
    saveOrders(orders);
    showAdminToast('✅ Buyurtma sotildi deb belgilandi!');
    loadOrdersPage();
    updateOrdersBadge();
    renderStats();
}

function deleteOrder(orderId) {
    if (!confirm('Bu buyurtmani o\'chirmoqchimisiz?')) return;
    const orders = getOrders().filter(o => o.id !== orderId);
    saveOrders(orders);
    showAdminToast('🗑 Buyurtma o\'chirildi');
    loadOrdersPage();
    updateOrdersBadge();
}

// ---------- ORDER DETAIL ----------
let detailOrderId = null;

function openOrderDetail(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    detailOrderId = orderId;

    const body = document.getElementById('order-detail-body');
    const acts = document.getElementById('order-detail-actions');

    body.innerHTML = `
        <div class="detail-row"><span class="detail-label">🆔 Buyurtma ID</span><span class="detail-val">#${order.id}</span></div>
        <div class="detail-row"><span class="detail-label">📅 Sana</span><span class="detail-val">${order.date}</span></div>
        <div class="detail-row"><span class="detail-label">👤 Mijoz</span><span class="detail-val" style="font-weight:700;">${order.customer.name}</span></div>
        <div class="detail-row"><span class="detail-label">📞 Telefon</span><span class="detail-val" style="color:#7000ff;font-weight:600;">${order.customer.phone}</span></div>
        <div class="detail-row"><span class="detail-label">📍 Manzil</span><span class="detail-val">${order.customer.address}</span></div>
        ${order.customer.note ? `<div class="detail-row"><span class="detail-label">💬 Izoh</span><span class="detail-val">${order.customer.note}</span></div>` : ''}
        <div class="detail-row"><span class="detail-label">📊 Holat</span>
            <span class="order-status-badge ${order.status === 'sold' ? 'badge-sold' : 'badge-pending'}">
                ${order.status === 'sold' ? '✅ Sotildi' : '⏳ Kutilmoqda'}
            </span>
        </div>
        <div style="margin-top:16px;">
            <p style="font-size:13px;font-weight:700;color:#6b6b8a;margin-bottom:10px;">🛍️ BUYURTMA QILINGAN MAHSULOTLAR:</p>
            ${order.items.map(it => `
                <div class="detail-item">
                    <img src="${it.image || ''}" alt="${it.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'><rect width=\\'100\\' height=\\'100\\' fill=\\'%23f0e6ff\\'/></svg>'">
                    <div style="flex:1;">
                        <p style="font-size:13px;font-weight:700;">${it.name}</p>
                        <p style="font-size:12px;color:#6b6b8a;">${it.category} • ${it.qty} dona</p>
                    </div>
                    <span style="font-weight:800;color:#7000ff;">${(it.price * it.qty).toLocaleString()} som</span>
                </div>`).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;padding:16px 0 4px;font-size:18px;font-weight:900;color:#7000ff;">
            <span>Jami:</span><span>${(order.total || 0).toLocaleString()} som</span>
        </div>`;

    const isSold = order.status === 'sold';
    acts.innerHTML = `
        ${!isSold ? `<button class="btn-sold" style="flex:1;" onclick="markAsSold(${order.id});closeOrderDetail();">✅ Sotildi deb belgilash</button>` : ''}
        <button class="btn-delete" onclick="deleteOrder(${order.id});closeOrderDetail();">🗑 O'chirish</button>
        <button class="btn-detail" style="flex:1;" onclick="closeOrderDetail()">Yopish</button>`;

    document.getElementById('order-detail-modal').style.display = 'flex';
}

function closeOrderDetail() {
    document.getElementById('order-detail-modal').style.display = 'none';
}

// =============================================
// WAREHOUSE
// =============================================
function getWHProducts() {
    return JSON.parse(localStorage.getItem('sambufer_wh_products') || '[]');
}
function saveWHProducts(list) {
    localStorage.setItem('sambufer_wh_products', JSON.stringify(list));
}

function loadWarehousePage() {
    renderWarehouse();
}

function renderWarehouse() {
    const products = getWHProducts();
    const grid = document.getElementById('warehouse-grid');
    const cnt  = document.getElementById('wh-count');
    if (cnt) cnt.textContent = products.length + ' ta mahsulot';
    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;">
            <div class="es-icon">📦</div>
            <h3>Ombor bo'sh</h3>
            <p>«Mahsulot qo'shish» tugmasini bosing</p>
        </div>`;
        return;
    }

    grid.innerHTML = products.slice().reverse().map(p => `
        <div class="wh-card">
            <img class="wh-img" src="${p.image}" alt="${p.name}"
                onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23f0e6ff\'/%3E%3Ctext x=\'50\' y=\'54\' text-anchor=\'middle\' font-size=\'32\'%3E📦%3C/text%3E%3C/svg%3E'">
            <div class="wh-info">
                <span class="wh-brand">${p.category}</span>
                <span class="wh-custom-badge" style="float:right;">Qo'shilgan</span>
                <p class="wh-name">${p.name}</p>
                ${p.description ? `<p style="font-size:11px;color:#a0a0b0;margin-bottom:6px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${p.description}</p>` : ''}
                <div class="wh-footer">
                    <div>
                        ${p.oldPrice ? `<p class="wh-old-price">${Number(p.oldPrice).toLocaleString()} som</p>` : ''}
                        <p class="wh-price">${Number(p.price).toLocaleString()} som</p>
                    </div>
                    <button class="wh-del-btn" onclick="deleteWHProduct(${p.id})" title="O'chirish">🗑</button>
                </div>
            </div>
        </div>`).join('');
}

function openAddProduct() {
    document.getElementById('add-product-modal').style.display = 'flex';
    document.getElementById('add-product-form').reset();
    document.getElementById('ap-img-preview').style.display = 'none';
}
function closeAddProduct() {
    document.getElementById('add-product-modal').style.display = 'none';
}

function previewImage(input) {
    if (!input.files || !input.files[0]) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('ap-img-preview-img').src = e.target.result;
        document.getElementById('ap-img-preview').style.display = 'block';
        document.getElementById('ap-image-url').value = '';
    };
    reader.readAsDataURL(input.files[0]);
}

function handleAddProduct(e) {
    e.preventDefault();
    const name     = document.getElementById('ap-name').value.trim();
    const category = document.getElementById('ap-category').value;
    const price    = document.getElementById('ap-price').value;
    const oldPrice = document.getElementById('ap-old-price').value;
    const desc     = document.getElementById('ap-desc').value.trim();
    const rating   = parseFloat(document.getElementById('ap-rating').value) || 4.5;
    const reviews  = parseInt(document.getElementById('ap-reviews').value)  || 0;

    // Image: file preview or URL
    let image = '';
    const previewSrc = document.getElementById('ap-img-preview-img').src;
    const urlInput   = document.getElementById('ap-image-url').value.trim();
    if (previewSrc && document.getElementById('ap-img-preview').style.display !== 'none') {
        image = previewSrc;
    } else if (urlInput) {
        image = urlInput;
    } else {
        // Generate SVG placeholder
        image = generatePlaceholderSVG(category, name);
    }

    const products = getWHProducts();
    const newProd = {
        id:          Date.now(),
        name, category,
        price:       Number(price),
        oldPrice:    oldPrice ? Number(oldPrice) : null,
        description: desc,
        rating, reviews,
        image,
        addedAt:     new Date().toLocaleString('uz-UZ')
    };
    products.push(newProd);
    saveWHProducts(products);
    closeAddProduct();
    renderWarehouse();
    showAdminToast('✅ Mahsulot omborga qo\'shildi!');
}

function deleteWHProduct(id) {
    if (!confirm('Bu mahsulotni ombordan o\'chirmoqchimisiz?')) return;
    const products = getWHProducts().filter(p => p.id !== id);
    saveWHProducts(products);
    renderWarehouse();
    showAdminToast('🗑 Mahsulot o\'chirildi');
}

function generatePlaceholderSVG(category, name) {
    const colors = {
        'Pride': '#9b00ff', 'Deaf Bonce': '#00c853', 'Pioneer': '#0077cc',
        'JBL': '#ff5722', 'Alpine': '#00bcd4', 'Kicker': '#ff6f00',
        'Rockford': '#c62828', 'JL Audio': '#2e7d32'
    };
    const color = colors[category] || '#7000ff';
    const letter = (category || 'S')[0].toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="#1a0040"/>
        <circle cx="100" cy="90" r="70" fill="none" stroke="${color}" stroke-width="6"/>
        <circle cx="100" cy="90" r="50" fill="${color}" opacity="0.2"/>
        <circle cx="100" cy="90" r="22" fill="${color}"/>
        <circle cx="100" cy="90" r="8" fill="white" opacity="0.5"/>
        <rect x="0" y="170" width="200" height="30" fill="${color}"/>
        <text x="100" y="190" text-anchor="middle" font-family="Arial Black" font-size="14" font-weight="900" fill="white">${category.substring(0,10)}</text>
    </svg>`;
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

// =============================================
// REPORTS
// =============================================
function loadReportsPage() {
    const orders = getOrders();
    const sold   = orders.filter(o => o.status === 'sold');

    const revenue    = sold.reduce((s, o) => s + (o.total || 0), 0);
    const totalItems = sold.reduce((s, o) => s + o.items.reduce((a, i) => a + i.qty, 0), 0);
    const avg        = sold.length > 0 ? Math.round(revenue / sold.length) : 0;

    const repRev   = document.getElementById('rep-revenue');
    const repOrd   = document.getElementById('rep-orders');
    const repItems = document.getElementById('rep-items');
    const repAvg   = document.getElementById('rep-avg');

    if (repRev)   repRev.textContent   = revenue.toLocaleString() + ' som';
    if (repOrd)   repOrd.textContent   = sold.length + ' ta';
    if (repItems) repItems.textContent = totalItems + ' ta';
    if (repAvg)   repAvg.textContent   = avg.toLocaleString() + ' som';

    renderHistory(sold);
}

function renderHistory(sold) {
    const tbody = document.getElementById('history-tbody');
    const empty = document.getElementById('history-empty');
    if (!tbody) return;

    const list = sold.slice().reverse();
    if (list.length === 0) {
        tbody.innerHTML = '';
        if (empty) empty.style.display = 'block';
        return;
    }
    if (empty) empty.style.display = 'none';

    tbody.innerHTML = list.map((order, idx) => {
        const itemNames = order.items.map(it =>
            `${it.name.split('—')[0].trim()} ×${it.qty}`
        ).join(', ');
        return `
        <tr>
            <td style="color:#a0a0b0;font-size:12px;">${idx + 1}</td>
            <td style="font-size:12px;color:#6b6b8a;">${order.date}</td>
            <td class="ht-name">${order.customer.name}</td>
            <td style="color:#7000ff;font-weight:600;">${order.customer.phone}</td>
            <td style="font-size:12px;">${order.customer.address}</td>
            <td style="font-size:12px;color:#6b6b8a;max-width:200px;">${itemNames}</td>
            <td class="ht-total">${(order.total || 0).toLocaleString()} som</td>
        </tr>`;
    }).join('');
}

function clearSoldHistory() {
    if (!confirm('Sotilgan tovarlar tarixini tozalash kerakmi? (Buyurtmalar o\'chirilmaydi)')) return;
    showAdminToast('ℹ️ Tarix faqat ko\'rinishdan tozalandi');
    loadReportsPage();
}

// =============================================
// TOAST
// =============================================
function showAdminToast(msg) {
    const t = document.getElementById('admin-toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._t);
    t._t = setTimeout(() => t.classList.remove('show'), 2800);
}
