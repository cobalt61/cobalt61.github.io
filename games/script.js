let correctPassword = "";

fetch('games/password.json')
  .then(response => response.json())
  .then(data => {
    correctPassword = data.password;
    console.log("Loaded password:", correctPassword);
  })
  .catch(error => {
    console.error("Failed to load password.json", error);
  });

const contentTarget = document.getElementById("contentTarget");

function attachFormListener() {
  const passForm = document.getElementById("passForm");

  if (!passForm) {
    console.error("Password form not found!");
    return; // Exit if no form
  }

  passForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputElement = document.getElementById("pass");
    const changingP = document.getElementById("changingP");

    if (!inputElement) {
      console.error("Password input field not found!");
      return;
    }

    const inputValue = inputElement.value.trim();
    console.log("Form input value:", inputValue);

    if (inputValue === correctPassword) {
      console.log("Access granted!");
      if (changingP) changingP.innerText = "Access Granted";

      const d = new Date();
      d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000); // 1 day
      const expires = "expires=" + d.toUTCString();
      document.cookie = "access=granted;" + expires + ";path=/";

      showTemplate("web-content");
    } else {
      console.log("Access denied!");
      if (changingP) changingP.innerText = "Access Denied";

      showTemplate("password-blocker");
    }
  });
}

function showTemplate(templateId) {
  const template = document.getElementById(templateId);
  if (!template) {
    console.error("Template not found:", templateId);
    return;
  }

  const clone = template.content.cloneNode(true);
  contentTarget.innerHTML = ""; // Clear previous content
  contentTarget.appendChild(clone);

  // Important: Reattach form listener **after inserting the template**
  attachFormListener();
}

window.addEventListener("DOMContentLoaded", () => {
  if (document.cookie.includes("access=granted")) {
    showTemplate("web-content");
  } else {
    showTemplate("password-blocker");
  }
});
