let correctPassword = "";

fetch('/games/password.json')
  .then(response => response.json())
  .then(data => {
    correctPassword = data.password;
    console.log("Loaded password:", correctPassword);
  })
  .catch(error => {
    console.error("Failed to load password.json", error);
  });

const contentTarget = document.getElementById("contentTarget");

function showTemplate(templateId) {
  const template = document.getElementById(templateId);
  if (!template) {
    console.error("Template not found:", templateId);
    return;
  }

  const clone = template.content.cloneNode(true);
  contentTarget.innerHTML = ""; // Clear old content
  contentTarget.appendChild(clone);

  attachFormListener(); // <- We **attach listener AFTER** the template is inserted
}

function attachFormListener() {
  const passForm = document.getElementById("passForm");
  const passInput = document.getElementById("pass");
  const changingP = document.getElementById("changingP");

  if (!passForm || !passInput) {
    console.log("No form or input yet, skipping listener attach.");
    return;
  }

  passForm.addEventListener('submit', function (e) {
    e.preventDefault(); // e will always be correct here

    const inputValue = passInput.value.trim();
    console.log("Form input value:", inputValue);

    if (inputValue === correctPassword) {
      console.log("Access granted!");
      if (changingP) changingP.innerText = "Access Granted";

      const d = new Date();
      d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000)); // 1 day
      document.cookie = "access=granted; expires=" + d.toUTCString() + "; path=/";

      showTemplate("web-content");
    } else {
      console.log("Access denied!");
      if (changingP) changingP.innerText = "Access Denied";

      showTemplate("password-blocker");
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  if (document.cookie.includes("access=granted")) {
    showTemplate("web-content");
  } else {
    showTemplate("password-blocker");
  }
});
