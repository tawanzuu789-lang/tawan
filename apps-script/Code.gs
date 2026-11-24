/**
 * Cloud & Cove demo backend.
 *
 * Setup:
 * 1. Create a Google Sheet.
 * 2. Add a sheet named "Orders" with headers:
 *    timestamp, orderId, customerName, email, product, quantity, total, status
 * 3. In Extensions > Apps Script, paste this file and deploy as a Web app
 *    (Execute as: Me, Who has access: Anyone).
 * 4. Set the deployed web app URL in script.js.
 */

function doGet(e) {
  const action = e && e.parameter ? e.parameter.action : "";

  if (action === "orders") {
    return jsonResponse(listOrders());
  }

  return jsonResponse({ ok: true, name: "Cloud & Cove" });
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    if (body.action === "order") {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Orders");
      if (!sheet) throw new Error('Missing "Orders" sheet');

      const orderId = "CC-" + Utilities.getUuid().slice(0, 8).toUpperCase();
      sheet.appendRow([
        new Date(),
        orderId,
        body.customerName || "",
        body.email || "",
        body.product || "",
        body.quantity || 1,
        body.total || 0,
        "New"
      ]);

      return jsonResponse({ ok: true, orderId: orderId });
    }

    return jsonResponse({ ok: false, error: "Unknown action" });
  } catch (error) {
    return jsonResponse({ ok: false, error: error.message });
  }
}

function listOrders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Orders");
  if (!sheet) return [];

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  return values.slice(1).reverse().map(row => ({
    timestamp: row[0],
    orderId: row[1],
    customerName: row[2],
    email: row[3],
    product: row[4],
    quantity: row[5],
    total: row[6],
    status: row[7]
  }));
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
