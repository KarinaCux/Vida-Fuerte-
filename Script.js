
// id="providers"
// id="location"
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, "frontend")));
app.use("/icons", express.static(path.join(__dirname, "icons")));


// home redirects to  front page
app.get("/", (req, res) => {
  res.redirect("/frontPage.html");
});


app.get("/api/search", async (req, res) => {
console.log("🔥 /api/search route HIT");
  const q = (req.query.q || "").trim();
  const near = (req.query.near || "").trim();

  if (!q || !near) {
    return res.json({ results: [] });
  }

  // NPPES (public provider registry)
  const url = new URL("https://npiregistry.cms.hhs.gov/api/");
  url.searchParams.set("version", "2.1");
  url.searchParams.set("limit", "10");
  url.searchParams.set("city", near);
  url.searchParams.set("organization_name", `${q}*`);

  try {
    const response = await fetch(url);
    const data = await response.json();

    const results = (data.results || []).map((r) => {
      const basic = r.basic || {};
      const addr = (r.addresses || [])[0] || {};

      return {
        name: basic.organization_name || `${basic.first_name || ""} ${basic.last_name || ""}`.trim(),
        address: `${addr.address_1 || ""}, ${addr.city || ""}, ${addr.state || ""}`.trim(),
        phone: addr.telephone_number || ""
      };
    });

    res.json({ results });
  } catch (err) {
    console.log("API error:", err);
    res.json({ results: [] });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running: http://localhost:${PORT}`);
});
