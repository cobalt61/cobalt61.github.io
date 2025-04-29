let correctPassword = "";

function decodeBase64(str) {
  return atob(str);
}

fetch('https://raw.githubusercontent.com/cobalt61/cobalt61.github.io/main/games/password.json')

  .then(response => response.json())
  .then(data => {
    correctPassword = decodeBase64(data.password);
    console.log("Loaded password:", correctPassword);
  })
  .catch(error => {
    console.error("Failed to load password.json", error);
  });

const contentTarget = document.getElementById("contentTarget");

function attachFormListener() {
  const passForm = document.getElementById("passForm");
  const changingP = document.getElementById("changingP");

  if (!passForm) return; // Exit if no form (safety check)

  passForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputValue = document.getElementById("pass").value;
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

      showTemplate("password-blocker"); // Reloads form after fail
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

  attachFormListener(); // After inserting the new form, reattach the event listener
}

window.addEventListener("DOMContentLoaded", () => {
  if (document.cookie.includes("access=granted")) {
    showTemplate("web-content");
  } else {
    showTemplate("password-blocker");
  }
});
