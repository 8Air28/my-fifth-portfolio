const express = require("express");
const path = require("path");

const app = express();

// publicフォルダの静的ファイルを提供
app.use(express.static(path.join(__dirname, "public")));

// ルートアクセスで index.html を返す
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
