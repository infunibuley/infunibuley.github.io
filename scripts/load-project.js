// Mapping stage numbers (1-5) to JSON date keys and container targets
const STAGE_CONFIG = {
  1: { key: "napkin_blueprints", panelId: "mind-works", bodyId: "stage-body-1" },
  2: { key: "ancient_scrolls", panelId: "the-gears", bodyId: "stage-body-2" },
  3: { key: "calling_all_echoes", panelId: "your-sticks", bodyId: "stage-body-3" },
  4: { key: "cranking_the_dials", panelId: "fancy-stuff", bodyId: "stage-body-4" },
  5: { key: "the_final_verdict", panelId: "complete", bodyId: "stage-body-5" }
};

document.addEventListener("DOMContentLoaded", () => {
  setupTabClickHandlers();

  // Reset tab scroll container to the left edge
  const tabContainer = document.querySelector(".tab-container");
  if (tabContainer) {
    tabContainer.scrollLeft = 0;
  }

  // 1. Get project ID from query parameter (?id=nsduh-eda) or pathname fallback
  const params = new URLSearchParams(window.location.search);
  let projectId = params.get("id");

  if (!projectId) {
    const pathParts = window.location.pathname.replace(/\/$/, "").split("/");
    const rawFile = pathParts[pathParts.length - 1] || "";
    projectId = rawFile.replace(".html", "").toLowerCase();
  }

  if (!projectId) return;

  // 2. Fetch project metadata (dates, stage number) from projects.json
  fetch("../data/projects.json")
    .then((res) => {
      if (!res.ok) throw new Error("Could not load projects.json");
      return res.json();
    })
    .then((projects) => {
      const project = projects.find(
        (p) => p.id && p.id.toLowerCase() === projectId.toLowerCase()
      );

      if (project) {
        setupProjectStages(project);
        // Pass the project object so markdown parsing can check for "N/A" surveys
        loadProjectMarkdown(projectId, project);
      } else {
        activateDefaultTab();
        loadProjectMarkdown(projectId, null);
      }
    })
    .catch((err) => {
      console.warn("Error initializing project:", err);
      activateDefaultTab();
      loadProjectMarkdown(projectId, null);
    });
});

// Fetches and parses the markdown file, passing along project metadata
function loadProjectMarkdown(projectId, project) {
  const mdUrl = `../data/projects/${projectId}/${projectId}.md`;

  fetch(mdUrl)
    .then((res) => {
      if (!res.ok) throw new Error(`Markdown file not found at ${mdUrl}`);
      return res.text();
    })
    .then((mdText) => {
      parseAndPopulateMarkdown(mdText, projectId, project);
    })
    .catch((err) => {
      console.error("Failed to load markdown content:", err);
    });
}

// Splits markdown by stage headers and fills DOM containers
function parseAndPopulateMarkdown(markdown, projectId, project) {
  const GITHUB_BASE = "https://github.com/infunibuley/infunibuley.github.io/blob/main";
  const GITHUB_TREE = "https://github.com/infunibuley/infunibuley.github.io/tree/main";

  // 1. Extract Main Title (# Title)
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    const titleText = titleMatch[1].trim();
    document.title = `${titleText} | infunibuley`;
    const titleEl = document.getElementById("project-header-title");
    if (titleEl) titleEl.textContent = titleText;
  }

  // 2. Dynamic link to the specific project folder in the GitHub repo
  const folderLink = document.getElementById("project-folder-link");
  if (folderLink) {
    folderLink.href = `${GITHUB_TREE}/data/projects/${projectId}/${projectId}.md`;
  }

  // Check if Stage 3 has a valid survey (i.e. date is not "N/A")
  const stage3Config = STAGE_CONFIG[3];
  const stage3Date = (project && stage3Config && project[stage3Config.key]) || "TBD";
  const stage3HasSurvey = stage3Date !== "N/A";

  // 3. Setup Stage 3 dynamic survey components only if survey exists
  if (stage3HasSurvey) {
    const surveyUrl = `https://infunibuley.github.io/pages/survey?id=${projectId}`;
    const surveyActionLink = document.getElementById("survey-action-link");
    const surveyInput = document.getElementById("survey-link-input");
    const qrImage = document.getElementById("survey-qr-img");

    if (surveyActionLink) surveyActionLink.href = surveyUrl;
    if (surveyInput) surveyInput.value = surveyUrl;
    if (qrImage) {
      qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(surveyUrl)}&bgcolor=24-1f-19&color=b2-c9-a5`;
    }
  }

  // 4. Split by Stage headers: ## [1-5].
  const sections = markdown.split(/^##\s+[1-5]\.\s+.*$/m);

  for (let i = 1; i <= 5; i++) {
    const rawContent = (sections[i] || "").trim();
    const config = STAGE_CONFIG[i];
    const bodyEl = document.getElementById(config.bodyId);

    if (!bodyEl) continue;

    // Convert markdown content to HTML
    let parsedHtml = "";
    if (rawContent && rawContent.toUpperCase() !== "N/A") {
      parsedHtml = typeof marked !== "undefined" ? marked.parse(rawContent) : `<p>${rawContent}</p>`;
    } else if (i !== 3 && i !== 4) {
      parsedHtml = "<p>No notes written for this stage yet.</p>";
    }

    // Stage 4: Inject Jupyter Notebook GitHub View Link
    if (i === 4) {
      const notebookGithubUrl = `${GITHUB_BASE}/data/projects/${projectId}/${projectId}.ipynb`;
      
      const notebookCallout = `
        <div class="notebook-action-card" style="margin-bottom: 20px; padding: 14px 18px; border: 1px dashed #3b3329; border-radius: 6px; background-color: rgba(0, 0, 0, 0.15);">
          <p style="margin: 0 0 10px 0; font-size: 0.95rem; color: #d4cebe;">Interactive code, statistical charts, and analysis models are available in the Jupyter Notebook.</p>
          <a href="${notebookGithubUrl}" target="_blank" rel="noopener noreferrer" class="survey-start-btn" style="display: inline-block; text-decoration: none;">
             View Notebook on GitHub
          </a>
        </div>
      `;

      bodyEl.innerHTML = notebookCallout + parsedHtml;
      continue;
    }

    // Stage 3: Handle survey card visibility
    if (i === 3) {
      const surveyCard = bodyEl.querySelector(".survey-action-card");
      bodyEl.innerHTML = parsedHtml;
      
      if (stage3HasSurvey) {
        if (surveyCard) bodyEl.appendChild(surveyCard);
      } else {
        // Remove the survey container completely if no survey exists for this project
        if (surveyCard) surveyCard.remove();
      }
      continue;
    }

    bodyEl.innerHTML = parsedHtml;
  }
}

// Stage lock and date indicators
function setupProjectStages(project) {
  const currentStageNum = Number(project.stage) || 1;
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabContents.forEach((panel) => {
    const stageNum = Number(panel.getAttribute("data-stage"));
    const stageInfo = STAGE_CONFIG[stageNum];
    const stageDate = (stageInfo && project[stageInfo.key]) || "TBD";
    const surveyExists = stageDate !== "N/A";
    const bodyContainer = panel.querySelector(".stage-body");

    // Remove previously injected status elements
    panel.querySelectorAll(".stage-status-msg, .future-lock-box").forEach((el) => el.remove());

if (stageNum < currentStageNum) {
      // Previous stages
      if (bodyContainer) bodyContainer.style.display = "block";
      const dateTag = document.createElement("p");
      dateTag.className = "stage-status-msg completed-date";
      dateTag.innerText = stageDate;
      panel.insertBefore(dateTag, bodyContainer);

    } else if (stageNum === currentStageNum) {
      // Active current stage
      if (bodyContainer) bodyContainer.style.display = "block";

      if (!surveyExists) {
        const noSurveyMsg = document.createElement("div");
        noSurveyMsg.className = "future-lock-box";
        noSurveyMsg.innerHTML = `
          <p class="lock-icon">✦</p>
          <p class="lock-text">There is no survey for this project.</p>
        `;
        panel.appendChild(noSurveyMsg);
      }

      const dateTag = document.createElement("p");
      dateTag.className = "stage-status-msg active-date";
      dateTag.innerText = surveyExists ? stageDate : `N/A`;
      panel.insertBefore(dateTag, bodyContainer);
    } else if (stageNum === currentStageNum) {
      // Active current stage
      if (bodyContainer) bodyContainer.style.display = "block";

      if (!surveyExists) {
        const noSurveyMsg = document.createElement("div");
        noSurveyMsg.className = "future-lock-box";
        noSurveyMsg.innerHTML = `
          <p class="lock-icon">✦</p>
          <p class="lock-text">There is no survey for this project.</p>
        `;
        panel.appendChild(noSurveyMsg);
      }

      const dateTag = document.createElement("p");
      dateTag.className = "stage-status-msg active-date";
      dateTag.innerText = surveyExists ? `Posted on ${stageDate}` : `Status: N/A`;
      panel.insertBefore(dateTag, bodyContainer);

    } else {
      // Future stage locked overlay
      if (bodyContainer) bodyContainer.style.display = "none";
      const lockMsg = document.createElement("div");
      lockMsg.className = "future-lock-box";

      if (surveyExists) {
        lockMsg.innerHTML = `
          <p class="lock-icon">✦</p>
          <p class="lock-text">We're getting there!</p>
        `;
      } else {
        lockMsg.innerHTML = `
          <p class="lock-icon">✦</p>
          <p class="lock-text">No survey planned for this stage.</p>
        `;
      }
      panel.appendChild(lockMsg);
    }
  });

  // Always force-start on Stage 1 on load
  const initialStage = 1;
  tabButtons.forEach((btn) => {
    const btnStageNum = Number(btn.getAttribute("data-stage"));
    if (btnStageNum === initialStage) {
      btn.classList.add("active");
      const targetId = btn.getAttribute("data-target");
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Ensure other panels lose the active class
  tabContents.forEach((panel) => {
    if (Number(panel.getAttribute("data-stage")) !== initialStage) {
      panel.classList.remove("active");
    }
  });
}

function setupTabClickHandlers() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const clickedBtn = e.currentTarget;
      const targetId = clickedBtn.getAttribute("data-target");

      tabButtons.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      clickedBtn.classList.add("active");
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });
}

function activateDefaultTab() {
  const firstBtn = document.querySelector(".tab-btn");
  const firstContent = document.querySelector(".tab-content");
  if (firstBtn) firstBtn.classList.add("active");
  if (firstContent) firstContent.classList.add("active");
}

function copySurveyLink() {
  const input = document.getElementById("survey-link-input");
  if (!input) return;
  navigator.clipboard.writeText(input.value).then(() => {
    const feedback = document.getElementById("copy-feedback");
    if (feedback) {
      feedback.style.display = "block";
      setTimeout(() => {
        feedback.style.display = "none";
      }, 2000);
    }
  });
}