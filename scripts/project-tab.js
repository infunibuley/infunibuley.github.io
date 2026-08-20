document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // 1. Remove active state from all buttons
      tabButtons.forEach((b) => b.classList.remove("active"));
      // 2. Add active state to clicked button
      btn.classList.add("active");

      // 3. Hide all content panels
      tabContents.forEach((content) => content.classList.remove("active"));

      // 4. Show target section matching data-filter ID
      const targetId = btn.getAttribute("data-filter");
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });
});