fetch("database.json")
  .then(res => res.json())
  .then(data => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const entry = data[id];

    if (!entry) {
      document.getElementById("status").textContent = "Invalid ID.";
      return;
    }

    if (entry.type === "link") {
      window.location.href = entry.url;
    } else if (entry.type === "text") {
      const decoded = atob(entry.url);
      document.body.innerHTML = `<pre>${decoded}</pre>`;
    } else if (entry.type === "file") {
      window.location.href = entry.url;
    } else {
      document.getElementById("status").textContent = "Unknown type.";
    }
  });
