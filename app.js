const baseUrlInput = document.getElementById("baseUrl");
const nameFilter = document.getElementById("nameFilter");
const btn = document.getElementById("fetchBtn");
const output = document.getElementById("output");

btn.addEventListener("click", async () => {
  const baseUrl = baseUrlInput.value.replace(/\/+$/, "");
  const params = new URLSearchParams();
  if (nameFilter.value) params.set("name", nameFilter.value);

  const url = `${baseUrl}/records?${params.toString()}`;

  output.innerHTML = `<div class="loading">Loading…</div>`;
  try {
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    output.innerHTML = `
      <div class="meta">Count: ${data.count}</div>
      <pre class="json">${JSON.stringify(data.items, null, 2)}</pre>
    `;
  } catch (err) {
    output.innerHTML = `<div class="error">Error: ${err.message}</div>`;
  }
});
