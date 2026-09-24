document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  let projectId = params.get("id");

  if (!projectId) {
    const pathParts = window.location.pathname.replace(/\/$/, "").split("/");
    const rawFile = pathParts[pathParts.length - 1] || "";
    projectId = rawFile.replace(".html", "").toLowerCase();
  }

  if (!projectId) return;

  // 1. Fetch project metadata
  fetch("../data/projects.json")
    .then((res) => {
      if (!res.ok) throw new Error("Could not load projects.json");
      return res.json();
    })
    .then((projects) => {
      const project = projects.find((p) => p.id && p.id.toLowerCase() === projectId.toLowerCase());

      if (project) {
        document.title = `${project.title}: survey — infunibuley`;
        
        const projLink = document.getElementById("project-link");
        if (projLink) {
          projLink.textContent = project.title;
          projLink.href = `https://infunibuley.github.io/pages/project?id=${project.id}`;
        }

        const headingTitle = document.getElementById("form-heading-title");
        if (headingTitle) headingTitle.textContent = project.title;

        const sheetInput = document.getElementById("sheet-name-input");
        if (sheetInput) sheetInput.value = project.id;

        // Check if the survey is closed (Stage is not 3)
        const isOpen = Number(project.stage) === 3;
        if (!isOpen) {
          disableSurvey(project);
          return;
        }
      }

      // 2. Fetch project question HTML snippet from its folder
      loadProjectQuestions(projectId);
    })
    .catch((err) => {
      console.warn("Could not fetch project metadata:", err);
      loadProjectQuestions(projectId);
    });
});

function loadProjectQuestions(projectId) {
  // Folder convention: data/projects/{id}/{id}-survey.html
  const questionUrl = `../data/projects/${projectId}/${projectId}-survey.html`;

  fetch(questionUrl)
    .then((res) => {
      if (!res.ok) throw new Error(`Survey file not found at ${questionUrl}`);
      return res.text();
    })
    .then((htmlSnippet) => {
      const questionsContainer = document.getElementById("survey-questions-container");
      if (questionsContainer) {
        questionsContainer.innerHTML = htmlSnippet;
      }
    })
    .catch((err) => {
      console.error(err);
      const questionsContainer = document.getElementById("survey-questions-container");
      if (questionsContainer) {
        questionsContainer.innerHTML = "<p style='color: #8c826e;'>No custom survey questions found for this project.</p>";
      }
    });
}

function disableSurvey(project) {
  const questionsContainer = document.getElementById("survey-questions-container");
  const submitBtn = document.getElementById("survey-submit-btn");

  if (submitBtn) submitBtn.style.display = "none";
  if (questionsContainer) {
    questionsContainer.innerHTML = `
      <div style="text-align: center; padding: 20px; border: 1px dashed #3b3329; border-radius: 6px;">
        <p style="color: #d4cebe; font-size: 1.1rem; margin-bottom: 6px;">This survey is currently closed.</p>
        <p style="color: #8c826e; font-size: 0.9rem; margin: 0;">Responses were closed when the project entered Stage 4.</p>
      </div>
    `;
  }
}