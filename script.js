(async () => {
  const status = document.getElementById("status");
  const path = window.location.pathname.replace("/", "").toLowerCase();

  try {
    const response = await fetch("database.json");
    const data = await response.json();

    if (!data[path]) {
      status.innerText = "Not Found.";
      return;
    }

    const item = data[path];

    if (item.type === "link") {
      window.location.href = item.content;
    } else if (item.type === "text" || item.type === "message") {
      status.innerText = item.content;
    } else {
      status.innerText = "Unsupported type.";
    }
  } catch (err) {
    status.innerText = "Error loading content.";
    console.error(err);
  }
})();
