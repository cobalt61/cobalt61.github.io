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

function showTemplate(templateId) {
  const template = document.getElementById(templateId);
  const clone = template.content.cloneNode(true);
  contentTarget.innerHTML = ""; // Clear previous content
  contentTarget.appendChild(clone);

  // Now that the content is in the DOM, you can access changingP
  const changingP = document.getElementById("changingP");

  // Attach event listener after the template is rendered
  const passForm = document.getElementById("passForm");
  passForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputValue = document.getElementById("pass").value;
    console.log("Form input value:", inputValue);

    if (inputValue === correctPassword) {
      console.log("Access granted!");
      changingP.innerText = "Access Granted";

      const d = new Date();
      d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000); // 1 day from now
      const expires = "expires=" + d.toUTCString();
      document.cookie = "access=granted;" + expires + ";path=/";

      showTemplate("web-content");
    } else {
      console.log("Access denied!");
      changingP.innerText = "Access Denied";
      showTemplate("password-blocker");
    }
  });
}

// On page load, check for cookie
window.addEventListener("DOMContentLoaded", () => {
  if (document.cookie.includes("access=granted")) {
    showTemplate("web-content");
  } else {
    showTemplate("password-blocker");
  }
});
