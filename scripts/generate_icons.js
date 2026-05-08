const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');
const lucideDir = path.join(__dirname, '../node_modules/lucide-static/icons');
const simpleIcons = require('simple-icons');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

let cssContent = `/* Shoaib Aftab Icons - Zero Dependencies */
.sa-icon {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  vertical-align: middle;
}

/* Sizing Utilities */
.sa-i-sm { width: 1rem; height: 1rem; }
.sa-i-md { width: 1.5rem; height: 1.5rem; }
.sa-i-lg { width: 2rem; height: 2rem; }
.sa-i-xl { width: 2.5rem; height: 2.5rem; }

/* Base Shape Variables */
.sa-icon {
  --sa-icon-bg: transparent;
  --sa-icon-color: currentColor;
  --sa-icon-radius: 0;
  --sa-icon-padding: 0;
  border-radius: var(--sa-icon-radius);
  background-color: var(--sa-icon-bg);
  padding: var(--sa-icon-padding);
}

/* Shapes */
.sa-i-round { --sa-icon-radius: 50%; --sa-icon-padding: 0.25em; --sa-icon-bg: #f3f4f6; }
.sa-i-square { --sa-icon-radius: 0.25rem; --sa-icon-padding: 0.25em; --sa-icon-bg: #f3f4f6; }

/* RTL support for standard arrows */
[dir="rtl"] .sa-i-arrow-left,
[dir="rtl"] .sa-i-chevron-left { transform: scaleX(-1); }
[dir="rtl"] .sa-i-arrow-right,
[dir="rtl"] .sa-i-chevron-right { transform: scaleX(-1); }

/* SVG Encoding Helper inside CSS */
`;

function encodeSVG(svg) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg.replace(/>\s+</g, '><'));
}

// ---------------------------------------------------------
// 1. STANDARD ICONS (from Lucide)
// ---------------------------------------------------------
const lucideFiles = fs.readdirSync(lucideDir).filter(f => f.endsWith('.svg'));
// Take the first 550 standard icons
const standardFiles = lucideFiles.slice(0, 550);

for (const file of standardFiles) {
  const name = path.basename(file, '.svg');
  let svgContent = fs.readFileSync(path.join(lucideDir, file), 'utf8');
  
  let solidSvg = svgContent.replace(/fill="none"/, 'fill="currentColor"');

  const encodedOutline = encodeSVG(svgContent);
  const encodedSolid = encodeSVG(solidSvg);

  cssContent += `
.sa-i-${name} {
  -webkit-mask: url('${encodedOutline}') no-repeat center / contain;
  mask: url('${encodedOutline}') no-repeat center / contain;
  background-color: var(--sa-icon-color);
}
.sa-i-${name}.sa-i-solid {
  -webkit-mask: url('${encodedSolid}') no-repeat center / contain;
  mask: url('${encodedSolid}') no-repeat center / contain;
}
`;
}

// ---------------------------------------------------------
// 2. BRAND ICONS (from Simple Icons)
// ---------------------------------------------------------
const topBrands = [
  'google', 'facebook', 'whatsapp', 'apple', 'microsoft', 'amazon', 'netflix', 'spotify',
  'paypal', 'visa', 'mastercard', 'twitter', 'x', 'instagram', 'linkedin', 'youtube',
  'telegram', 'tiktok', 'github', 'gitlab', 'discord', 'slack', 'wordpress', 'react',
  'vue', 'angular', 'node', 'python', 'docker', 'aws', 'figma', 'framer', 'adobe',
  'stripe', 'shopify', 'trello', 'jira', 'confluence', 'dropbox', 'googlecloud',
  'firebase', 'supabase', 'vercel', 'netlify', 'cloudflare', 'digitalocean',
  'ubuntu', 'windows', 'android', 'ios', 'chrome', 'firefox', 'safari', 'edge',
  'brave', 'opera', 'zoom', 'skype', 'teams', 'meet', 'webex', 'canva', 'sketch',
  'invision', 'zeplin', 'miro', 'notion', 'evernote', 'todoist', 'asana', 'monday',
  'clickup', 'salesforce', 'hubspot', 'mailchimp', 'sendgrid', 'twilio', 'stripe',
  'square', 'wechat', 'line', 'viber', 'signal', 'snapchat', 'pinterest', 'reddit',
  'tumblr', 'medium', 'devto', 'stackoverflow', 'codepen', 'codesandbox', 'jsfiddle',
  'replit', 'glitch', 'heroku', 'render', 'fly', 'railway', 'supabase', 'appwrite',
  'laravel', 'django', 'spring', 'rubyonrails', 'express', 'fastapi', 'flask',
  'nestjs', 'nextjs', 'nuxtjs', 'svelte', 'solidjs', 'qwik', 'astro', 'gatsby'
];

// SimpleIcons v13 uses dynamic import or properties off the main export
for (const brandSlug of topBrands) {
  // Try to find the icon matching the slug
  // The object keys are usually uppercase/camelcase
  const iconKey = Object.keys(simpleIcons).find(k => k.toLowerCase() === 'si' + brandSlug.replace(/[^a-z0-9]/g, ''));
  
  if (iconKey && simpleIcons[iconKey]) {
    const icon = simpleIcons[iconKey];
    const originalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#${icon.hex}"><path d="${icon.path}"/></svg>`;
    const bwSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="${icon.path}"/></svg>`;

    const encodedOriginal = encodeSVG(originalSvg);
    const encodedBw = encodeSVG(bwSvg);

    cssContent += `
.sa-i-${brandSlug} {
  background-image: url('${encodedOriginal}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.sa-i-${brandSlug}.sa-i-bw {
  background-image: none;
  -webkit-mask: url('${encodedBw}') no-repeat center / contain;
  mask: url('${encodedBw}') no-repeat center / contain;
  background-color: var(--sa-icon-color);
}
`;
  }
}

fs.writeFileSync(path.join(srcDir, 'sa-icons.css'), cssContent);
console.log(`Generated ${standardFiles.length} standard icons and available brand icons successfully.`);
