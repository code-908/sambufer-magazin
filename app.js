// =============================================
// SAMBUFER MARKET — app.js (Complete & Fixed)
// 72 car subwoofers, unique SVG per product
// =============================================

const brandColors = {
    'Pride':         ['#11002a', '#9b00ff', '#e0b0ff'],
    'Deaf Bonce':    ['#051a05', '#00e676', '#a9ffd1'],
    'Pioneer':       ['#000d1a', '#ff1744', '#ffb2c1'],
    'JBL':           ['#1b0a00', '#ff9100', '#ffe0b2'],
    'Kenwood':       ['#01051a', '#2979ff', '#bbdefb'],
    'Alpine':        ['#001a1a', '#00e5ff', '#b2ebf2'],
    'Hertz':         ['#1a0d00', '#ffc400', '#fff8e1'],
    'Kicker':        ['#141414', '#ffd600', '#ffff8d'],
    'Edge':          ['#12002a', '#d500f9', '#f5d3fe'],
    'Sony':          ['#00051a', '#2962ff', '#d0e1ff'],
    'Ural':          ['#1a0200', '#ff3d00', '#ffccbc'],
    'Dynamic State': ['#001a14', '#1de9b6', '#ccff90'],
    'Avatar':        ['#0d001a', '#e040fb', '#f4b8ff'],
    'SWAT':          ['#1a0000', '#f44336', '#ffcdd2'],
    'MTX':           ['#001a0d', '#009688', '#b2dfdb'],
    'Gladen':        ['#1a1000', '#ffeb3b', '#fff9c4'],
    'Soundstream':   ['#05051a', '#3f51b5', '#c5cae0'],
    'Rockford':      ['#1a0000', '#d32f2f', '#ffcdd2'],
    'JL Audio':      ['#001a05', '#43a047', '#c8e6c9'],
    'Skar':          ['#0a0a0a', '#9e9e9e', '#f5f5f5'],
    'Crescendo':     ['#1a000d', '#e91e63', '#f8bbd0'],
    'DD Audio':      ['#000a1a', '#2196f3', '#bbdefb'],
    'Momo':          ['#101000', '#cddc39', '#f0f4c3'],
    'CT Sounds':     ['#0d001a', '#9c27b0', '#e1bee7'],
};
const fallbackColors = ['#0a0a0a', '#7000ff', '#ffffff'];

function makeSvg(name, category, id) {
    const col = brandColors[category] || fallbackColors;
    const bg = col[0], accent = col[1], ring = col[2];
    const style = (id % 4);
    const sizeM = name.match(/(\d+)"/);
    const size = sizeM ? sizeM[1] + '"' : '12"';

    let design = '';
    if (style === 0) {
        design = `<circle cx="150" cy="142" r="110" fill="none" stroke="${accent}" stroke-width="15" opacity="0.4"/>
                  <circle cx="150" cy="142" r="40" fill="#111" stroke="${accent}" stroke-width="4"/>`;
    } else if (style === 1) {
        design = `<circle cx="150" cy="142" r="120" fill="none" stroke="${ring}" stroke-width="2" stroke-dasharray="10,5" opacity="0.5"/>
                  <circle cx="150" cy="142" r="30" fill="${accent}"/>`;
    } else if (style === 2) {
        design = `<rect x="50" y="50" width="200" height="184" rx="20" fill="none" stroke="${accent}" stroke-width="5"/>
                  <circle cx="150" cy="142" r="60" fill="${accent}" opacity="0.3"/>
                  <circle cx="150" cy="142" r="20" fill="#111"/>`;
    } else {
        design = `<circle cx="150" cy="142" r="100" fill="none" stroke="${accent}" stroke-width="2"/>
                  <path d="M150 42 L150 242 M50 142 L250 142" stroke="${ring}" stroke-width="1" opacity="0.3"/>
                  <circle cx="150" cy="142" r="25" fill="${accent}"/>`;
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
        <rect width="300" height="300" fill="${bg}"/>
        <circle cx="150" cy="142" r="130" fill="#0c0c0c" stroke="#333" stroke-width="1"/>
        ${design}
        <text x="150" y="291" font-family="sans-serif" font-size="16" font-weight="900" fill="white" text-anchor="middle">${category.toUpperCase()} ${size}</text>
    </svg>`;

    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

const defaultProducts = [];
const brands = Object.keys(brandColors);
for(let i=1; i<=72; i++) {
    const brand = brands[i % brands.length];
    defaultProducts.push({
        id: i,
        name: `${brand} Bass Pro ${i}" — Professional`,
        category: brand,
        price: 850000 + (Math.floor(Math.random() * 50) * 100000),
        oldPrice: 1200000 + (Math.floor(Math.random() * 60) * 100000),
        rating: 4.5 + (Math.random() * 0.5),
        reviewsCount: 5 + Math.floor(Math.random() * 200),
        monthlyPrice: 75000 + Math.floor(Math.random() * 400000)
    });
}

let products = [];
let cart = JSON.parse(localStorage.getItem('sambufer_cart') || '[]');
let currentUser = JSON.parse(localStorage.getItem('sambufer_user') || 'null');
let pendingOrder = false;
let kBtn, kDrop;

function loadLocalProducts() {
    const adminProducts = JSON.parse(localStorage.getItem('sambufer_wh_products') || '[]');
    products = [...adminProducts, ...defaultProducts];
    products.forEach(p => { 
        // Force regenerate if it's a generated SVG or missing
        if (!p.image || p.image.startsWith('data:image/svg+xml')) {
            p.image = makeSvg(p.name, p.category, p.id); 
        }
    });
}
loadLocalProducts();

function renderProducts(list) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    
    // Fallback image in case SVG fails
    const fallback = 'https://images.unsplash.com/photo-1545167622-3a6ac756aff4?w=300&h=300&auto=format&fit=crop';

    grid.innerHTML = list.map(p => `
        <div class="product-card" style="animation: fadeIn 0.4s ease forwards;">
            <div class="img-container">
                <img src="${p.image}" class="product-img" 
                     onerror="this.src='${fallback}';this.onerror=null;"
                     onload="this.style.opacity=1;" style="opacity:0; transition: opacity 0.3s ease;">
            </div>
            <div class="product-info">
                <span class="brand-tag">${p.category}</span>
                <h3 class="product-title">${p.name}</h3>
                <div class="installment-badge">${p.monthlyPrice.toLocaleString()} som/ayǵa</div>
                <div class="price-container">
                    <span class="old-price">${p.oldPrice.toLocaleString()} som</span>
                    <div class="current-price-row">
                        <span class="current-price">${p.price.toLocaleString()} som</span>
                        <button class="add-btn-circle" onclick="addToCart(${p.id}); event.stopPropagation();">+</button>
                    </div>
                </div>
                <button class="buy-now-btn" onclick="buyNow(${p.id}); event.stopPropagation();">📦 Buyırtma beriw</button>
            </div>
        </div>`).join('');
}

function addToCart(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    const ex = cart.find(x => x.id === id);
    if (ex) ex.qty += 1; else cart.push({ ...p, qty: 1 });
    updateCartCount();
    showToast('✅ Sebetke qosıldı!');
}

function updateCartCount() {
    const total = cart.reduce((s, x) => s + x.qty, 0);
    const c1 = document.getElementById('cart-count');
    const c2 = document.getElementById('cart-total-items');
    if (c1) c1.textContent = total;
    if (c2) c2.textContent = total;
}

function renderCart() {
    const ci = document.getElementById('cart-items');
    const tp = document.getElementById('total-price');
    if (!ci || !tp) return;
    if (cart.length === 0) {
        ci.innerHTML = '<p style="text-align:center;padding:40px;color:#8b8e99;">Sebet bos</p>';
        tp.textContent = "0 som"; return;
    }
    ci.innerHTML = cart.map((item, i) => `
        <div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid #eee;align-items:center;">
            <img src="${item.image}" style="width:50px;height:50px;object-fit:contain;">
            <div style="flex:1;">
                <p style="font-size:12px;font-weight:600;">${item.name}</p>
                <p style="color:#7000ff;font-weight:700;">${item.price.toLocaleString()} som</p>
                <div style="display:flex;align-items:center;gap:10px;margin-top:5px;">
                    <button onclick="changeQty(${i},-1)" style="width:22px;height:22px;">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${i},1)" style="width:22px;height:22px;">+</button>
                </div>
            </div>
        </div>`).join('');
    tp.textContent = cart.reduce((s, x) => s + x.price * x.qty, 0).toLocaleString() + " som";
}

function changeQty(i, d) { cart[i].qty += d; if (cart[i].qty <= 0) cart.splice(i, 1); updateCartCount(); renderCart(); }
function buyNow(id) { const p = products.find(x=>x.id===id); if(p) { cart = [{...p, qty:1}]; updateCartCount(); openOrderModal(); } }

function openOrderModal() {
    if (cart.length === 0) return;
    if (!currentUser) { pendingOrder = true; openAuthModal(); return; }
    document.getElementById('order-modal').classList.add('active');
    document.getElementById('order-overlay').classList.add('active');
    renderOrderSummary();
    toggleCardArea(true);
}
function closeOrderModal() { document.getElementById('order-modal').classList.remove('active'); document.getElementById('order-overlay').classList.remove('active'); }

function renderOrderSummary() {
    const el = document.getElementById('order-summary');
    const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
    el.innerHTML = cart.map(x => `<div style="display:flex;justify-content:space-between;padding:5px 0;font-size:12px;"><span>${x.name} × ${x.qty}</span><b>${(x.price*x.qty).toLocaleString()} som</b></div>`).join('') + `<hr><p style="text-align:right;font-weight:800;color:#7000ff;">JAMI: ${total.toLocaleString()} som</p>`;
}

function toggleCardArea(show) {
    const area = document.getElementById('card-selection-area');
    if (!area) return;
    area.style.display = show ? 'block' : 'none';
    if (show) {
        const allCards = JSON.parse(localStorage.getItem('sambufer_cards') || '{}');
        const ph = currentUser.phone;
        if (!allCards[ph] || allCards[ph].length === 0) {
            allCards[ph] = [
                { id: 101, num: '8600000000001234', exp: '12/28', type: 'Uzcard' },
                { id: 102, num: '9860000000005678', exp: '10/27', type: 'Humo' },
                { id: 103, num: '4444000000009999', exp: '05/30', type: 'Visa' }
            ];
            localStorage.setItem('sambufer_cards', JSON.stringify(allCards));
        }
        renderOrderCards();
    }
}

function renderOrderCards() {
    const list = document.getElementById('order-cards-list');
    const allCards = JSON.parse(localStorage.getItem('sambufer_cards') || '{}');
    const myCards = allCards[currentUser.phone] || [];
    list.innerHTML = myCards.map((c, i) => `
        <label style="display:flex; align-items:center; gap:10px; padding:10px; border:1px solid #eee; border-radius:10px; margin-bottom:8px; cursor:pointer;">
            <input type="radio" name="selected-card" value="${c.id}" ${i === 0 ? 'checked' : ''}>
            <div style="font-size:13px; font-weight:700;"><span style="color:#7000ff;">${c.type.toUpperCase()}</span> •••• ${c.num.slice(-4)}</div>
        </label>`).join('');
}

function updateCardSkin(type) {
    const box = document.getElementById('card-preview-box');
    const logo = document.getElementById('card-logo-preview');
    if (!box || !logo) return;
    logo.textContent = type.toUpperCase();
    if (type === 'Humo') {
        box.style.background = 'linear-gradient(135deg, #ff8c00, #ffa500)';
    } else if (type === 'Visa') {
        box.style.background = 'linear-gradient(135deg, #1a1f71, #0057a0)';
    } else if (type === 'Mastercard') {
        box.style.background = 'linear-gradient(135deg, #eb001b, #f79e1b)';
    } else if (type === 'Uzum') {
        box.style.background = 'linear-gradient(135deg, #7000ff, #2b0051)';
    } else {
        // Uzcard Default
        box.style.background = 'linear-gradient(135deg, #0057a0, #0076c0)';
    }
}

function handleAddCard(e) {
    e.preventDefault();
    const num = document.getElementById('card-num').value.replace(/\s/g, '');
    const exp = document.getElementById('card-exp').value;
    const type = document.querySelector('input[name="card-type"]:checked').value;
    const cards = JSON.parse(localStorage.getItem('sambufer_cards') || '{}');
    if (!cards[currentUser.phone]) cards[currentUser.phone] = [];
    cards[currentUser.phone].push({ id: Date.now(), num, exp, type });
    localStorage.setItem('sambufer_cards', JSON.stringify(cards));
    document.getElementById('card-modal').classList.remove('active');
    document.getElementById('card-overlay').classList.remove('active');
    renderOrderCards();
    showToast('💳 Karta qosıldı!');
}

function handleAuth(e) {
    e.preventDefault();
    currentUser = { name: document.getElementById('user-name').value, phone: document.getElementById('user-phone').value };
    localStorage.setItem('sambufer_user', JSON.stringify(currentUser));
    updateAuthUI();
    document.getElementById('auth-modal').classList.remove('active');
    document.getElementById('auth-overlay').classList.remove('active');
    if (pendingOrder) { pendingOrder = false; openOrderModal(); }
}

function updateAuthUI() { if(currentUser) { const l = document.getElementById('auth-label'); if(l) l.textContent = currentUser.name.split(' ')[0]; } }
function showToast(msg) { const t = document.createElement('div'); t.textContent = msg; Object.assign(t.style, {position:'fixed',bottom:'30px',left:'50%',transform:'translateX(-50%)',background:'#1f2026',color:'#fff',padding:'10px 20px',borderRadius:'20px',zIndex:9999}); document.body.appendChild(t); setTimeout(()=>t.remove(), 2500); }

window.onload = () => {
    // Katalog elements
    kBtn = document.getElementById('katalog-btn');
    kDrop = document.getElementById('katalog-dropdown');
    
    if (kBtn && kDrop) {
        kBtn.onclick = (e) => {
            e.stopPropagation();
            kBtn.classList.toggle('active');
            kDrop.classList.toggle('active');
        };
    }

    // Close catalog if clicking outside
    window.addEventListener('click', () => {
        if (kBtn && kDrop) {
            kBtn.classList.remove('active');
            kDrop.classList.remove('active');
        }
    });

    renderProducts(products);
    updateAuthUI();
    const icon = document.getElementById('cart-icon');
    if (icon) icon.onclick = () => { document.getElementById('cart-drawer').classList.add('active'); document.getElementById('cart-overlay').classList.add('active'); renderCart(); };
    const close = document.getElementById('close-cart');
    if (close) close.onclick = () => { document.getElementById('cart-drawer').classList.remove('active'); document.getElementById('cart-overlay').classList.remove('active'); };
};

function executeSearch(q) { const f = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase())); renderProducts(f); }
function filterByCategory(c, btn) { renderProducts(c === 'all' ? products : products.filter(p=>p.category===c)); }
function openDelivery() { document.getElementById('delivery-modal').classList.add('active'); document.getElementById('delivery-overlay').classList.add('active'); }
function closeDelivery() { document.getElementById('delivery-modal').classList.remove('active'); document.getElementById('delivery-overlay').classList.remove('active'); }
function openAuthModal() { document.getElementById('auth-modal').classList.add('active'); document.getElementById('auth-overlay').classList.add('active'); }
function closeAuthModal() { document.getElementById('auth-modal').classList.remove('active'); document.getElementById('auth-overlay').classList.remove('active'); }
function openCardModal() { document.getElementById('card-modal').classList.add('active'); document.getElementById('card-overlay').classList.add('active'); }
function closeCardModal() { document.getElementById('card-modal').classList.remove('active'); document.getElementById('card-overlay').classList.remove('active'); }
function openAdminLogin() { document.getElementById('admin-login-modal').classList.add('active'); document.getElementById('admin-login-overlay').classList.add('active'); }
function closeAdminLogin() { document.getElementById('admin-login-modal').classList.remove('active'); document.getElementById('admin-login-overlay').classList.remove('active'); }
function openProfileModal() {
    if (!currentUser) { openAuthModal(); return; }
    renderProfileContent();
    document.getElementById('profile-modal').classList.add('active');
    document.getElementById('profile-overlay').classList.add('active');
}
function closeProfileModal() {
    document.getElementById('profile-modal').classList.remove('active');
    document.getElementById('profile-overlay').classList.remove('active');
}

function renderProfileContent() {
    const cont = document.getElementById('profile-content');
    if (!cont) return;

    const allOrders = JSON.parse(localStorage.getItem('sambufer_orders') || '[]');
    const myOrders = allOrders.filter(o => o.customer && o.customer.phone === currentUser.phone);
    const orderTotal = myOrders.reduce((s, o) => s + (o.total || 0), 0);
    
    const allCards = JSON.parse(localStorage.getItem('sambufer_cards') || '{}');
    const myCards = allCards[currentUser.phone] || [];

    cont.innerHTML = `
        <div style="text-align:center; margin-bottom:20px;">
            <div style="width:64px; height:64px; background:#f0e6ff; color:#7000ff; font-size:28px; font-weight:800; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 12px;">
                ${currentUser.name.charAt(0).toUpperCase()}
            </div>
            <h4 style="font-size:18px; font-weight:800;">${currentUser.name}</h4>
            <div style="display:flex; justify-content:center; gap:12px; margin-top:8px;">
                <div style="background:#f2f4f7; padding:4px 10px; border-radius:8px;">
                    <p style="font-size:9px; color:#6b6b8a; font-weight:700;">BUYIRTPALAR</p>
                    <p style="font-size:12px; font-weight:800;">${myOrders.length} ta</p>
                </div>
                <div style="background:#f2f4f7; padding:4px 10px; border-radius:8px;">
                    <p style="font-size:9px; color:#6b6b8a; font-weight:700;">SUMMA</p>
                    <p style="font-size:12px; font-weight:800; color:#00b857;">${orderTotal.toLocaleString()} som</p>
                </div>
            </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1.5px solid #f2f4f7; padding-bottom:8px;">
            <h5 style="font-size:14px; font-weight:800;">Meniń kartalarım</h5>
            <button onclick="openCardModal()" style="font-size:11px; font-weight:700; color:#7000ff; background:none; border:none; cursor:pointer;">+ Qosıw</button>
        </div>

        <div style="display:flex; gap:10px; overflow-x:auto; padding-bottom:10px; margin-bottom:16px;">
            ${myCards.length === 0 ? `<p style="font-size:12px; color:#a0a0b0; padding:10px;">Ele kartalar qosılmaǵan</p>` : 
              myCards.map(c => `
                <div style="min-width:180px; background:linear-gradient(135deg,#1f2026,#333); padding:12px; border-radius:12px; color:#fff; box-shadow:0 4px 12px rgba(0,0,0,0.15);">
                    <p style="font-size:11px; font-weight:800; margin-bottom:8px;">**** **** **** ${c.num.slice(-4)}</p>
                    <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                        <span style="font-size:9px; opacity:0.7;">${c.exp}</span>
                        <span style="font-size:8px; font-weight:900;">${(c.type || 'UZCARD').toUpperCase()}</span>
                    </div>
                </div>
              `).join('')
            }
        </div>
        
        <h5 style="font-size:14px; font-weight:800; border-bottom:1.5px solid #f2f4f7; padding-bottom:8px; margin-bottom:12px;">Meniń buyırtmalarım</h5>
        <div style="display:flex; flex-direction:column; gap:10px;">
            ${myOrders.length === 0 ? `<p style="font-size:12px; color:#a0a0b0; text-align:center; padding:20px;">Sizde ele buyırtmalar joq</p>` : 
              myOrders.reverse().map(o => `
                <div style="background:#fff; border:1px solid #eee; border-radius:10px; padding:10px; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <p style="font-size:12px; font-weight:800;">#${o.id.toString().slice(-6)}</p>
                        <p style="font-size:10px; color:#6b6b8a;">${o.date}</p>
                    </div>
                    <div style="text-align:right;">
                        <p style="font-size:13px; font-weight:800; color:#1f2026;">${o.total.toLocaleString()} som</p>
                        <span style="font-size:9px; font-weight:700; color:#f59e0b;">Kutilmekte</span>
                    </div>
                </div>
              `).join('')
            }
        </div>
    `;
}

function userLogout() {
    currentUser = null;
    localStorage.removeItem('sambufer_user');
    updateAuthUI();
    closeProfileModal();
    showToast('👋 Xosh qalıń!');
}

function submitOrder(e) {
    e.preventDefault();
    const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
    const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleString('uz-UZ'),
        customer: { name: document.getElementById('order-name').value, phone: document.getElementById('order-phone').value },
        items: [...cart],
        total: total,
        status: 'pending'
    };
    const allOrders = JSON.parse(localStorage.getItem('sambufer_orders') || '[]');
    allOrders.push(newOrder);
    localStorage.setItem('sambufer_orders', JSON.stringify(allOrders));

    cart = []; updateCartCount();
    closeOrderModal();
    document.getElementById('success-modal').classList.add('active');
    document.getElementById('order-overlay').classList.add('active');
}

// Ensure the form uses submitOrder
const orderForm = document.getElementById('order-form');
if (orderForm) orderForm.onsubmit = submitOrder;

function updateAuthUI() {
    const label = document.getElementById('auth-label');
    const container = document.getElementById('auth-btn');
    if (!label || !container) return;
    if (currentUser) {
        label.textContent = currentUser.name.split(' ')[0];
        container.onclick = openProfileModal;
    } else {
        label.textContent = 'Kiriw';
        container.onclick = openAuthModal;
    }
}
function handleAdminLogin(e) { 
    e.preventDefault(); 
    const u = document.getElementById('admin-username').value;
    const p = document.getElementById('admin-password').value;
    if(u === 'Jamshid' && p === 'Jamshid123') {
        localStorage.setItem('sambufer_admin_auth', '1');
        window.location.href = 'admin.html';
    } else {
        const err = document.getElementById('admin-login-error');
        if (err) err.style.display = 'block';
    }
}

