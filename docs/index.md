# Shoaib Aftab Icons - Documentation

## Introduction
A standalone Icon Library with **zero dependencies**. This library contains 500+ standard icons and brand logos in full color. 

## Installation

### Using NPM
```bash
npm install @shoaib-aftab/icons
```
Import in your CSS:
```css
@import '@shoaib-aftab/icons/dist/sa-icons.min.css';
```

### Using CDN
```html
<link rel="stylesheet" href="https://unpkg.com/@shoaib-aftab/icons/dist/sa-icons.min.css">
```

---

## Code Examples

### 1. Standard Icons
Standard icons support Outline, Solid, Two-Tone, and Color variants. They also support Round and Square shapes.

```html
<!-- Outline Round -->
<i class="sa-i-home sa-i-outline sa-i-round"></i>

<!-- Solid Square -->
<i class="sa-i-user sa-i-solid sa-i-square"></i>
```

### 2. Brand Icons
Brand icons contain their **original colored logos**.

```html
<!-- Original Color, Round Background -->
<i class="sa-i-whatsapp sa-i-original sa-i-round"></i>

<!-- Original Color, Square Background -->
<i class="sa-i-facebook sa-i-original sa-i-square"></i>

<!-- Black & White, Round Background -->
<i class="sa-i-google sa-i-bw sa-i-round"></i>
```

### 3. Sizing
You can change the size using utility classes:

```html
<i class="sa-i-home sa-i-sm"></i>  <!-- Small -->
<i class="sa-i-home sa-i-md"></i>  <!-- Medium -->
<i class="sa-i-home sa-i-lg"></i>  <!-- Large -->
<i class="sa-i-home sa-i-xl"></i>  <!-- Extra Large -->
```

### 4. RTL Support
Icons like arrows automatically flip in RTL mode.

```html
<html dir="rtl">
  <!-- This arrow will point right instead of left automatically -->
  <i class="sa-i-arrow-left"></i>
</html>
```

## Styling
All icons use `currentColor` for Outline and Solid variants, meaning they inherit the text color of their parent element. Original brand icons retain their true colors.

```html
<div class="sa-text-danger-500">
  <i class="sa-i-heart sa-i-solid"></i> <!-- Heart will be red -->
</div>
```
