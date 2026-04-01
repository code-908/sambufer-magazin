const fs = require('fs');
const path = 'c:/Users/user/Desktop/sambufer/app.js';
let content = fs.readFileSync(path, 'utf8');

const startBody = "let design = '';";
const endBody = "return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));";

const startIndex = content.indexOf(startBody);
const endIndex = content.indexOf(endBody);

if (startIndex === -1 || endIndex === -1) {
    console.error('Anchors not found');
    process.exit(1);
}

const newBodyPart = `
    if (style === 0 || style === 5) {
        design = \`<circle cx="150" cy="142" r="120" fill="none" stroke="\${accent}" stroke-width="12" opacity="0.4"/>
                  <circle cx="150" cy="142" r="95" fill="none" stroke="\${ring}" stroke-width="1" opacity="0.5"/>
                  <circle cx="150" cy="142" r="40" fill="#111" stroke="\${accent}" stroke-width="3"/>\`;
    } else if (style === 1 || style === 6) {
        design = \`\${[0, 60, 120, 180, 240, 300].map(a => \`<line x1="150" y1="142" x2="\${150 + Math.cos(a * Math.PI / 180) * 125}" y2="\${142 + Math.sin(a * Math.PI / 180) * 125}" stroke="\${ring}" stroke-width="2" opacity="0.3"/>\`).join('')}
                  <circle cx="150" cy="142" r="30" fill="\${accent}"/>\`;
    } else if (style === 2 || style === 7) {
        design = \`<rect x="35" y="27" width="230" height="230" rx="15" fill="none" stroke="\${accent}" stroke-width="6" opacity="0.3"/>
                  <circle cx="150" cy="142" r="45" fill="#050505" stroke="\${accent}" stroke-width="2"/>\`;
    } else {
        design = \`<circle cx="150" cy="142" r="125" fill="none" stroke="\${accent}" stroke-width="2" opacity="0.6"/>
                  \${Array.from({ length: 8 }).map((_, i) => \`<circle cx="\${150 + Math.cos(i * 45 * Math.PI / 180) * 135}" cy="\${142 + Math.sin(i * 45 * Math.PI / 180) * 135}" r="6" fill="#222" stroke="\${ring}" stroke-width="1"/>\`).join('')}
                  <circle cx="150" cy="142" r="25" fill="\${accent}"/>\`;
    }

    const svg = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
        <defs>
            <pattern id="\${pid}" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                <path d="M0 0h2v2H0zM2 2h2v2H2z" fill="#181818"/><path d="M2 0h2v2H2zM0 2h2v2H0z" fill="#0f0f0f"/>
            </pattern>
            <radialGradient id="\${gid}" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                <stop offset="0%" stop-color="#444"/><stop offset="100%" stop-color="#000"/>
            </radialGradient>
        </defs>
        <rect width="300" height="300" fill="\${bg}"/>
        <circle cx="150" cy="142" r="135" fill="url(#\${gid})" stroke="#333" stroke-width="1"/>
        <circle cx="150" cy="142" r="125" fill="url(#\${pid})" opacity="0.7"/>
        \${design}
        <ellipse cx="110" cy="90" rx="60" ry="30" fill="white" opacity="0.07" transform="rotate(-35, 110, 90)"/>
        <rect x="0" y="270" width="300" height="30" fill="\${accent}"/>
        <text x="12" y="290" font-family="Arial Black, sans-serif" font-size="14" font-weight="900" fill="white" style="text-shadow:1px 1px 2px rgba(0,0,0,0.4)">\${category.toUpperCase()}</text>
        <rect x="250" y="275" width="42" height="20" rx="4" fill="rgba(255,255,255,0.2)"/>
        <text x="271" y="289" font-family="Arial Black, sans-serif" font-size="12" font-weight="900" fill="white" text-anchor="middle">\${size}</text>
    </svg>\`;

    `;

const finalContent = content.substring(0, startIndex + startBody.length) + newBodyPart + content.substring(endIndex);
fs.writeFileSync(path, finalContent);
console.log('Successfully updated app.js');
