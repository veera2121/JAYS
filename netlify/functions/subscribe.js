const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, phone } = JSON.parse(event.body);

  if (!phone) {
    return { statusCode: 400, body: "Phone number is required" };
  }

 const sheetUrl = "https://script.google.com/macros/s/AKfycbyzJEZ1UcjqIhQqf65k5KBiIcFjALd6MPwMAzbe1ilylQV8Yut4j2miLE6NhKVSId2e/exec";

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
