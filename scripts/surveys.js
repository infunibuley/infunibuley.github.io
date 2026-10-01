let allProjects = [];

const STAGE_CONFIG = {
  1: { label: "1. Napkin Blueprints", cssClass: "tag-mind-works" },
  2: { label: "2. Ancient Scrolls", cssClass: "tag-the-gears" },
  3: { label: "3. Calling all Echoes", cssClass: "tag-your-sticks" },
  4: { label: "4. Cranking the Dials", cssClass: "tag-fancy-stuff" },
  5: { label: "5. The Final Verdict", cssClass: "tag-complete" }
};

document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/projects.json")
    .then((response) => {
      if (!response.ok) throw new Error("Network error loading projects");
      return response.json();
    })
    .then((data) => {
      allProjects = sortProjectsByStage(data);
      renderSurveys(allProjects);
    })
    .catch((error) => {
      console.error("Error loading project data:", error);
      const container = document.getElementById("projects-container");
      if (container) {
        container.innerHTML = "<p>Failed to load surveys. Please try again later.</p>";
      }
    });

  // Setup tab filter listeners for 'all', 'open', and 'closed'
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      tabs.forEach((t) => t.classList.remove("active"));
      e.target.classList.add("active");

      const filter = e.target.getAttribute("data-filter").toLowerCase();

      if (filter === "all") {
        renderSurveys(allProjects);
      } else {
        const filtered = allProjects.filter((p) => {
          const isOpen = Number(p.stage) === 3;
          const surveyStatus = isOpen ? "open" : "closed";
          return surveyStatus === filter;
        });
        renderSurveys(filtered);
      }
    });
  });
});

function sortProjectsByStage(projects) {
  return [...projects].sort((a, b) => (Number(a.stage) || 99) - (Number(b.stage) || 99));
}

function getStageClass(stage) {
  const config = STAGE_CONFIG[Number(stage)];
  return config ? config.cssClass : "tag-mind-works";
}

function getStageLabel(stage) {
  const config = STAGE_CONFIG[Number(stage)];
  return config ? config.label : `Stage ${stage}`;
}

function renderSurveys(projects) {
  const container = document.getElementById("projects-container");
  if (!container) return;

  // Only show projects that have reached Stage 3 or above AND have a Tally form assigned
  const surveyProjects = projects.filter((project) => {
    const stageNum = Number(project.stage) || 1;
    return stageNum >= 3 && Boolean(project.form_id);
  });

  if (surveyProjects.length === 0) {
    container.innerHTML = "<p style='text-align: center; color: #8c826e; margin-top: 20px;'>No surveys found at this time.</p>";
    return;
  }

  const cardsHtml = surveyProjects
    .map((project) => {
      const stageNum = Number(project.stage);
      const stageClass = getStageClass(stageNum);
      const stageLabel = getStageLabel(stageNum);
      const projectUrl = `https://infunibuley.github.io/pages/survey.html?id=${project.id}`;

      const isOpen = stageNum === 3;
      const surveyStatus = isOpen ? "open" : "closed";

      // Prefer the explicit survey_close field, falling back to cranking_the_dials
      const closeDate = project.survey_close || project.cranking_the_dials || "TBD";
      const dateLabel = isOpen ? `Closes on ${closeDate}` : `Closed on ${closeDate}`;

      return `
        <div class="update project-update" data-status="${surveyStatus}">
          <span class="tag ${stageClass}">${stageLabel}</span>
          <h3><a href="${projectUrl}" class="project-title-link">${project.title}</a></h3>
          <div class="flex-container">
            <p>${project.description}</p>
            <p style="color: ${isOpen ? '#a3e8b5' : '#8c826e'}; font-size: 0.9rem;">${dateLabel}</p>
          </div>
        </div>
      `;
    })
    .join("");

  container.innerHTML = cardsHtml;
}