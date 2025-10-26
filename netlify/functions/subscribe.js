const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, phone } = JSON.parse(event.body);

  if (!phone) {
    return { statusCode: 400, body: "Phone number is required" };
  }

  const sheetUrl = "YOUR_GOOGLE_SHEET_WEB_APP_URL"; // replace this with your Google Sheet URL

  try {
    await fetch(sheetUrl, {
      method: "POST",
      body: JSON.stringify({ name: name || "Anonymous", phone }),
      headers: { "Content-Type": "application/json" },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Number saved successfully" }),
    };
  } catch (err) {
    return { statusCode: 500, body: "Error saving number" };
  }
};
