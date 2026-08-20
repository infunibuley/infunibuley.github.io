const STAGE_ORDER = {
  "mind works": 1,
  "the gears": 2,
  "your sticks": 3,
  "fancy stuff": 4,
  "complete": 5
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Setup click listeners first so tabs work immediately
  setupTabClickHandlers();

  // 2. Extract clean project ID (handles both /project1 and /project1.html)
  const pathParts = window.location.pathname.replace(/\/$/, "").split("/");
  let rawFile = pathParts[pathParts.length - 1] || "project1";
  const projectId = rawFile.replace(".html", "").toLowerCase();

  // 3. Load dynamic stage dates
  fetch("../../data/projects.json")
    .then((res) => {
      if (!res.ok) throw new Error("Could not load projects.json");
      return res.json();
    })
    .then((projects) => {
      const project = projects.find((p) => p.id && p.id.toLowerCase() === projectId);
      if (project) {
        setupProjectStages(project);
      } else {
        activateDefaultTab();
      }
    })
    .catch((err) => {
      console.warn("Could not fetch stage data, activating default tab:", err);
      activateDefaultTab();
    });
});

// Direct tab switching logic
function setupTabClickHandlers() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const clickedBtn = e.currentTarget;
      const targetId = clickedBtn.getAttribute("data-target");

      // Remove active from all buttons & panels
      tabButtons.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      // Activate clicked button and target panel
      clickedBtn.classList.add("active");
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });
}

// Dynamic stage data & date setup
function setupProjectStages(project) {
  const currentStageName = project.stage ? project.stage.toLowerCase().trim() : "mind works";
  const currentStageNum = STAGE_ORDER[currentStageName] || 1;
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabContents.forEach((panel) => {
    const stageName = panel.getAttribute("data-stage-name");
    const panelStageNum = STAGE_ORDER[stageName] || 1;
    const stageKey = stageName.replace(/\s+/g, "_");
    const stageDate = project[stageKey] || "TBD";
    const bodyContainer = panel.querySelector(".stage-body");

    // Clear any previously injected status tags or lock boxes
    panel.querySelectorAll(".stage-status-msg, .future-lock-box").forEach((el) => el.remove());

    if (panelStageNum < currentStageNum) {
      if (bodyContainer) bodyContainer.style.display = "block";
      const dateTag = document.createElement("p");
      dateTag.className = "stage-status-msg completed-date";
      dateTag.innerText = `Completed on ${stageDate}`;
      panel.insertBefore(dateTag, bodyContainer);
    } else if (panelStageNum === currentStageNum) {
      if (bodyContainer) bodyContainer.style.display = "block";
      const dateTag = document.createElement("p");
      dateTag.className = "stage-status-msg active-date";
      dateTag.innerText = `Started on ${stageDate}`;
      panel.insertBefore(dateTag, bodyContainer);
    } else {
      if (bodyContainer) bodyContainer.style.display = "none";
      const lockMsg = document.createElement("div");
      lockMsg.className = "future-lock-box";
      lockMsg.innerHTML = `
        <p class="lock-icon">✦</p>
        <p class="lock-text">We're getting there!</p>
        <p class="lock-subtext">Come back on <strong>${stageDate}</strong></p>
      `;
      panel.appendChild(lockMsg);
    }
  });

  // Activate the button matching the current stage
  let matched = false;
  tabButtons.forEach((btn) => {
    const btnStageName = btn.getAttribute("data-stage");
    if (STAGE_ORDER[btnStageName] === currentStageNum) {
      btn.classList.add("active");
      const targetId = btn.getAttribute("data-target");
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add("active");
      matched = true;
    } else {
      btn.classList.remove("active");
    }
  });

  if (!matched) activateDefaultTab();
}

// Fallback: activates first tab if no matching stage is found
function activateDefaultTab() {
  const firstBtn = document.querySelector(".tab-btn");
  const firstContent = document.querySelector(".tab-content");
  if (firstBtn) firstBtn.classList.add("active");
  if (firstContent) firstContent.classList.add("active");
}