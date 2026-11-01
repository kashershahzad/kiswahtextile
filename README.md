# Kiswah Textile website
Static site (HTML, CSS, vanilla JS). No build step, no paid plan, no custom domain needed.

## Structure
- `index.html` page layout · `css/style.css` styling · `js/main.js` catalogue logic
- `js/products.js` ALL product data + WhatsApp number + social links (edit this file)
- `assets/images/products/` full posters · `.../thumbs/` card crops · `assets/images/brand/` logo + favicon

## Open locally
Double-click `index.html`.

## Set WhatsApp number and social links
Open `js/products.js`. Change `WHATSAPP_NUMBER` (digits only, with country code, e.g. `923001234567`) and fill `SOCIAL` URLs. Until a real number is set, WhatsApp buttons show a message instead of opening WhatsApp.

## Add or change a design
Copy one object in `PRODUCTS`, change `id`, `code`, `brand`, `fabric`, `category`, `details`. Add images: full poster in `assets/images/products/`, card crop in `assets/images/products/thumbs/`. Add `price: "Rs. ..."` only when you want a price shown. Filters build themselves from the data.
Poster wording was copied as printed (including spellings such as "Valvet"); fix them in `details` if you want.

## Publish free on GitHub Pages
1. Create a free account at github.com, click **New repository**, name it e.g. `kiswah-textile`, set **Public**, click **Create repository**.
2. Click **uploading an existing file**, drag in ALL files and folders from this project (index.html at the top level), click **Commit changes**.
3. Go to **Settings > Pages**. Under **Branch** choose `main` and `/ (root)`, click **Save**.
4. After a minute your site is at `https://YOUR-USERNAME.github.io/kiswah-textile/`.
Netlify alternative: app.netlify.com/drop, drag the project folder in, get a free `.netlify.app` URL.
All paths are relative, so the site works under a project subpath.
