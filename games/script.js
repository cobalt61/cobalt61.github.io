const contentTarget = document.getElementById("contentTarget");

function showTemplate(templateId) {
  const template = document.getElementById(templateId);
  const clone = template.content.cloneNode(true);
  contentTarget.innerHTML = ""; // Clear previous content
  contentTarget.appendChild(clone); // Add the template

  const passForm = contentTarget.querySelector("#passForm");
  const changingP = contentTarget.querySelector("#changingP");

  // Only add the listener if the form exists (i.e. it's the password-blocker template)
  if (passForm) {
    passForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Form submitted!");

      const inputValue = contentTarget.querySelector("#pass").value;
      console.log("Form input value:", inputValue);

      if (inputValue === "☜☞☝☟🖐") {
        console.log("Access granted!");
        changingP.innerText = "Access Granted";

        const d = new Date();
        d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000); // 1 day
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
}

// On page load, check for cookie
window.addEventListener("DOMContentLoaded", () => {
  if (document.cookie.includes("access=granted")) {
    showTemplate("web-content");
  } else {
    showTemplate("password-blocker");
  }
});

