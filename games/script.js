let correctPassword = "";

fetch('password.json')
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
  const changingP = document.getElementById("changingP");

  if (passForm) {
    passForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const inputValue = document.getElementById("pass").value;
      console.log("Form input value:", inputValue);

      if (inputValue === correctPassword) {
        console.log("Access granted!");
        if (changingP) changingP.innerText = "Access Granted";

        const d = new Date();
        d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000); // 1 day from now
        const expires = "expires=" + d.toUTCString();
        document.cookie = "access=granted;" + expires + ";path=/";

        showTemplate("web-content");
      } else {
        console.log("Access denied!");
        if (changingP) changingP.innerText = "Access Denied";

        // Reload password-blocker form
        showTemplate("password-blocker");
      }
    });
  }
}

function showTemplate(templateId) {
  const template = document.getElementById(templateId);
  const clone = template.content.cloneNode(true);
  contentTarget.innerHTML = ""; // Clear previous content
  contentTarget.appendChild(clone);

  // IMPORTANT: Attach the form listener after injecting the new form
  attachFormListener();
}

// On page load
window.addEventListener("DOMContentLoaded", () => {
  if (document.cookie.includes("access=granted")) {
    showTemplate("web-content");
  } else {
    showTemplate("password-blocker");
  }
});
