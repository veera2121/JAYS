const path = require("path");
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Static files in public and products
app.use(express.static("public"));
app.use("/products", express.static("products"));

// Serve index.html on root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve 3droom.html from root folder
app.get("/3droom", (req, res) => {
  res.sendFile(path.join(__dirname, "3droom.html"));
});

// API to get images
app.get("/api/images/:folder", (req, res) => {
  const folder = req.params.folder;
  const folderPath = path.join(__dirname, "products", folder);

  if (!fs.existsSync(folderPath)) {
    return res.status(404).json({ error: "Folder not found" });
  }

  const files = fs.readdirSync(folderPath);
  const images = files
    .filter(file => /\.(png|jpg|jpeg|gif)$/i.test(file))
    .map(file => `/products/${folder}/${file}`);

  if (images.length === 0) {
    return res.status(404).json({ error: "No images found in folder" });
  }

  res.json(images);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
