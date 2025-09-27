import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// プロキシエンドポイント
app.get("/api/text", async (req, res) => {
  const { prompt, lang = "ja", length = 100 } = req.query;

  if (!prompt) {
    return res.status(400).json({ error: "prompt is required" });
  }

  try {
    const url = `https://text.pollinations.ai/${encodeURIComponent(
      prompt
    )}?lang=${lang}&length=${length}`;

    const response = await fetch(url);
    const text = await response.text();

    res.json({ result: text });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from Pollinations" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
