// =============================================
// SAMBUFER — Admin Panel JS (Enhanced Reports)
// =============================================

// ============ AUTH CHECK ============
(function () {
    const auth = localStorage.getItem('sambufer_admin_auth');
    if (auth === '1') {
        const ag = document.getElementById('auth-guard');
        const aa = document.getElementById('admin-app');
        if (ag) ag.style.display = 'none';
        if (aa) aa.style.display = 'flex';
        initAdmin();
    } else {
        const ag = document.getElementById('auth-guard');
        const aa = document.getElementById('admin-app');
        if (ag) ag.style.display = 'flex';
        if (aa) aa.style.display = 'none';
    }
})();

// ============ INIT ============
function initAdmin() {
    updateClock();
    setInterval(updateClock, 1000);
    // Real-time yangilanish (optional, local storage uchun)
    setInterval(() => {
        if (currentPage === 'orders') renderStats();
    }, 5000);
    
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
    const sb = document.getElementById('sidebar');
    if (sb) sb.classList.toggle('open');
}

// ============ PAGE SWITCH ============
let currentPage = 'orders';

function switchPage(page) {
    document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const pg = document.getElementById('page-' + page);
    const nv = document.getElementById('nav-' + page);
    if (pg) pg.classList.add('active');
    if (nv) nv.classList.add('active');
    currentPage = page;

    const titles = {
        orders:    ['📦 Buyurtmalar',   'Yangi buyurtmalarni boshqaring'],
        warehouse: ['🏪 Ombor',          'Mahsulotlarni boshqaring'],
        reports:   ['📊 Hisobot',        'Savdo statistikasi va daromadlar']
    };
    
    const pt = document.getElementById('page-title');
    const ps = document.getElementById('page-subtitle');
    if (pt) pt.textContent = titles[page][0];
    if (ps) ps.textContent = titles[page][1];

    if (page === 'orders')    loadOrdersPage();
    if (page === 'warehouse') loadWarehousePage();
    if (page === 'reports')   loadReportsPage();

    if (window.innerWidth < 900) {
        const sb = document.getElementById('sidebar');
        if (sb) sb.classList.remove('open');
    }
}

// =============================================
// ORDERS LOGIC
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
    const pending = orders.filter(o => o.status === 'pending');
    const sold    = orders.filter(o => o.status === 'sold');
    const returned = orders.filter(o => o.status === 'returned');
    
    // 1. TUSHGAN TUSHUM - Faqat sotilganlardan tushgan pul
    const earned = sold.reduce((s, o) => s + (o.total || 0), 0);
    
    // 2. KUTILAYOTGAN TUSHUM - Kutilayotgan buyurtmalar puli
    const expected = pending.reduce((s, o) => s + (o.total || 0), 0);

    const ep = document.getElementById('stat-pending');
    const es = document.getElementById('stat-sold');
    const er = document.getElementById('stat-revenue');
    const ex = document.getElementById('stat-expected');
    
    if (ep) ep.textContent = pending.length;
    if (es) es.textContent = sold.length;
    
    // Earned Revenue Animation
    if (er) {
        animateValue(er, earned, ' som');
    }
    // Expected Revenue update
    if (ex) {
        animateValue(ex, expected, ' som');
    }
}

function animateValue(el, newVal, suffix = '') {
    const oldVal = parseInt(el.textContent.replace(/\D/g, '')) || 0;
    if (oldVal !== newVal) {
        el.style.transform = 'scale(1.1)';
        setTimeout(() => {
            el.textContent = newVal.toLocaleString() + suffix;
            setTimeout(() => {
                el.style.transform = 'scale(1)';
            }, 200);
        }, 100);
    } else {
        el.textContent = newVal.toLocaleString() + suffix;
    }
}

function renderOrders() {
    const container = document.getElementById('orders-container');
    if (!container) return;

    let orders = getOrders();
    if (orderFilter === 'pending') orders = orders.filter(o => o.status === 'pending');
    if (orderFilter === 'sold')    orders = orders.filter(o => o.status === 'sold');
    if (orderFilter === 'returned') orders = orders.filter(o => o.status === 'returned');

    orders = orders.slice().reverse();

    if (orders.length === 0) {
        container.innerHTML = `
        <div class="empty-state">
            <div class="es-icon">📭</div>
            <h3>Sizda hali buyurtmalar yo'q</h3>
            <p>Yangi buyurtmalar kelishi bilan shu yerda paydo bo'ladi</p>
        </div>`;
        return;
    }

    container.innerHTML = orders.map(order => {
        const isSold = order.status === 'sold';
        const itemPills = (order.items || []).map(it =>
            `<span class="order-item-pill">${it.name.split('—')[0].trim()} × ${it.qty}</span>`
        ).join('');

        return `
        <div class="order-card ${isSold ? 'sold' : ''}" id="ocard-${order.id}" style="animation: fadeIn 0.3s ease forwards;">
            <div class="order-card-header">
                <div>
                    <p class="order-id">🆔 #${order.id}</p>
                    <p class="order-customer">👤 ${order.customer.name}</p>
                    <p class="order-phone">📞 ${order.customer.phone}</p>
                    <p class="order-address" title="${order.customer.address}">📍 ${order.customer.address.substring(0, 45)}${order.customer.address.length > 45 ? '...' : ''}</p>
                </div>
                <div style="text-align:right;">
                    <span class="order-status-badge ${order.status === 'sold' ? 'badge-sold' : (order.status === 'returned' ? 'badge-returned' : 'badge-pending')}">
                        ${order.status === 'sold' ? '✅ Pul tushdi' : (order.status === 'returned' ? '🔄 Qaytarildi' : '⏳ To\'lov kutilmoqda')}
                    </span>
                    <p class="order-date" style="margin-top:8px;">🕐 ${order.date}</p>
                </div>
            </div>
            <div class="order-items-row">${itemPills}</div>
            <div style="margin-bottom:12px; display:flex; gap:8px;">
                <span style="font-size:11px; background:#f0f7ff; color:#0e70e3; padding:4px 10px; border-radius:4px; font-weight:700;">💳 ${
                    order.customer.paymentMethod === 'card' ? 'Karta arqalı' : 
                    order.customer.paymentMethod === 'uzum' ? 'Uzum Karta' : 'Punktte tólew'
                }</span>
                <span style="font-size:11px; background:#fff2f0; color:#ff4d4f; padding:4px 10px; border-radius:4px; font-weight:700;">🏠 ${
                    order.customer.deliveryType === 'pickup' ? 'Topshirish punktida' : 'Uyga yetkazish'
                }</span>
            </div>
            <div class="order-footer">
                <span class="order-total" style="${isSold ? 'color:#00b857;' : 'color:#7000ff;'}">${(order.total || 0).toLocaleString()} som</span>
                <div class="order-actions">
                    <button class="btn-detail" onclick="openOrderDetail(${order.id})">👁 Ko'rish</button>
                    ${order.status === 'pending' ? `<button class="btn-sold" onclick="markAsSold(${order.id}, ${order.total})">💸 Sotildi</button>` : ''}
                    ${order.status === 'sold' ? `<button class="btn-return" onclick="markAsReturned(${order.id})">🔄 Qaytarish</button>` : ''}
                    <button class="btn-delete" onclick="deleteOrder(${order.id})">🗑</button>
                </div>
            </div>
        </div>`;
    }).join('');
}

function markAsSold(orderId, amount) {
    const orders = getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) return;
    
    // Statusni o'zgartirish
    orders[idx].status = 'sold';
    orders[idx].soldAt = new Date().toLocaleString('uz-UZ');
    saveOrders(orders);
    
    // Bildirishnoma va animatsiya
    showAdminToast(`💰 +${amount.toLocaleString()} som daromad tushdi!`);
    loadOrdersPage();
    updateOrdersBadge();
}

function markAsReturned(orderId) {
    if (!confirm('Ushbu buyurtmani "Qaytarildi" deb belgilamoqchimisiz?')) return;
    const orders = getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) return;
    
    orders[idx].status = 'returned';
    orders[idx].returnedAt = new Date().toLocaleString('uz-UZ');
    saveOrders(orders);
    
    showAdminToast('🔄 Buyurtma qaytarildi');
    loadOrdersPage();
    updateOrdersBadge();
}

function deleteOrder(orderId) {
    if (!confirm('Ushbu buyurtmani o\'chirmoqchimisiz?')) return;
    const orders = getOrders().filter(o => o.id !== orderId);
    saveOrders(orders);
    showAdminToast('🗑 Buyurtma o\'chirildi');
    loadOrdersPage();
    updateOrdersBadge();
}

// ---------- ORDER DETAIL ----------
function openOrderDetail(orderId) {
    const order = getOrders().find(o => o.id === orderId);
    if (!order) return;

    const body = document.getElementById('order-detail-body');
    const acts = document.getElementById('order-detail-actions');
    if (!body || !acts) return;

    body.innerHTML = `
        <div class="detail-row"><span class="detail-label">Mijoz:</span><span class="detail-val">${order.customer.name}</span></div>
        <div class="detail-row"><span class="detail-label">Tel:</span><span class="detail-val" style="font-weight:700;color:#7000ff;">${order.customer.phone}</span></div>
        <div class="detail-row"><span class="detail-label">Tólem:</span><span class="detail-val" style="color:#0e70e3;font-weight:700;">${
            order.customer.paymentMethod === 'card' ? 'Karta arqalı' : 
            order.customer.paymentMethod === 'uzum' ? 'Uzum Karta' : 'Topshirish punktinde tólew'
        }</span></div>
        <div class="detail-row"><span class="detail-label">Manzil:</span><span class="detail-val">${order.customer.address}</span></div>
        ${order.customer.note ? `<div class="detail-row"><span class="detail-label">Izoh:</span><span class="detail-val">"${order.customer.note}"</span></div>` : ''}
        <p style="margin-top:16px;font-size:12px;font-weight:700;color:#6b6b8a;text-transform:uppercase;">Mahsulotlar:</p>
        <div>
            ${order.items.map(it => `
                <div class="detail-item" style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #eee;">
                    <span>${it.name} <b>x${it.qty}</b></span>
                    <span style="font-weight:700;">${(it.price * it.qty).toLocaleString()} som</span>
                </div>
            `).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;padding:16px 0;font-size:18px;font-weight:900;color:#7000ff;">
            <span>JAMI:</span><span>${(order.total || 0).toLocaleString()} som</span>
        </div>
    `;

    const isSold = order.status === 'sold';
    acts.innerHTML = `
        ${!isSold ? `<button class="btn-sold" style="flex:1;" onclick="markAsSold(${order.id});closeOrderDetail();">✅ Sotildi deb belgilash</button>` : ''}
        <button class="btn-detail" onclick="closeOrderDetail()">Yopish</button>
    `;

    document.getElementById('order-detail-modal').style.display = 'flex';
}

function closeOrderDetail() {
    const mod = document.getElementById('order-detail-modal');
    if (mod) mod.style.display = 'none';
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
        grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><h3>Ombor bo'sh</h3><p>Yangi mahsulot qo'shing</p></div>`;
        return;
    }

    grid.innerHTML = products.slice().reverse().map(p => `
        <div class="wh-card">
            <img class="wh-img" src="${p.image}" alt="${p.name}">
            <div class="wh-info">
                <span class="wh-brand">${p.category}</span>
                <p class="wh-name">${p.name}</p>
                <div class="wh-footer">
                    <p class="wh-price">${Number(p.price).toLocaleString()} som</p>
                    <button class="wh-del-btn" onclick="deleteWHProduct(${p.id})">🗑</button>
                </div>
            </div>
        </div>`).join('');
}

function openAddProduct() {
    const mod = document.getElementById('add-product-modal');
    if (mod) mod.style.display = 'flex';
}
function closeAddProduct() {
    const mod = document.getElementById('add-product-modal');
    if (mod) mod.style.display = 'none';
}

function handleAddProduct(e) {
    e.preventDefault();
    const name     = document.getElementById('ap-name').value;
    const category = document.getElementById('ap-category').value;
    const price    = document.getElementById('ap-price').value;
    const oldPrice = document.getElementById('ap-old-price').value;
    const desc     = document.getElementById('ap-desc').value;

    const list = getWHProducts();
    list.push({
        id: Date.now(),
        name, category, price, oldPrice, desc,
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f0e6ff"/><text x="50" y="55" text-anchor="middle" font-size="20">📦</text></svg>'
    });
    saveWHProducts(list);
    closeAddProduct();
    renderWarehouse();
    showAdminToast('✅ Mahsulot qo\'shildi!');
}

function deleteWHProduct(id) {
    if (!confirm('O\'chirilsinmi?')) return;
    const list = getWHProducts().filter(p => p.id !== id);
    saveWHProducts(list);
    renderWarehouse();
}

// =============================================
// REPORTS (HISOBOT) - ACTIVATED
// =============================================
function loadReportsPage() {
    const orders = getOrders();
    const pending = orders.filter(o => o.status === 'pending');
    const sold    = orders.filter(o => o.status === 'sold');

    // 1. Jami Daromad (Revenue) - Sotilganlardan
    const revenue = sold.reduce((s, o) => s + (o.total || 0), 0);
    
    // 2. Kutilayotgan Daromad - Pendinglardan
    const expected = pending.reduce((s, o) => s + (o.total || 0), 0);
    
    // 3. Mahsulotlar soni - Sotilgan tovarlarning jami donasi
    const totalItems = sold.reduce((s, o) => s + (o.items || []).reduce((a, i) => a + (i.qty || 1), 0), 0);
    
    // 4. O'rtacha chek
    const avg = sold.length > 0 ? Math.round(revenue / sold.length) : 0;

    // DOM-ni yangilash
    const ids = {
        'rep-revenue': revenue.toLocaleString() + ' som',
        'rep-orders':  sold.length + ' ta',
        'rep-items':   totalItems + ' ta',
        'rep-avg':     avg.toLocaleString() + ' som',
        'rep-expected': expected.toLocaleString() + ' som'
    };

    for (const [id, val] of Object.entries(ids)) {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    }

    // Tarixni chiqarish
    renderHistory(sold);
    
    // Eng ko'p sotilgan mahsulotlarni hisoblash
    renderTopProducts(sold);
}

function renderHistory(sold) {
    const tbody = document.getElementById('history-tbody');
    const empty = document.getElementById('history-empty');
    if (!tbody) return;

    if (sold.length === 0) {
        tbody.innerHTML = '';
        if (empty) empty.style.display = 'block';
        return;
    }
    if (empty) empty.style.display = 'none';

    tbody.innerHTML = sold.slice().reverse().map((o, i) => `
        <tr>
            <td>${sold.length - i}</td>
            <td><span style="font-size:11px;color:#888;">${o.date}</span></td>
            <td style="font-weight:700;">${o.customer.name}</td>
            <td>${o.customer.phone}</td>
            <td><span style="font-size:11px;">${o.customer.address.substring(0,30)}...</span></td>
            <td><span style="background:#f0f0ff;padding:2px 6px;border-radius:4px;font-size:11px;">${o.items.length} ta</span></td>
            <td style="font-weight:900;color:#00b857;">${(o.total || 0).toLocaleString()} som</td>
        </tr>
    `).join('');
}

function renderTopProducts(sold) {
    const grid = document.getElementById('top-brands-grid');
    if (!grid) return;
    
    // 1. Calculate stats per brand
    const stats = {};
    sold.forEach(order => {
        (order.items || []).forEach(item => {
            const cat = item.category || 'Boshqa';
            if (!stats[cat]) stats[cat] = { count: 0, revenue: 0 };
            stats[cat].count += (item.qty || 1);
            stats[cat].revenue += (item.price * (item.qty || 1));
        });
    });

    // 2. Sort by revenue descending
    const sorted = Object.entries(stats).sort((a,b) => b[1].revenue - a[1].revenue).slice(0, 8);

    if (sorted.length === 0) {
        grid.innerHTML = '<p style="color:#a0a0b0;grid-column:1/-1;text-align:center;">Ma\'lumotlar mavjud emas</p>';
        return;
    }

    // 3. Render
    grid.innerHTML = sorted.map(([name, data]) => `
        <div style="background:#fff; border:1px solid #eee; border-radius:12px; padding:16px; display:flex; flex-direction:column; gap:8px; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight:800; font-size:14px; color:#1f2026;">${name}</span>
                <span style="background:#f0e6ff; color:#7000ff; font-size:10px; font-weight:700; padding:2px 8px; border-radius:20px;">${data.count} ta</span>
            </div>
            <div style="height:4px; background:#f2f4f7; border-radius:4px; overflow:hidden;">
                <div style="height:100%; background:#7000ff; width:${Math.min((data.revenue / 10000000) * 100, 100)}%;"></div>
            </div>
            <p style="font-size:13px; font-weight:700; color:#00b857;">${data.revenue.toLocaleString()} som</p>
        </div>
    `).join('');
}

function clearSoldHistory() {
    if (!confirm('Sotilganlar tarixini butunlay oziq-ovqat... yo\'g-e, tozalab tashlaymizmi? (Buyurtmalar o\'chiriladi) ')) return;
    const orders = getOrders().filter(o => o.status !== 'sold');
    saveOrders(orders);
    loadReportsPage();
    showAdminToast('🧹 Tarix tozalandi');
}

// ---------- TOAST ----------
function showAdminToast(msg) {
    const t = document.getElementById('admin-toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._t);
    t._t = setTimeout(() => t.classList.remove('show'), 3000);
}
