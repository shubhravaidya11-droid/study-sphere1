document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // prevent actual submit

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const messageEl = document.getElementById("message");

  if (email === "" || password === "") {
    messageEl.textContent = "Please fill in both fields.";
    messageEl.style.color = "#d9534f";
    return;
  }

  try {
    const resp = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      messageEl.textContent = data.message || "Invalid credentials.";
      messageEl.style.color = "#d9534f";
      return;
    }

    messageEl.textContent = data.message || "Login successful!";
    messageEl.style.color = "#28a745";
    // Example: redirect after login
    // window.location.href = "work.html";
  } catch (err) {
    messageEl.textContent = "Server not reachable.";
    messageEl.style.color = "#d9534f";
    console.error(err);
  }
});
