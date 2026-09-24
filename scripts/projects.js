let allProjects = [];

// Mapping numeric stage (1-5) to display titles, legacy CSS classes, and json date keys
const STAGE_CONFIG = {
  1: {
    label: "1. Napkin Blueprints",
    cssClass: "tag-mind-works",
    dateKey: "napkin_blueprints"
  },
  2: {
    label: "2. Ancient Scrolls",
    cssClass: "tag-the-gears",
    dateKey: "ancient_scrolls"
  },
  3: {
    label: "3. Calling all Echoes",
    cssClass: "tag-your-sticks",
    dateKey: "calling_all_echoes"
  },
  4: {
    label: "4. Cranking the Dials",
    cssClass: "tag-fancy-stuff",
    dateKey: "cranking_the_dials"
  },
  5: {
    label: "5. The Final Verdict",
    cssClass: "tag-complete",
    dateKey: "the_final_verdict"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/projects.json")
    .then((response) => {
      if (!response.ok) throw new Error("Network error loading projects");
      return response.json();
    })
    .then((data) => {
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

  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      tabs.forEach((t) => t.classList.remove("active"));
      e.target.classList.add("active");

      const filter = e.target.getAttribute("data-filter").toLowerCase();

      if (filter === "all") {
        renderProjects(allProjects);
      } else {
        const filtered = allProjects.filter((p) => {
          // Stage 5 is considered complete; stages 1-4 are in-progress
          const projectStatus = Number(p.stage) === 5 ? "complete" : "in-progress";
          return projectStatus === filter;
        });
        renderProjects(filtered);
      }
    });
  });
});

function sortProjectsByStage(projects) {
  return [...projects].sort((a, b) => {
    const stageA = Number(a.stage) || 99;
    const stageB = Number(b.stage) || 99;
    return stageA - stageB;
  });
}

function getStageClass(stage) {
  const config = STAGE_CONFIG[Number(stage)];
  return config ? config.cssClass : "tag-mind-works";
}

function getStageLabel(stage) {
  const config = STAGE_CONFIG[Number(stage)];
  return config ? config.label : `Stage ${stage}`;
}

function getStageDate(project) {
  const stageNum = Number(project.stage);
  const config = STAGE_CONFIG[stageNum];
  
  if (!config) return "TBD";

  // Checks new snake_case key, numeric string/number key, or 'updated_at' fallback
  return project[config.dateKey] || project[stageNum] || project.updated_at || "TBD";
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
      const stageNum = Number(project.stage);
      const stageClass = getStageClass(stageNum);
      const stageLabel = getStageLabel(stageNum);
      const projectUrl = `https://infunibuley.github.io/pages/project/?id=${project.id}`;
      const status = stageNum === 5 ? "complete" : "in-progress";
      const lastUpdateDate = getStageDate(project);

      return `
        <div class="update project-update" data-status="${status}">
          <span class="tag ${stageClass}">${stageLabel}</span>
          <h3><a href="${projectUrl}" class="project-title-link">${project.title}</a></h3>
          <div class="flex-container">
            <p>${project.description}</p>
            <p style="color: #8c826e; font-size: 0.9rem;">Updated on ${lastUpdateDate}</p>
          </div>
        </div>
      `;
    })
    .join("");
}