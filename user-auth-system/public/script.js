// Register Form Submission
document.getElementById("registerForm").addEventListener("submit", async (e) => {
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
document.getElementById("loginForm").addEventListener("submit", async (e) => {
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
      document.getElementById("loginMessage").textContent = "Login successful! Token: " + result.token;
  } else {
      document.getElementById("loginMessage").textContent = result;
  }
});