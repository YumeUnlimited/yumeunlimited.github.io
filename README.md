# Yume Unlimited Website

Official site of **Yume Unlimited**, a small PC game studio. Static site, no build step.

## Pages

| URL | File | Language |
| --- | --- | --- |
| `yumeunlimited.com/` | `index.html` | English (default) |
| `yumeunlimited.com/ja/` | `ja/index.html` | Japanese / 日本語 |

The language dropdown in the header (and the link in the footer) moves between the two pages and keeps the
current section, e.g. `/#bookshop` ↔ `/ja/#bookshop`. Each page has its own title, description and link
preview (Open Graph), and `hreflang` tags tell search engines the two pages are translations of each other.

**When you change any text, change it on both pages.**

## Files

- `index.html`, `ja/index.html` — page content (the Japanese page loads files with `../`)
- `ja.html` — redirects the old Japanese URL (`/ja.html`) to `/ja/`
- `styles.css` — shared styles
- `script.js` — shared behavior: language switch, mobile menu, contact form, screenshot viewer
- `assets/` — logo, key art, screenshots, gameplay clips, favicon
  - `burger-*` — Burger Factory Simulator (from its Steam store page)
  - `bookshop-*` — Bookshop Simulator (from its Steam store page)
  - `yume-logo-ondark.png` — transparent, lightened logo for dark backgrounds
- `CNAME` — custom domain for GitHub Pages (`yumeunlimited.com`)
- `.nojekyll` — turns off GitHub Pages' Jekyll processing

## Preview

Open `index.html` in a browser. The language switch also works when opened from disk.
The contact form opens the visitor's email app, addressed to `yumeunlimited@gmail.com`.

## Deploy (GitHub Pages)

1. Put the contents of this folder (including the `ja/` folder) at the root of the published repository.
2. In the repository's **Settings → Pages**, choose the branch/folder to publish.
3. Without a custom domain, delete `CNAME` and the site is served at `<username>.github.io`.
