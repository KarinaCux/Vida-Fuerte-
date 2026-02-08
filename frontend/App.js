const form = document.getElementById("searchForm");
const statusDiv = document.getElementById("status");
const resultsDiv = document.getElementById("results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const q = document.getElementById("providers").value.trim();
  const near = document.getElementById("location").value.trim();

  statusDiv.textContent = "Searching...";
  resultsDiv.innerHTML = "";

  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&near=${encodeURIComponent(near)}`);
    const data = await res.json();

    statusDiv.textContent = "";

    if (!data.results || data.results.length === 0) {
      resultsDiv.innerHTML = "<p>No results found. Try another search.</p>";
      return;
    }

    data.results.forEach((item) => {
      const card = document.createElement("div");
      card.className = "result-card";

      card.innerHTML = `
        <h3>${item.name || "Unknown"}</h3>
        ${item.address ? `<p><b>Address:</b> ${item.address}</p>` : ""}
        ${item.phone ? `<p><b>Phone:</b> ${item.phone}</p>` : ""}
      `;

      resultsDiv.appendChild(card);
    });
  } catch (err) {
    statusDiv.textContent = "";
    resultsDiv.innerHTML = "<p>Something went wrong.</p>";
    console.log(err);
  }
});
