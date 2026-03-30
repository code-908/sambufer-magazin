// =============================================
// SAMBUFER MARKET — app.js  (Clean Final)
// 72 car subwoofers, unique SVG per product
// =============================================

const brandColors = {
    'Pride':         ['#1a0040', '#9b00ff', '#c060ff'],
    'Deaf Bonce':    ['#0d1f0d', '#00c853', '#69f0ae'],
    'Pioneer':       ['#001a33', '#0077cc', '#40aaff'],
    'JBL':           ['#1a0000', '#ff5722', '#ff8a65'],
    'Kenwood':       ['#0a0a1a', '#3f51b5', '#7986cb'],
    'Alpine':        ['#00101a', '#00bcd4', '#4dd0e1'],
    'Hertz':         ['#1a1000', '#ff9800', '#ffb74d'],
    'Kicker':        ['#1a0d00', '#ff6f00', '#ffa726'],
    'Edge':          ['#0a001a', '#7c4dff', '#b388ff'],
    'Sony':          ['#000d1a', '#2196f3', '#64b5f6'],
    'Ural':          ['#1a0a00', '#e65100', '#ff8c42'],
    'Dynamic State': ['#001010', '#009688', '#4db6ac'],
    'Avatar':        ['#10001a', '#e040fb', '#ea80fc'],
    'SWAT':          ['#1a0000', '#d32f2f', '#ef9a9a'],
    'MTX':           ['#001a0a', '#00897b', '#4db6ac'],
    'Gladen':        ['#1a1400', '#fdd835', '#fff176'],
    'Soundstream':   ['#0d0d1a', '#5c6bc0', '#9fa8da'],
    'Rockford':      ['#1a0505', '#c62828', '#ef5350'],
    'JL Audio':      ['#001a10', '#2e7d32', '#66bb6a'],
    'Skar':          ['#0a0a0a', '#757575', '#bdbdbd'],
    'Crescendo':     ['#1a0010', '#ad1457', '#f48fb1'],
    'DD Audio':      ['#000a1a', '#1565c0', '#5c9bd6'],
    'Momo':          ['#10100a', '#9e8000', '#d4e157'],
    'CT Sounds':     ['#0d001a', '#6a1b9a', '#ce93d8'],
};
const fallbackColors = ['#0a0a1a', '#7000ff', '#b06aff'];

// Build SVG string for a product, then base64-encode it
function makeSvg(name, category, id) {
    const col = brandColors[category] || fallbackColors;
    const bg  = col[0], accent = col[1], ring = col[2];

    const sizeM = name.match(/(\d+)"/);
    const size  = sizeM ? sizeM[1] + '"' : '12"';
    const style = (id - 1) % 8;

    let inner = '';

    if (style === 0) {
        // Classic concentric rings
        inner = `
<circle cx="150" cy="148" r="128" fill="#111" stroke="${accent}" stroke-width="4"/>
<circle cx="150" cy="148" r="120" fill="none" stroke="${ring}" stroke-width="10" opacity="0.6"/>
<circle cx="150" cy="148" r="105" fill="${accent}" opacity="0.18"/>
<circle cx="150" cy="148" r="90" fill="none" stroke="${ring}" stroke-width="1.5" opacity="0.5"/>
<circle cx="150" cy="148" r="74" fill="none" stroke="${ring}" stroke-width="1.2" opacity="0.4"/>
<circle cx="150" cy="148" r="58" fill="none" stroke="${ring}" stroke-width="1" opacity="0.3"/>
<circle cx="150" cy="148" r="42" fill="none" stroke="${ring}" stroke-width="1" opacity="0.25"/>
<circle cx="150" cy="148" r="28" fill="#1c1c1c" stroke="${accent}" stroke-width="3"/>
<circle cx="150" cy="148" r="15" fill="${accent}"/>
<circle cx="150" cy="148" r="6" fill="#fff" opacity="0.35"/>
<circle cx="56" cy="65" r="8" fill="#222" stroke="${ring}" stroke-width="2"/><circle cx="56" cy="65" r="3.5" fill="${ring}"/>
<circle cx="244" cy="65" r="8" fill="#222" stroke="${ring}" stroke-width="2"/><circle cx="244" cy="65" r="3.5" fill="${ring}"/>
<circle cx="56" cy="231" r="8" fill="#222" stroke="${ring}" stroke-width="2"/><circle cx="56" cy="231" r="3.5" fill="${ring}"/>
<circle cx="244" cy="231" r="8" fill="#222" stroke="${ring}" stroke-width="2"/><circle cx="244" cy="231" r="3.5" fill="${ring}"/>`;
    } else if (style === 1) {
        // Spider web spokes
        inner = `
<circle cx="150" cy="148" r="125" fill="#111" stroke="${accent}" stroke-width="5"/>
<circle cx="150" cy="148" r="117" fill="none" stroke="${ring}" stroke-width="9" opacity="0.55"/>
<circle cx="150" cy="148" r="103" fill="${accent}" opacity="0.15"/>
<line x1="150" y1="45" x2="150" y2="148" stroke="${ring}" stroke-width="2" opacity="0.5"/>
<line x1="150" y1="251" x2="150" y2="148" stroke="${ring}" stroke-width="2" opacity="0.5"/>
<line x1="47" y1="148" x2="150" y2="148" stroke="${ring}" stroke-width="2" opacity="0.5"/>
<line x1="253" y1="148" x2="150" y2="148" stroke="${ring}" stroke-width="2" opacity="0.5"/>
<line x1="77" y1="78" x2="150" y2="148" stroke="${ring}" stroke-width="2" opacity="0.5"/>
<line x1="223" y1="78" x2="150" y2="148" stroke="${ring}" stroke-width="2" opacity="0.5"/>
<line x1="77" y1="218" x2="150" y2="148" stroke="${ring}" stroke-width="2" opacity="0.5"/>
<line x1="223" y1="218" x2="150" y2="148" stroke="${ring}" stroke-width="2" opacity="0.5"/>
<circle cx="150" cy="148" r="88" fill="none" stroke="${ring}" stroke-width="1" opacity="0.4"/>
<circle cx="150" cy="148" r="68" fill="none" stroke="${ring}" stroke-width="1" opacity="0.35"/>
<circle cx="150" cy="148" r="48" fill="none" stroke="${ring}" stroke-width="1" opacity="0.3"/>
<circle cx="150" cy="148" r="29" fill="#0d0d0d" stroke="${accent}" stroke-width="3"/>
<circle cx="150" cy="148" r="14" fill="${accent}"/>
<circle cx="150" cy="148" r="6" fill="white" opacity="0.4"/>
<circle cx="56" cy="65" r="8" fill="#1d1d1d" stroke="${ring}" stroke-width="2"/><circle cx="56" cy="65" r="3.5" fill="${ring}"/>
<circle cx="244" cy="65" r="8" fill="#1d1d1d" stroke="${ring}" stroke-width="2"/><circle cx="244" cy="65" r="3.5" fill="${ring}"/>
<circle cx="56" cy="231" r="8" fill="#1d1d1d" stroke="${ring}" stroke-width="2"/><circle cx="56" cy="231" r="3.5" fill="${ring}"/>
<circle cx="244" cy="231" r="8" fill="#1d1d1d" stroke="${ring}" stroke-width="2"/><circle cx="244" cy="231" r="3.5" fill="${ring}"/>`;
    } else if (style === 2) {
        // Square chassis / competition
        inner = `
<rect x="20" y="20" width="260" height="248" rx="18" fill="#0f0f0f" stroke="${accent}" stroke-width="3"/>
<rect x="30" y="30" width="240" height="228" rx="12" fill="none" stroke="${ring}" stroke-width="1.5" opacity="0.3"/>
<circle cx="42" cy="42" r="8" fill="#1a1a1a" stroke="${ring}" stroke-width="2"/><circle cx="42" cy="42" r="3.5" fill="${ring}"/>
<circle cx="258" cy="42" r="8" fill="#1a1a1a" stroke="${ring}" stroke-width="2"/><circle cx="258" cy="42" r="3.5" fill="${ring}"/>
<circle cx="42" cy="234" r="8" fill="#1a1a1a" stroke="${ring}" stroke-width="2"/><circle cx="42" cy="234" r="3.5" fill="${ring}"/>
<circle cx="258" cy="234" r="8" fill="#1a1a1a" stroke="${ring}" stroke-width="2"/><circle cx="258" cy="234" r="3.5" fill="${ring}"/>
<circle cx="150" cy="138" r="98" fill="${accent}" opacity="0.2"/>
<circle cx="150" cy="138" r="98" fill="none" stroke="${accent}" stroke-width="4"/>
<circle cx="150" cy="138" r="86" fill="none" stroke="${ring}" stroke-width="8" opacity="0.5"/>
<circle cx="150" cy="138" r="72" fill="none" stroke="${ring}" stroke-width="1.5" opacity="0.4"/>
<circle cx="150" cy="138" r="56" fill="none" stroke="${ring}" stroke-width="1" opacity="0.35"/>
<circle cx="150" cy="138" r="40" fill="none" stroke="${ring}" stroke-width="1" opacity="0.3"/>
<circle cx="150" cy="138" r="28" fill="#111" stroke="${accent}" stroke-width="2.5"/>
<circle cx="150" cy="138" r="16" fill="${accent}"/>
<circle cx="150" cy="138" r="6" fill="white" opacity="0.35"/>`;
    } else if (style === 3) {
        // Slim / elliptical (shallow mount)
        inner = `
<rect x="10" y="85" width="280" height="130" rx="65" fill="#111" stroke="${accent}" stroke-width="4"/>
<ellipse cx="150" cy="150" rx="128" ry="58" fill="#0d0d0d" stroke="${ring}" stroke-width="3"/>
<ellipse cx="150" cy="150" rx="118" ry="50" fill="none" stroke="${ring}" stroke-width="9" opacity="0.55"/>
<ellipse cx="150" cy="150" rx="100" ry="40" fill="${accent}" opacity="0.18"/>
<ellipse cx="150" cy="150" rx="85" ry="32" fill="none" stroke="${ring}" stroke-width="1.5" opacity="0.45"/>
<ellipse cx="150" cy="150" rx="68" ry="24" fill="none" stroke="${ring}" stroke-width="1.2" opacity="0.35"/>
<ellipse cx="150" cy="150" rx="50" ry="17" fill="none" stroke="${ring}" stroke-width="1" opacity="0.3"/>
<ellipse cx="150" cy="150" rx="29" ry="14" fill="#111" stroke="${accent}" stroke-width="2.5"/>
<ellipse cx="150" cy="150" rx="16" ry="8" fill="${accent}"/>
<circle cx="42" cy="150" r="8" fill="#1a1a1a" stroke="${ring}" stroke-width="2"/><circle cx="42" cy="150" r="3.5" fill="${ring}"/>
<circle cx="258" cy="150" r="8" fill="#1a1a1a" stroke="${ring}" stroke-width="2"/><circle cx="258" cy="150" r="3.5" fill="${ring}"/>
<circle cx="96" cy="98" r="8" fill="#1a1a1a" stroke="${ring}" stroke-width="2"/><circle cx="96" cy="98" r="3.5" fill="${ring}"/>
<circle cx="204" cy="98" r="8" fill="#1a1a1a" stroke="${ring}" stroke-width="2"/><circle cx="204" cy="98" r="3.5" fill="${ring}"/>
<circle cx="96" cy="202" r="8" fill="#1a1a1a" stroke="${ring}" stroke-width="2"/><circle cx="96" cy="202" r="3.5" fill="${ring}"/>
<circle cx="204" cy="202" r="8" fill="#1a1a1a" stroke="${ring}" stroke-width="2"/><circle cx="204" cy="202" r="3.5" fill="${ring}"/>`;
    } else if (style === 4) {
        // 6-bolt SPL competition
        inner = `
<circle cx="150" cy="144" r="130" fill="#0e0e0e" stroke="${accent}" stroke-width="4"/>
<circle cx="150" cy="144" r="122" fill="none" stroke="${ring}" stroke-width="10" opacity="0.5"/>
<circle cx="150" cy="144" r="108" fill="${accent}" opacity="0.18"/>
<circle cx="150" cy="144" r="93" fill="none" stroke="${ring}" stroke-width="1.5" opacity="0.45"/>
<circle cx="150" cy="144" r="76" fill="none" stroke="${ring}" stroke-width="1.2" opacity="0.4"/>
<circle cx="150" cy="144" r="58" fill="none" stroke="${ring}" stroke-width="1" opacity="0.35"/>
<circle cx="150" cy="144" r="40" fill="none" stroke="${ring}" stroke-width="1" opacity="0.3"/>
<circle cx="150" cy="144" r="28" fill="#111" stroke="${accent}" stroke-width="3"/>
<circle cx="150" cy="144" r="15" fill="${accent}"/>
<circle cx="150" cy="144" r="6" fill="white" opacity="0.3"/>
<circle cx="150" cy="20" r="9" fill="#1a1a1a" stroke="${ring}" stroke-width="2"/><circle cx="150" cy="20" r="4" fill="${ring}"/>
<circle cx="263" cy="82" r="9" fill="#1a1a1a" stroke="${ring}" stroke-width="2"/><circle cx="263" cy="82" r="4" fill="${ring}"/>
<circle cx="263" cy="206" r="9" fill="#1a1a1a" stroke="${ring}" stroke-width="2"/><circle cx="263" cy="206" r="4" fill="${ring}"/>
<circle cx="150" cy="268" r="9" fill="#1a1a1a" stroke="${ring}" stroke-width="2"/><circle cx="150" cy="268" r="4" fill="${ring}"/>
<circle cx="37" cy="206" r="9" fill="#1a1a1a" stroke="${ring}" stroke-width="2"/><circle cx="37" cy="206" r="4" fill="${ring}"/>
<circle cx="37" cy="82" r="9" fill="#1a1a1a" stroke="${ring}" stroke-width="2"/><circle cx="37" cy="82" r="4" fill="${ring}"/>`;
    } else if (style === 5) {
        // 3D cylinder side view
        inner = `
<ellipse cx="150" cy="82" rx="128" ry="42" fill="${accent}" opacity="0.8"/>
<rect x="22" y="82" width="256" height="136" fill="#111"/>
<ellipse cx="150" cy="218" rx="128" ry="42" fill="#111" stroke="${accent}" stroke-width="3"/>
<ellipse cx="150" cy="82" rx="108" ry="32" fill="#0d0d0d" stroke="${ring}" stroke-width="2"/>
<ellipse cx="150" cy="82" rx="95" ry="27" fill="none" stroke="${ring}" stroke-width="7" opacity="0.5"/>
<ellipse cx="150" cy="82" rx="79" ry="21" fill="${ring}" opacity="0.3"/>
<ellipse cx="150" cy="82" rx="62" ry="16" fill="none" stroke="${ring}" stroke-width="1.5" opacity="0.4"/>
<ellipse cx="150" cy="82" rx="44" ry="11" fill="none" stroke="${ring}" stroke-width="1" opacity="0.35"/>
<ellipse cx="150" cy="82" rx="26" ry="7" fill="${accent}"/>
<ellipse cx="150" cy="82" rx="12" ry="4" fill="white" opacity="0.3"/>
<rect x="198" y="148" width="52" height="32" rx="4" fill="#222" stroke="${ring}" stroke-width="1.5"/>
<circle cx="214" cy="164" r="5" fill="${accent}"/><circle cx="234" cy="164" r="5" fill="${accent}"/>
<text x="65" y="162" font-family="Arial Black,sans-serif" font-size="28" font-weight="900" fill="${accent}" opacity="0.6">${category.substring(0,5).toUpperCase()}</text>`;
    } else if (style === 6) {
        // Premium glossy with sheen
        inner = `
<circle cx="150" cy="148" r="126" fill="#111" stroke="${ring}" stroke-width="2"/>
<circle cx="150" cy="148" r="118" fill="none" stroke="${ring}" stroke-width="12" opacity="0.55"/>
<circle cx="150" cy="148" r="103" fill="${accent}" opacity="0.22"/>
<circle cx="150" cy="148" r="103" fill="url(#sheen)"/>
<circle cx="150" cy="148" r="90" fill="none" stroke="${ring}" stroke-width="1.5" opacity="0.35"/>
<circle cx="150" cy="148" r="74" fill="none" stroke="${ring}" stroke-width="1.2" opacity="0.3"/>
<circle cx="150" cy="148" r="58" fill="none" stroke="${ring}" stroke-width="1" opacity="0.25"/>
<circle cx="150" cy="148" r="42" fill="none" stroke="${ring}" stroke-width="1" opacity="0.2"/>
<circle cx="150" cy="148" r="30" fill="#0d0d0d" stroke="${ring}" stroke-width="3"/>
<circle cx="150" cy="148" r="18" fill="${ring}"/>
<circle cx="150" cy="148" r="8" fill="white" opacity="0.4"/>
<circle cx="56" cy="63" r="9" fill="#1a1a1a" stroke="${ring}" stroke-width="2.5"/><circle cx="56" cy="63" r="4" fill="${ring}"/>
<circle cx="244" cy="63" r="9" fill="#1a1a1a" stroke="${ring}" stroke-width="2.5"/><circle cx="244" cy="63" r="4" fill="${ring}"/>
<circle cx="56" cy="233" r="9" fill="#1a1a1a" stroke="${ring}" stroke-width="2.5"/><circle cx="56" cy="233" r="4" fill="${ring}"/>
<circle cx="244" cy="233" r="9" fill="#1a1a1a" stroke="${ring}" stroke-width="2.5"/><circle cx="244" cy="233" r="4" fill="${ring}"/>`;
    } else {
        // 8-bolt chassis round
        inner = `
<circle cx="150" cy="148" r="130" fill="#0d0d0d" stroke="${accent}" stroke-width="3"/>
<circle cx="150" cy="148" r="120" fill="none" stroke="${ring}" stroke-width="10" opacity="0.5"/>
<circle cx="150" cy="148" r="106" fill="${accent}" opacity="0.2"/>
<circle cx="150" cy="148" r="92" fill="none" stroke="${ring}" stroke-width="1.5" opacity="0.45"/>
<circle cx="150" cy="148" r="76" fill="none" stroke="${ring}" stroke-width="1.2" opacity="0.38"/>
<circle cx="150" cy="148" r="60" fill="none" stroke="${ring}" stroke-width="1" opacity="0.3"/>
<circle cx="150" cy="148" r="44" fill="none" stroke="${ring}" stroke-width="1" opacity="0.25"/>
<circle cx="150" cy="148" r="28" fill="#111" stroke="${accent}" stroke-width="3"/>
<circle cx="150" cy="148" r="15" fill="${ring}"/>
<circle cx="150" cy="148" r="6" fill="white" opacity="0.35"/>
<circle cx="150" cy="20" r="8" fill="#1d1d1d" stroke="${ring}" stroke-width="2"/><circle cx="150" cy="20" r="3.5" fill="${ring}"/>
<circle cx="232" cy="44" r="8" fill="#1d1d1d" stroke="${ring}" stroke-width="2"/><circle cx="232" cy="44" r="3.5" fill="${ring}"/>
<circle cx="272" cy="120" r="8" fill="#1d1d1d" stroke="${ring}" stroke-width="2"/><circle cx="272" cy="120" r="3.5" fill="${ring}"/>
<circle cx="272" cy="200" r="8" fill="#1d1d1d" stroke="${ring}" stroke-width="2"/><circle cx="272" cy="200" r="3.5" fill="${ring}"/>
<circle cx="232" cy="260" r="8" fill="#1d1d1d" stroke="${ring}" stroke-width="2"/><circle cx="232" cy="260" r="3.5" fill="${ring}"/>
<circle cx="68" cy="260" r="8" fill="#1d1d1d" stroke="${ring}" stroke-width="2"/><circle cx="68" cy="260" r="3.5" fill="${ring}"/>
<circle cx="28" cy="200" r="8" fill="#1d1d1d" stroke="${ring}" stroke-width="2"/><circle cx="28" cy="200" r="3.5" fill="${ring}"/>
<circle cx="28" cy="120" r="8" fill="#1d1d1d" stroke="${ring}" stroke-width="2"/><circle cx="28" cy="120" r="3.5" fill="${ring}"/>`;
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
<defs>
<radialGradient id="sheen" cx="35%" cy="30%" r="45%">
<stop offset="0%" stop-color="white" stop-opacity="0.22"/>
<stop offset="100%" stop-color="white" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="300" height="300" fill="${bg}"/>
${inner}
<rect x="0" y="270" width="300" height="30" fill="${accent}"/>
<text x="12" y="289" font-family="Arial Black,sans-serif" font-size="14" font-weight="900" fill="white">${category}</text>
<rect x="248" y="274" width="46" height="20" rx="5" fill="rgba(255,255,255,0.18)"/>
<text x="271" y="288" font-family="Arial Black,sans-serif" font-size="12" font-weight="900" fill="white" text-anchor="middle">${size}</text>
</svg>`;

    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

// ============ PRODUCTS ============
const products = [
    // PRIDE
    {id:1,  name:'Pride M.6 12" — Avto-sambufer',        category:'Pride',        price:1850000, oldPrice:2100000, rating:4.9, reviewsCount:156, monthlyPrice:154166},
    {id:2,  name:'Pride T.15 v3 — Professional',          category:'Pride',        price:5200000, oldPrice:5800000, rating:5.0, reviewsCount:34,  monthlyPrice:433333},
    {id:3,  name:'Pride S.12 v3 — SPL sambufer',          category:'Pride',        price:4200000, oldPrice:4800000, rating:4.8, reviewsCount:22,  monthlyPrice:350000},
    {id:4,  name:'Pride Junior 12" — Yangi avlod',        category:'Pride',        price:950000,  oldPrice:1100000, rating:4.7, reviewsCount:189, monthlyPrice:79166},
    {id:5,  name:'Pride Eco 10" — Hamyonbop',             category:'Pride',        price:750000,  oldPrice:900000,  rating:4.5, reviewsCount:45,  monthlyPrice:62500},
    {id:6,  name:'Pride DB 12" — Deep Bass',              category:'Pride',        price:2300000, oldPrice:2600000, rating:4.8, reviewsCount:67,  monthlyPrice:191666},
    {id:7,  name:'Pride Sport 10" — Yengil korpus',       category:'Pride',        price:1100000, oldPrice:1300000, rating:4.6, reviewsCount:55,  monthlyPrice:91666},
    // DEAF BONCE
    {id:8,  name:'Deaf Bonce Machete Sport 12"',          category:'Deaf Bonce',  price:2400000, oldPrice:2800000, rating:4.8, reviewsCount:89,  monthlyPrice:200000},
    {id:9,  name:'Deaf Bonce Apocalypse 12" SPL',         category:'Deaf Bonce',  price:6800000, oldPrice:7500000, rating:5.0, reviewsCount:12,  monthlyPrice:566666},
    {id:10, name:'Deaf Bonce Hannibal 12"',               category:'Deaf Bonce',  price:3500000, oldPrice:4000000, rating:4.7, reviewsCount:31,  monthlyPrice:291666},
    {id:11, name:'Deaf Bonce Machete Lite 10"',           category:'Deaf Bonce',  price:1100000, oldPrice:1300000, rating:4.5, reviewsCount:78,  monthlyPrice:91666},
    {id:12, name:'Deaf Bonce Avatar 15" SST',             category:'Deaf Bonce',  price:4500000, oldPrice:5100000, rating:4.9, reviewsCount:19,  monthlyPrice:375000},
    {id:13, name:'Deaf Bonce Apocalypse 15" Pro',         category:'Deaf Bonce',  price:8500000, oldPrice:9500000, rating:5.0, reviewsCount:8,   monthlyPrice:708333},
    // PIONEER
    {id:14, name:'Pioneer TS-W311D4 — 12" SVC',          category:'Pioneer',      price:1350000, oldPrice:1500000, rating:4.7, reviewsCount:234, monthlyPrice:112500},
    {id:15, name:'Pioneer TS-WX306 — Korpusli',           category:'Pioneer',      price:2150000, oldPrice:2400000, rating:4.8, reviewsCount:167, monthlyPrice:179166},
    {id:16, name:'Pioneer TS-W3003D4 — 12" D4',          category:'Pioneer',      price:900000,  oldPrice:1100000, rating:4.4, reviewsCount:45,  monthlyPrice:75000},
    {id:17, name:'Pioneer Champion PRO 12"',              category:'Pioneer',      price:3100000, oldPrice:3500000, rating:4.9, reviewsCount:88,  monthlyPrice:258333},
    {id:18, name:'Pioneer TS-W1200PRO — 12"',            category:'Pioneer',      price:1650000, oldPrice:1900000, rating:4.6, reviewsCount:113, monthlyPrice:137500},
    // JBL
    {id:19, name:'JBL Stage 1210 — 12" SVC',             category:'JBL',          price:1100000, oldPrice:1300000, rating:4.9, reviewsCount:312, monthlyPrice:91666},
    {id:20, name:'JBL BassPro Hub — Slim Sub',            category:'JBL',          price:4500000, oldPrice:5200000, rating:4.8, reviewsCount:23,  monthlyPrice:375000},
    {id:21, name:'JBL GT-BassPro 12 — Slim korpus',      category:'JBL',          price:2200000, oldPrice:2600000, rating:4.7, reviewsCount:76,  monthlyPrice:183333},
    {id:22, name:'JBL Club WS1000 — 10"',                category:'JBL',          price:850000,  oldPrice:990000,  rating:4.5, reviewsCount:98,  monthlyPrice:70833},
    // KENWOOD
    {id:23, name:'Kenwood KSC-W1200T — Aktiv',           category:'Kenwood',      price:3200000, oldPrice:3800000, rating:4.6, reviewsCount:45,  monthlyPrice:266666},
    {id:24, name:'Kenwood KFC-W3010 — 12" DVC',          category:'Kenwood',      price:1450000, oldPrice:1700000, rating:4.7, reviewsCount:112, monthlyPrice:120833},
    {id:25, name:'Kenwood KFC-WPS1000F — 10"',           category:'Kenwood',      price:1800000, oldPrice:2100000, rating:4.8, reviewsCount:67,  monthlyPrice:150000},
    // ALPINE
    {id:26, name:'Alpine SWG-1244 — 12" D4',             category:'Alpine',       price:2100000, oldPrice:2500000, rating:4.9, reviewsCount:143, monthlyPrice:175000},
    {id:27, name:'Alpine Type R 12" — R-Series',         category:'Alpine',       price:4200000, oldPrice:4800000, rating:5.0, reviewsCount:22,  monthlyPrice:350000},
    {id:28, name:'Alpine S-W12D4 — S-Series 12"',        category:'Alpine',       price:1600000, oldPrice:1850000, rating:4.7, reviewsCount:88,  monthlyPrice:133333},
    {id:29, name:'Alpine PDP-E800 — 8" Powered',         category:'Alpine',       price:2800000, oldPrice:3200000, rating:4.6, reviewsCount:34,  monthlyPrice:233333},
    // HERTZ
    {id:30, name:'Hertz DS 30.3 — 12" SVC',              category:'Hertz',        price:1450000, oldPrice:1600000, rating:4.8, reviewsCount:67,  monthlyPrice:120833},
    {id:31, name:'Hertz Mille Pro MP 250 D4 — 10"',      category:'Hertz',        price:3800000, oldPrice:4200000, rating:4.9, reviewsCount:15,  monthlyPrice:316666},
    {id:32, name:'Hertz ES 300.5 — 12" DVC',             category:'Hertz',        price:2200000, oldPrice:2600000, rating:4.7, reviewsCount:41,  monthlyPrice:183333},
    // KICKER
    {id:33, name:'Kicker Solo-Baric L7 12" — 4ohm',      category:'Kicker',       price:4900000, oldPrice:5500000, rating:4.8, reviewsCount:56,  monthlyPrice:408333},
    {id:34, name:'Kicker CompC 12" — SVC',               category:'Kicker',       price:1250000, oldPrice:1450000, rating:4.6, reviewsCount:89,  monthlyPrice:104166},
    {id:35, name:'Kicker CompVT 10" — Thin mount',       category:'Kicker',       price:2300000, oldPrice:2700000, rating:4.7, reviewsCount:43,  monthlyPrice:191666},
    // EDGE
    {id:36, name:'Edge EDB12BR-E0 — 12" Ommabop',        category:'Edge',         price:1650000, oldPrice:1950000, rating:4.5, reviewsCount:120, monthlyPrice:137500},
    {id:37, name:'Edge Street Series 15" — SPL',         category:'Edge',         price:3400000, oldPrice:3900000, rating:4.7, reviewsCount:56,  monthlyPrice:283333},
    // SONY
    {id:38, name:'Sony XS-NW1200 — 12" 1200W',           category:'Sony',         price:1200000, oldPrice:1400000, rating:4.4, reviewsCount:88,  monthlyPrice:100000},
    {id:39, name:'Sony XS-W124ES — 12" Premium',         category:'Sony',         price:2800000, oldPrice:3200000, rating:4.6, reviewsCount:56,  monthlyPrice:233333},
    {id:40, name:'Sony GTX Series 15" — Max Power',      category:'Sony',         price:3500000, oldPrice:4100000, rating:4.7, reviewsCount:34,  monthlyPrice:291666},
    // URAL
    {id:41, name:'Ural Bulava 12" — Rus brendidan',      category:'Ural',         price:1900000, oldPrice:2200000, rating:4.6, reviewsCount:78,  monthlyPrice:158333},
    {id:42, name:'Ural Patriot 12" — SPL Musobaqasi',   category:'Ural',         price:3200000, oldPrice:3700000, rating:4.7, reviewsCount:42,  monthlyPrice:266666},
    {id:43, name:'Ural Bastion 15" — Heavy Bass',        category:'Ural',         price:4100000, oldPrice:4700000, rating:4.8, reviewsCount:21,  monthlyPrice:341666},
    // DYNAMIC STATE
    {id:44, name:'Dynamic State Quart 12" — Premium',    category:'Dynamic State', price:2600000, oldPrice:3000000, rating:4.7, reviewsCount:39,  monthlyPrice:216666},
    {id:45, name:'Dynamic State Carbon 15" — Pro',       category:'Dynamic State', price:5500000, oldPrice:6200000, rating:4.9, reviewsCount:14,  monthlyPrice:458333},
    // AVATAR
    {id:46, name:'Avatar Storm 12" — 2000W RMS',         category:'Avatar',       price:3100000, oldPrice:3600000, rating:4.8, reviewsCount:47,  monthlyPrice:258333},
    {id:47, name:'Avatar Cyclone 15" — SPL',             category:'Avatar',       price:4800000, oldPrice:5400000, rating:4.9, reviewsCount:18,  monthlyPrice:400000},
    {id:48, name:'Avatar Buster 10" — Kichik, Kuchli',  category:'Avatar',       price:1400000, oldPrice:1650000, rating:4.5, reviewsCount:61,  monthlyPrice:116666},
    // SWAT
    {id:49, name:'SWAT SPL-10 — 10" Qulay narx',        category:'SWAT',         price:680000,  oldPrice:850000,  rating:4.3, reviewsCount:134, monthlyPrice:56666},
    {id:50, name:'SWAT Pro 12" — Hamyonbop',             category:'SWAT',         price:950000,  oldPrice:1150000, rating:4.4, reviewsCount:98,  monthlyPrice:79166},
    // MTX
    {id:51, name:'MTX Audio T812-44 — 12" D4',           category:'MTX',          price:2000000, oldPrice:2300000, rating:4.6, reviewsCount:53,  monthlyPrice:166666},
    {id:52, name:'MTX Thunder 750W — 12"',               category:'MTX',          price:1700000, oldPrice:2000000, rating:4.5, reviewsCount:74,  monthlyPrice:141666},
    // GLADEN
    {id:53, name:'Gladen Zero 12" — Germany sifati',    category:'Gladen',       price:5800000, oldPrice:6500000, rating:5.0, reviewsCount:9,   monthlyPrice:483333},
    {id:54, name:'Gladen RS 10 VA — 10" Reference',     category:'Gladen',       price:3900000, oldPrice:4400000, rating:4.9, reviewsCount:11,  monthlyPrice:325000},
    // SOUNDSTREAM
    {id:55, name:'Soundstream R1.15 — 15" REVO',        category:'Soundstream',  price:4200000, oldPrice:4800000, rating:4.7, reviewsCount:28,  monthlyPrice:350000},
    {id:56, name:'Soundstream PSW.121 — 12"',           category:'Soundstream',  price:1800000, oldPrice:2100000, rating:4.5, reviewsCount:61,  monthlyPrice:150000},
    // KENWOOD extra
    {id:57, name:'Kenwood XM-1842SP — 12" 1800W',       category:'Kenwood',      price:2500000, oldPrice:2900000, rating:4.8, reviewsCount:44,  monthlyPrice:208333},
    // ALPINE extra
    {id:58, name:'Alpine W12S4 — 12" SVC 4ohm',         category:'Alpine',       price:1350000, oldPrice:1600000, rating:4.6, reviewsCount:87,  monthlyPrice:112500},
    // ROCKFORD
    {id:59, name:'Rockford Fosgate P3D4-12 — Punch',    category:'Rockford',     price:3600000, oldPrice:4100000, rating:4.9, reviewsCount:33,  monthlyPrice:300000},
    {id:60, name:'Rockford Fosgate R2D4-12 — Prime',    category:'Rockford',     price:1900000, oldPrice:2200000, rating:4.7, reviewsCount:58,  monthlyPrice:158333},
    {id:61, name:'Rockford Fosgate T1D212 — Power 12"', category:'Rockford',     price:6500000, oldPrice:7200000, rating:5.0, reviewsCount:7,   monthlyPrice:541666},
    // JL AUDIO
    {id:62, name:'JL Audio 12W7AE-3 — 12" W7',         category:'JL Audio',     price:9800000, oldPrice:11000000,rating:5.0, reviewsCount:5,   monthlyPrice:816666},
    {id:63, name:'JL Audio 12W3v3-4 — 12" W3',         category:'JL Audio',     price:4100000, oldPrice:4600000, rating:4.9, reviewsCount:17,  monthlyPrice:341666},
    // SKAR
    {id:64, name:'Skar Audio VXF-12 — Max 2000W',       category:'Skar',         price:2100000, oldPrice:2450000, rating:4.7, reviewsCount:66,  monthlyPrice:175000},
    {id:65, name:'Skar Audio DDX-12 — D2 1500W',        category:'Skar',         price:1600000, oldPrice:1900000, rating:4.6, reviewsCount:81,  monthlyPrice:133333},
    // CRESCENDO
    {id:66, name:'Crescendo Audio BC3500 — 15" SPL',    category:'Crescendo',    price:7200000, oldPrice:8100000, rating:4.9, reviewsCount:6,   monthlyPrice:600000},
    // DD AUDIO
    {id:67, name:'DD Audio 1510f — 10" Freeair',        category:'DD Audio',     price:2900000, oldPrice:3300000, rating:4.8, reviewsCount:24,  monthlyPrice:241666},
    {id:68, name:'DD Audio 9512G — 12" Level 9',        category:'DD Audio',     price:5100000, oldPrice:5750000, rating:4.9, reviewsCount:10,  monthlyPrice:425000},
    // MOMO
    {id:69, name:'Momo Subwoofer 12" — Italy Design',   category:'Momo',         price:2700000, oldPrice:3100000, rating:4.7, reviewsCount:38,  monthlyPrice:225000},
    {id:70, name:'Momo Power 15" — Professional',       category:'Momo',         price:4600000, oldPrice:5200000, rating:4.8, reviewsCount:16,  monthlyPrice:383333},
    // CT SOUNDS
    {id:71, name:'CT Sounds Ozone 12" — Ultra Bass',    category:'CT Sounds',    price:1750000, oldPrice:2050000, rating:4.6, reviewsCount:52,  monthlyPrice:145833},
    {id:72, name:'CT Sounds Bio 15" — Budget SPL',      category:'CT Sounds',    price:2400000, oldPrice:2750000, rating:4.5, reviewsCount:45,  monthlyPrice:200000},
];

// Attach unique SVG images
products.forEach(p => { p.image = makeSvg(p.name, p.category, p.id); });

let cart = [];

// ============ RENDER PRODUCTS ============
function renderProducts(list) {
    const grid = document.getElementById('product-grid');
    const countEl = document.getElementById('product-count');
    if (countEl) countEl.textContent = list.length + ' ta mahsulot';
    if (!grid) return;

    if (list.length === 0) {
        grid.innerHTML = `<div class="no-results">
            <div style="font-size:60px;margin-bottom:16px;">🔍</div>
            <h3>Mahsulot topilmadi</h3>
            <p style="color:#8b8e99;margin-top:8px;">Boshqa so'z bilan qidirib ko'ring</p>
        </div>`;
        return;
    }

    grid.innerHTML = list.map(p => `
        <div class="product-card">
            <div class="img-container">
                <img src="${p.image}" alt="${p.name}" class="product-img">
                <button class="wishlist-btn" onclick="toggleWishlist(this)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                </button>
            </div>
            <div class="product-info">
                <span class="brand-tag">${p.category}</span>
                <h3 class="product-title">${p.name}</h3>
                <div class="rating-block">
                    <span style="color:#ffbe1e;">★</span>
                    <span style="font-weight:600;font-size:12px;">${p.rating.toFixed(1)}</span>
                    <span style="color:#8b8e99;font-size:11px;">(${p.reviewsCount})</span>
                </div>
                <div class="installment-badge">${p.monthlyPrice.toLocaleString()} so'm/oyiga</div>
                <div class="price-container">
                    <span class="old-price">${p.oldPrice.toLocaleString()} so'm</span>
                    <div class="current-price-row">
                        <span class="current-price">${p.price.toLocaleString()} so'm</span>
                        <button class="add-btn-circle" onclick="addToCart(${p.id})">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>`).join('');
}

// ============ FILTER ============
function filterByCategory(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(cat === 'all' ? products : products.filter(p => p.category === cat));
}

// ============ WISHLIST ============
function toggleWishlist(btn) {
    btn.classList.toggle('active');
}

// ============ SEARCH ============
function setupSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;
    input.addEventListener('input', e => {
        const q = e.target.value.toLowerCase().trim();
        document.querySelectorAll('.filter-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
        renderProducts(q ? products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) : products);
    });
}

// ============ CART ============
function addToCart(productId) {
    const p = products.find(x => x.id === productId);
    if (!p) return;
    const ex = cart.find(x => x.id === productId);
    if (ex) ex.qty += 1; else cart.push({ ...p, qty: 1 });
    updateCartCount();
    showToast('✅ "' + p.name.split('—')[0].trim() + '" savatga qo\'shildi!');
}

function removeFromCart(i) { cart.splice(i, 1); updateCartCount(); renderCart(); }
function changeQty(i, d) {
    cart[i].qty += d;
    if (cart[i].qty <= 0) cart.splice(i, 1);
    updateCartCount(); renderCart();
}

function updateCartCount() {
    const total = cart.reduce((s, x) => s + x.qty, 0);
    ['cart-count', 'cart-total-items'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = total; });
}

function renderCart() {
    const ci = document.getElementById('cart-items');
    const tp = document.getElementById('total-price');
    if (!ci || !tp) return;
    if (cart.length === 0) {
        ci.innerHTML = `<div style="text-align:center;padding:50px 20px;color:#8b8e99;">
            <div style="font-size:52px;margin-bottom:12px;">🛒</div>
            <p style="font-weight:600;">Savatcha bo'sh</p>
        </div>`;
        tp.textContent = "0 so'm"; return;
    }
    ci.innerHTML = cart.map((item, i) => `
        <div style="display:flex;gap:12px;padding:14px 0;border-bottom:1px solid #f2f4f7;align-items:flex-start;">
            <img src="${item.image}" style="width:64px;height:64px;object-fit:contain;border-radius:10px;background:#f8f0ff;flex-shrink:0;">
            <div style="flex:1;min-width:0;">
                <p style="font-size:12px;font-weight:600;color:#1f2026;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${item.name}</p>
                <p style="color:#7000ff;font-weight:800;margin-top:4px;font-size:14px;">${item.price.toLocaleString()} so'm</p>
                <div style="display:flex;align-items:center;gap:8px;margin-top:8px;">
                    <button onclick="changeQty(${i},-1)" style="width:26px;height:26px;border:1.5px solid #ddd;border-radius:50%;background:#fff;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;font-weight:700;">−</button>
                    <span style="font-weight:700;min-width:20px;text-align:center;">${item.qty}</span>
                    <button onclick="changeQty(${i},1)" style="width:26px;height:26px;border:1.5px solid #ddd;border-radius:50%;background:#fff;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;font-weight:700;">+</button>
                    <button onclick="removeFromCart(${i})" style="margin-left:auto;background:none;border:none;color:#ff4651;cursor:pointer;font-size:12px;font-weight:500;">O'chirish</button>
                </div>
            </div>
        </div>`).join('');
    tp.textContent = cart.reduce((s, x) => s + x.price * x.qty, 0).toLocaleString() + " so'm";
}

// ============ ORDER ============
function openOrderModal() {
    if (cart.length === 0) { showToast("⚠️ Savatcha bo'sh!"); return; }
    document.getElementById('cart-drawer').classList.remove('active');
    document.getElementById('cart-overlay').classList.remove('active');
    document.getElementById('order-modal').classList.add('active');
    document.getElementById('order-overlay').classList.add('active');
    renderOrderSummary();
}
function closeOrderModal() {
    document.getElementById('order-modal').classList.remove('active');
    document.getElementById('order-overlay').classList.remove('active');
}
function renderOrderSummary() {
    const el = document.getElementById('order-summary');
    if (!el) return;
    const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
    el.innerHTML = cart.map(x => `
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f5f5f5;font-size:13px;">
            <span style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;max-width:65%;">${x.name} × ${x.qty}</span>
            <span style="font-weight:700;">${(x.price * x.qty).toLocaleString()} so'm</span>
        </div>`).join('') +
        `<div style="display:flex;justify-content:space-between;padding:14px 0 4px;font-size:16px;font-weight:800;color:#7000ff;">
            <span>Jami:</span><span>${total.toLocaleString()} so'm</span>
        </div>`;
}
function submitOrder(e) {
    e.preventDefault();
    const n = document.getElementById('order-name').value.trim();
    const p = document.getElementById('order-phone').value.trim();
    const a = document.getElementById('order-address').value.trim();
    if (!n || !p || !a) { showToast('⚠️ Barcha maydonlarni to\'ldiring!'); return; }
    closeOrderModal();
    cart = []; updateCartCount();
    document.getElementById('success-modal').classList.add('active');
    document.getElementById('order-overlay').classList.add('active');
    document.getElementById('order-form').reset();
    setTimeout(() => {
        document.getElementById('success-modal').classList.remove('active');
        document.getElementById('order-overlay').classList.remove('active');
    }, 4000);
}

// ============ DELIVERY MODAL ============
function openDelivery() {
    document.getElementById('delivery-modal').classList.add('active');
    document.getElementById('delivery-overlay').classList.add('active');
}
function closeDelivery() {
    document.getElementById('delivery-modal').classList.remove('active');
    document.getElementById('delivery-overlay').classList.remove('active');
}

// ============ TOAST ============
function showToast(msg) {
    let t = document.getElementById('toast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'toast';
        Object.assign(t.style, {position:'fixed',bottom:'30px',left:'50%',transform:'translateX(-50%)',
            background:'#1f2026',color:'#fff',padding:'12px 24px',borderRadius:'24px',
            fontSize:'14px',zIndex:'9999',opacity:'0',transition:'all 0.3s ease',
            whiteSpace:'nowrap',boxShadow:'0 8px 24px rgba(0,0,0,0.25)'});
        document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1'; t.style.bottom = '40px';
    clearTimeout(t._t);
    t._t = setTimeout(() => { t.style.opacity = '0'; t.style.bottom = '30px'; }, 2500);
}

// ============ INIT ============
window.onload = function () {
    renderProducts(products);
    setupSearch();

    const drawer  = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    const icon    = document.getElementById('cart-icon');
    const close   = document.getElementById('close-cart');
    const form    = document.getElementById('order-form');
    const ov2     = document.getElementById('order-overlay');

    if (icon)    icon.addEventListener('click', () => { drawer.classList.add('active'); overlay.classList.add('active'); renderCart(); });
    if (close)   close.addEventListener('click', () => { drawer.classList.remove('active'); overlay.classList.remove('active'); });
    if (overlay) overlay.addEventListener('click', () => { drawer.classList.remove('active'); overlay.classList.remove('active'); });
    if (form)    form.addEventListener('submit', submitOrder);
    if (ov2)     ov2.addEventListener('click', () => {
        closeOrderModal();
        document.getElementById('success-modal').classList.remove('active');
        ov2.classList.remove('active');
    });

    const dov = document.getElementById('delivery-overlay');
    if (dov) dov.addEventListener('click', closeDelivery);
};
