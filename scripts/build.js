const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');

const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const cssPath = path.join(srcDir, 'sa-icons.css');
if (fs.existsSync(cssPath)) {
  const content = fs.readFileSync(cssPath, 'utf8');
  
  let finalCSS = `/*
 * Shoaib Aftab Icons
 * Version: 1.0.0
 * Description: 500+ standard and brand SVGs with zero dependencies.
 * License: MIT
 * Copyright (c) 2024 Shoaib Aftab Tech
 */\n\n`;

  finalCSS += content;

  fs.writeFileSync(path.join(distDir, 'sa-icons.css'), finalCSS);

  const minified = new CleanCSS().minify(finalCSS);
  fs.writeFileSync(path.join(distDir, 'sa-icons.min.css'), `/* Shoaib Aftab Icons v1.0.0 | MIT License | (c) 2024 Shoaib Aftab Tech */\n` + minified.styles);
  
  console.log('Build completed successfully!');
} else {
  console.error('sa-icons.css not found. Please run generate_icons.js first.');
}
