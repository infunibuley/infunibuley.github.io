let allProjects = [];

// Stage order mapping (Stage 1 -> Stage 5)
const STAGE_ORDER = {
  "mind works": 1,
  "the gears": 2,
  "your sticks": 3,
  "fancy stuff": 4,
  "complete": 5
};

document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/projects.json")
    .then((response) => {
      if (!response.ok) throw new Error("Network error loading projects");
      return response.json();
    })
    .then((data) => {
      // Sort projects by stage order
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
          const isOpen = p.stage && p.stage.toLowerCase().trim() === "your sticks";
          const surveyStatus = isOpen ? "open" : "closed";
          return surveyStatus === filter;
        });
        renderSurveys(filtered);
      }
    });
  });
});

// Helper function to sort projects from Stage 1 -> Stage 5
function sortProjectsByStage(projects) {
  return [...projects].sort((a, b) => {
    const orderA = STAGE_ORDER[a.stage ? a.stage.toLowerCase().trim() : ""] || 99;
    const orderB = STAGE_ORDER[b.stage ? b.stage.toLowerCase().trim() : ""] || 99;
    return orderA - orderB;
  });
}

// Map stage names to CSS tag classes
function getStageClass(stage) {
  switch (stage ? stage.toLowerCase().trim() : "") {
    case "mind works":
      return "tag-mind-works";
    case "the gears":
      return "tag-the-gears";
    case "your sticks":
      return "tag-your-sticks";
    case "fancy stuff":
      return "tag-fancy-stuff";
    case "complete":
      return "tag-complete";
    default:
      return "tag-mind-works";
  }
}

// Render cards into DOM
function renderSurveys(projects) {
  const container = document.getElementById("projects-container");
  if (!container) return;

  if (projects.length === 0) {
    container.innerHTML = "<p style='text-align: center; color: #8c826e; margin-top: 20px;'>No surveys found in this category.</p>";
    return;
  }

  container.innerHTML = projects
    .map((project) => {
      const stageClass = getStageClass(project.stage);
      const projectUrl = `https://infunibuley.github.io/pages/surveys/${project.id}`;
      const isOpen = (project.stage && project.stage.toLowerCase().trim() === "your sticks");
      const surveyStatus = isOpen ? "open" : "closed";
      
      const closeDate = project.fancy_stuff || "TBD";
      const dateLabel = isOpen ? `Closes on ${closeDate}` : `Closed on ${closeDate}`;

      return `
        <div class="update project-card" data-status="${surveyStatus}">
          <span class="tag ${stageClass}">Stage: ${project.stage}</span>
          <h3><a href="${projectUrl}" class="project-title-link">${project.title}</a></h3>
          <div class="flex-container">
            <p>${project.description}</p>
            <p style="color: ${isOpen ? '#a3e8b5' : '#8c826e'}; font-size: 0.9rem;">${dateLabel}</p>
          </div>
        </div>
      `;
    })
    .join("");
}