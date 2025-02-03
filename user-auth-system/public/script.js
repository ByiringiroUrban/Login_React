// Register Form Submission
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;

  const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
  });

  const result = await response.text();
  document.getElementById("registerMessage").textContent = result;
});

// Login Form Submission
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
  });

  const result = await response.json();
  if (response.ok) {
      localStorage.setItem("token", result.token);
      window.location.href = "/"; // Redirect to homepage after login
  } else {
      document.getElementById("loginMessage").textContent = result;
  }
});

// Logout Button
document.getElementById("logoutButton")?.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/login.html"; // Redirect to login page
});

// Show logout button if logged in
const token = localStorage.getItem("token");
if (token) {
  document.getElementById("logoutButton").style.display = "block";
}