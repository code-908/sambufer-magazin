
const seed = () => {
    // 1. ADD SAMPLES FOR WAREHOUSE
    const wh = [
        {
            id: 1,
            name: 'Pride M.6 12"',
            category: 'Pride',
            price: 1500000,
            oldPrice: 1800000,
            desc: 'Powerful subwoofer with deep bass.',
            image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f0e6ff"/><text x="50" y="55" text-anchor="middle" font-size="20">🔊</text></svg>'
        },
        {
            id: 2,
            name: 'Pioneer Champion Edition 12"',
            category: 'Pioneer',
            price: 1200000,
            oldPrice: 1400000,
            desc: 'Classic reliability and clear sound.',
            image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f0e6ff"/><text x="50" y="55" text-anchor="middle" font-size="20">🔊</text></svg>'
        }
    ];
    localStorage.setItem('sambufer_wh_products', JSON.stringify(wh));

    // 2. ADD SAMPLES FOR ORDERS
    const orders = [
        {
            id: 1711956000000,
            date: '01.04.2026 09:12:34',
            customer: { name: 'Alisher Karimov', phone: '+998 90 123 45 67', address: 'Nukus, Karakalpakstan ko\'ch. 8', paymentMethod: 'card', deliveryType: 'pickup' },
            items: [{ name: 'Pride Bass Pro 12"', qty: 1, price: 1500000, category: 'Pride' }],
            total: 1500000,
            status: 'sold',
            soldAt: '01.04.2026 09:15:00'
        },
        {
            id: 1711957000000,
            date: '01.04.2026 09:20:00',
            customer: { name: 'Aziz Toshmatov', phone: '+998 94 999 88 77', address: 'Nukus, Berdaq ko\'ch. 22', paymentMethod: 'uzum', deliveryType: 'home' },
            items: [{ name: 'JBL Bass Pro 10"', qty: 1, price: 950000, category: 'JBL' }],
            total: 950000,
            status: 'pending'
        }
    ];
    localStorage.setItem('sambufer_orders', JSON.stringify(orders));

    // 3. SET ADMIN AUTH
    localStorage.setItem('sambufer_admin_auth', '1');

    console.log('Seed successful! Refreshing...');
    window.location.reload();
};
seed();
