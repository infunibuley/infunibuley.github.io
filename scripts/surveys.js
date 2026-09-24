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
          // Stage 3 corresponds to open surveys ("Calling all Echoes")
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

async function renderSurveys(projects) {
  const container = document.getElementById("projects-container");
  if (!container) return;

  if (projects.length === 0) {
    container.innerHTML = "<p style='text-align: center; color: #8c826e; margin-top: 20px;'>No surveys found at this time.</p>";
    return;
  }

  // 1. Check if the project folder actually contains the survey HTML file
  const surveyChecks = await Promise.all(
    projects.map(async (project) => {
      const questionUrl = `../data/projects/${project.id}/${project.id}.html`;
      
      try {
        const res = await fetch(questionUrl, { cache: "no-cache" });

        // If GitHub Pages returns 404 (or anything other than 200 OK), the file does not exist
        if (!res.ok) {
          return { project, hasSurvey: false };
        }

        // Catch cases where GitHub Pages serves a 404.html template with status 200
        const text = await res.text();
        const is404 = text.includes("404") || text.includes("File not found") || text.trim() === "";

        return { project, hasSurvey: !is404 };
      } catch (err) {
        return { project, hasSurvey: false };
      }
    })
  );

  // 2. Render only projects whose survey files genuinely exist
  const cardsHtml = surveyChecks
    .filter(({ hasSurvey }) => hasSurvey)
    .map(({ project }) => {
      const stageNum = Number(project.stage);
      const stageClass = getStageClass(stageNum);
      const stageLabel = getStageLabel(stageNum);
      const projectUrl = `https://infunibuley.github.io/pages/survey.html?id=${project.id}`;

      let isOpen = false;
      let surveyStatus = "na";
      switch (stageNum) {
        case 3:
          surveyStatus = "open";
          isOpen = true;
          break;
        case 4:
        case 5:
          surveyStatus = "closed";
          isOpen = false;
          break;
      }

      const closeDate = project.cranking_the_dials || project.fancy_stuff || "TBD";
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

  container.innerHTML = cardsHtml || "<p style='text-align: center; color: #8c826e; margin-top: 20px;'>No surveys found at this time.</p>";
}