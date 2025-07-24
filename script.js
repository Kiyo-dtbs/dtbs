// script.js
const params = new URLSearchParams(window.location.search);
const target = window.location.pathname.slice(1); // gets the path after slash

fetch("/database.json")
  .then((response) => response.json())
  .then((data) => {
    const entry = data[target];

    if (!entry) {
      document.getElementById("status").innerText = "404: Not Found";
      return;
    }

    if (entry.type === "link") {
      window.location.href = entry.content;
    } else if (entry.type === "text") {
      document.body.innerHTML = `<pre>${entry.content}</pre>`;
    } else if (entry.type === "message") {
      document.body.innerHTML = `<h2>${entry.content}</h2>`;
    } else {
      document.body.innerHTML = `<h2>Unknown content type.</h2>`;
    }
  })
  .catch((error) => {
    document.getElementById("status").innerText = "Error loading content.";
    console.error("Error loading database:", error);
  });
