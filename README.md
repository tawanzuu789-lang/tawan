# Cloud & Cove Soap Dish Store

A responsive storefront and lightweight admin dashboard for a ceramic soap dish collection.

## Run locally

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 4173
```

Visit `http://localhost:4173`.

## Pages

- `index.html` — storefront
- `admin.html` — orders and store overview
- `apps-script/Code.gs` — optional Google Sheets order backend

## Connect Google Sheets

1. Create a Google Sheet and add an **Orders** tab.
2. Add these headers in row 1:
   `timestamp, orderId, customerName, email, product, quantity, total, status`
3. Open **Extensions → Apps Script**, paste in `apps-script/Code.gs`, and deploy as a Web app.
4. Set **Execute as** to yourself and **Who has access** to **Anyone**.
5. Use the deployed web app URL from your store integration.