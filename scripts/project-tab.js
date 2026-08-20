document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      tabContents.forEach((content) => content.classList.remove("active"));

      const targetId = btn.getAttribute("data-filter");
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });
});

function copySurveyLink() {
  const linkInput = document.getElementById("survey-link-input");
  const feedback = document.getElementById("copy-feedback");

  if (!linkInput) return;

  // Copy to clipboard
  navigator.clipboard.writeText(linkInput.value).then(() => {
    if (feedback) {
      feedback.style.display = "block";
      setTimeout(() => {
        feedback.style.display = "none";
      }, 2500);
    }
  }).catch((err) => {
    console.error("Failed to copy link: ", err);
  });
}