document.addEventListener("DOMContentLoaded", () => {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz5A-l8_JzifixLGyEqMDVp0YNOqVtS1dtc7LdDcAC49RgSGE_G1S5hycrAUzcCF06snw/exec";
  const allForms = document.querySelectorAll("[data-survey-form]");

  allForms.forEach((form) => {
    // 1. Identify which survey this is
    const sheetInput = form.querySelector('input[name="sheet_name"]');
    const surveyId = sheetInput ? sheetInput.value : "default_survey";
    const storageKey = `survey_submitted_${surveyId}`;

    // Find sibling/child status text container
    const container = form.closest(".flex-container") || form.parentElement;
    const statusText = container.querySelector(".form-status") || form.querySelector(".form-status");

    // 2. Check if already completed this session
    if (sessionStorage.getItem(storageKey)) {
      form.style.display = "none";
      if (statusText) {
        statusText.innerText = "Thank you for submitting!";
        statusText.style.display = "block";
      }
      return;
    }

    // 3. Handle live form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerText : "Submit";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = "Submitting...";
      }

      fetch(SCRIPT_URL, {
        method: "POST",
        body: new FormData(form),
        mode: "no-cors"
      })
        .then(() => {
          // Lock the survey for this browser session
          sessionStorage.setItem(storageKey, "true");

          // Hide form and show success message
          form.style.display = "none";

          if (statusText) {
            statusText.innerText = "Yaaay, thanks for submitting!";
            statusText.style.display = "block";
          }
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
          }
          if (statusText) {
            statusText.innerText = "Aaaasefaohe the world is ending! (Something went wrong, try again later? Or contact me via email at the bottom if it continues to not work.)";
            statusText.style.display = "block";
          }
        });
    });
  });
});