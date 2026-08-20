let allProjects = [];

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
      renderProjects(allProjects);
    })
    .catch((error) => {
      console.error("Error loading project data:", error);
      const container = document.getElementById("projects-container");
      if (container) {
        container.innerHTML = "<p>Failed to load projects. Please try again later.</p>";
      }
    });

  // Setup tab filter listeners
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      tabs.forEach((t) => t.classList.remove("active"));
      e.target.classList.add("active");

      const filter = e.target.getAttribute("data-filter").toLowerCase();

      if (filter === "all") {
        renderProjects(allProjects);
      } else {
        const filtered = allProjects.filter(
          (p) => p.status && p.status.toLowerCase() === filter
        );
        renderProjects(filtered);
      }
    });
  });
});

// Helper function to sort projects
function sortProjectsByStage(projects) {
  return [...projects].sort((a, b) => {
    const orderA = STAGE_ORDER[a.stage ? a.stage.toLowerCase().trim() : ""] || 99;
    const orderB = STAGE_ORDER[b.stage ? b.stage.toLowerCase().trim() : ""] || 99;
    return orderA - orderB;
  });
}

// Stage CSS class mapping
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
function renderProjects(projects) {
  const container = document.getElementById("projects-container");
  if (!container) return;

  if (projects.length === 0) {
    container.innerHTML = "<p style='text-align: center; color: #8c826e; margin-top: 20px;'>No projects found in this category.</p>";
    return;
  }

  container.innerHTML = projects
    .map((project) => {
      const stageClass = getStageClass(project.stage);
      const projectUrl = `https://infunibuley.github.io/pages/projects/${project.id}`;
      status = "in-progress";

      if (project.stage == "complete") {
        status = "complete";
      }

      return `
        <div class="update project-card" data-status="${status}">
          <span class="tag ${stageClass}">Stage: ${project.stage}</span>
          <h3><a href="${projectUrl}" class="project-title-link">${project.title}</a></h3>
          <p>${project.description}</p>
        </div>
      `;
    })
    .join("");
}