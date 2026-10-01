// Stage configuration for tag names and badge styles
const STAGE_CONFIG = {
  1: { label: "1. Napkin Blueprints", key: "napkin_blueprints", cssClass: "tag-mind-works" },
  2: { label: "2. Ancient Scrolls", key: "ancient_scrolls", cssClass: "tag-the-gears" },
  3: { label: "3. Calling all Echoes", key: "calling_all_echoes", cssClass: "tag-your-sticks" },
  4: { label: "4. Cranking the Dials", key: "cranking_the_dials", cssClass: "tag-fancy-stuff" },
  5: { label: "5. The Final Verdict", key: "the_final_verdict", cssClass: "tag-complete" }
};

document.addEventListener("DOMContentLoaded", () => {
  fetch("./data/projects.json")
    .then((res) => {
      if (!res.ok) throw new Error("Could not load projects.json");
      return res.json();
    })
    .then((projects) => {
      if (!Array.isArray(projects) || projects.length === 0) return;

      // Helper to format ISO dates or standard date strings into "MMM YYYY"
      const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "TBD" || dateStr === "N/A") return "";
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
      };

      // Helper to check if a project has an active, valid survey
      const isValidSurvey = (p) => {
        const stageNum = Number(p.stage);
        const stage3Date = p[STAGE_CONFIG[3].key] || p.calling_all_echoes;
        return (
          stageNum === 3 &&
          Boolean(stage3Date) &&
          stage3Date.toUpperCase() !== "N/A" &&
          stage3Date.toUpperCase() !== "TBD"
        );
      };

      // 1. POPULATE HERO (LATEST / EARLIEST ACTIVE PROJECT)
      const sortedByEarliest = [...projects].sort(
        (a, b) => (Number(a.stage) || 99) - (Number(b.stage) || 99)
      );
      const latestProject = sortedByEarliest[0];

      if (latestProject) {
        const stageNum = Number(latestProject.stage) || 1;
        const config = STAGE_CONFIG[stageNum] || STAGE_CONFIG[1];
        const projLink = document.getElementById("latest-project-link");
        const projTag = document.getElementById("latest-project-tag");
        const projDesc = document.getElementById("latest-project-desc");
        const projDate = document.getElementById("latest-project-date");
        const projBtn = document.getElementById("latest-project-btn");
        const projSeries = document.getElementById("latest-project-series");

        const targetUrl = `https://infunibuley.github.io/pages/project.html?id=${latestProject.id}`;

        if (projLink) {
          projLink.textContent = latestProject.title;
          projLink.href = targetUrl;
        }
        if (projBtn) projBtn.href = targetUrl;
        if (projTag) {
          projTag.textContent = config.label;
          projTag.className = `tag ${config.cssClass}`;
        }
        if (projDesc && (latestProject.summary || latestProject.description)) {
          projDesc.textContent = latestProject.summary || latestProject.description;
        }

        // Get date from stage key or general date
        const rawDate = latestProject[config.key] || latestProject.date;
        if (projDate && rawDate) {
          projDate.textContent = formatDate(rawDate);
        }
        if (projSeries && latestProject.series) {
          projSeries.textContent = `Latest Project · Series: ${latestProject.series}`;
        }
      }

      // 2. POPULATE LATEST SURVEY STRIP
      const surveyCard = document.getElementById("latest-survey-card");
      const activeSurvey = projects.find(isValidSurvey);

      if (activeSurvey) {
        const config = STAGE_CONFIG[3];
        const surveyLink = document.getElementById("latest-survey-link");
        const surveyTag = document.getElementById("latest-survey-tag");

        if (surveyLink) {
          surveyLink.textContent = activeSurvey.title;
          surveyLink.href = `https://infunibuley.github.io/pages/survey.html?id=${activeSurvey.id}`;
        }
        if (surveyTag) {
          surveyTag.textContent = "Live Survey";
          surveyTag.className = `status-badge ${config.cssClass}`;
        }
      } else {
        // Resting state
        surveyCard.innerHTML = `
          <div class="survey-strip-left">
            <span class="status-badge">Closed</span>
            <h3 style="margin:0; font-size:1.15rem; color:#b2c9a5;">All Echoes Quiet</h3>
            <span style="font-size:0.95rem; color:#8c826e;">No surveys open right now.</span>
          </div>
          <a href="https://infunibuley.github.io/pages/contact" class="sub-link">
            Leave an idea, I love to read them :)
          </a>
        `;
      }

      // 3. POPULATE "RECENT" STREAM FROM REAL-TIME DATA
      const streamContainer = document.getElementById("stream-feed-container");

      // Extract raw date for sorting
      const getItemTimestamp = (item) => {
        const stageNum = Number(item.stage) || 1;
        const stageKey = STAGE_CONFIG[stageNum] ? STAGE_CONFIG[stageNum].key : null;
        const dateStr = (stageKey && item[stageKey]) || item.date;
        if (!dateStr || dateStr === "TBD" || dateStr === "N/A") return 0;
        const time = new Date(dateStr).getTime();
        return isNaN(time) ? 0 : time;
      };

      // Sort newest first
      const sortedProjects = [...projects].sort(
        (a, b) => getItemTimestamp(b) - getItemTimestamp(a)
      );

      const renderStream = (filter = "projects") => {
        if (!streamContainer) return;

        let displayItems = [];

        if (filter === "projects") {
          displayItems = sortedProjects.map((item) => {
            const stageNum = Number(item.stage) || 1;
            const stageKey = STAGE_CONFIG[stageNum] ? STAGE_CONFIG[stageNum].key : null;
            const dateStr = (stageKey && item[stageKey]) || item.date;

            return {
              title: item.title || "Untitled Project",
              label: "PROJECT",
              cssType: "project-type",
              date: formatDate(dateStr),
              url: `https://infunibuley.github.io/pages/project.html?id=${item.id}`
            };
          });
        } else if (filter === "surveys") {
          // Strictly only include projects in Stage 3 where the date is not "TBD" and not "N/A"
          displayItems = sortedProjects
            .filter(isValidSurvey)
            .map((item) => ({
              title: item.title || "Untitled Survey",
              label: "SURVEY",
              cssType: "survey-type",
              date: formatDate(item[STAGE_CONFIG[3].key] || item.calling_all_echoes),
              url: `https://infunibuley.github.io/pages/survey.html?id=${item.id}`
            }));
        }

        if (displayItems.length === 0) {
          streamContainer.innerHTML = `
            <div class="stream-item" style="background:#241f19; border:1px dashed #3b3329; justify-content:center;">
              <span class="stream-title" style="color:#8c826e; font-size:1rem;">
                No ${filter} currently active.
              </span>
            </div>
          `;
          return;
        }

        streamContainer.innerHTML = displayItems
          .map(
            (item) => `
            <a href="${item.url}" class="stream-item ${item.cssType}">
              <span class="stream-title">${item.title}</span>
              <div class="stream-meta">
                <span class="stream-label">${item.label}</span>
                ${item.date ? `<time>${item.date}</time>` : ""}
              </div>
            </a>
          `
          )
          .join("");
      };

      // Default load: Projects only
      renderStream("projects");

      // Wire up Filter Pills (Projects and Surveys)
      const pillButtons = document.querySelectorAll("#recent-filter-pills .tab-btn");      pillButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          pillButtons.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          renderStream(btn.dataset.filter);
        });
      });
    })
    .catch((err) => console.error("Error loading home updates:", err));
});