(async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const status = document.getElementById('status');

  if (!id) {
    status.innerText = "Missing ?id= in the URL";
    return;
  }

  try {
    const res = await fetch('database.json');
    const data = await res.json();

    if (!data[id]) {
      status.innerText = "ID not found.";
      return;
    }

    const item = data[id];

    if (item.type === "file" || item.type === "link") {
      window.location.href = item.url;
    } else if (item.type === "text") {
      status.innerText = item.url;
    } else {
      status.innerText = "Unknown type.";
    }
  } catch (err) {
    status.innerText = "Failed to fetch database.";
  }
})();
