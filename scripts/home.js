const STAGE_CONFIG = {
  1: { label: "1. Napkin Blueprints", cssClass: "tag-mind-works" },
  2: { label: "2. Ancient Scrolls", cssClass: "tag-the-gears" },
  3: { label: "3. Calling all Echoes", cssClass: "tag-your-sticks" },
  4: { label: "4. Cranking the Dials", cssClass: "tag-fancy-stuff" },
  5: { label: "5. The Final Verdict", cssClass: "tag-complete" }
};

document.addEventListener("DOMContentLoaded", () => {
  fetch("./data/projects.json")
    .then((res) => {
      if (!res.ok) throw new Error("Could not load projects.json");
      return res.json();
    })
    .then((projects) => {
      if (!projects || projects.length === 0) return;

      // 1. Populate Earliest Active Project
      const sortedByEarliest = [...projects].sort(
        (a, b) => (Number(a.stage) || 99) - (Number(b.stage) || 99)
      );
      const latestProject = sortedByEarliest[0];

      if (latestProject) {
        const stageNum = Number(latestProject.stage) || 1;
        const config = STAGE_CONFIG[stageNum] || STAGE_CONFIG[1];
        const projLink = document.getElementById("latest-project-link");
        const projTag = document.getElementById("latest-project-tag");

        if (projLink) {
          projLink.textContent = latestProject.title;
          projLink.href = `https://infunibuley.github.io/pages/project.html?id=${latestProject.id}`;
        }

        if (projTag) {
          projTag.textContent = config.label;
          projTag.className = `tag ${config.cssClass}`;
        }
      }

    const surveyCard = document.getElementById("latest-survey-card");
    const activeSurvey = projects.find((p) => Number(p.stage) === 3);

    if (activeSurvey) {
    const config = STAGE_CONFIG[3];
    document.getElementById("latest-survey-link").textContent = activeSurvey.title;
    document.getElementById("latest-survey-link").href = `https://infunibuley.github.io/pages/survey.html?id=${activeSurvey.id}`;
    
    const surveyTag = document.getElementById("latest-survey-tag");
    if (surveyTag) {
        surveyTag.textContent = config.label;
        surveyTag.className = `tag ${config.cssClass}`;
    }
    } else {
    // Rather than hiding, show an intentional resting state
    surveyCard.innerHTML = `
        <h4 style="color: #8c826e; margin-bottom: 8px;">Latest Survey</h4>
        <h3 style="font-size: 1.15rem; color: #b2c9a5; margin: 0 0 10px 0;">All Echoes Quiet</h3>
        <p style="font-size: 0.85rem; color: #8c826e; line-height: 1.4; margin: 0 0 12px 0;">
        No surveys open right now, sorry!
        </p>
        <a href="https://infunibuley.github.io/pages/contact" style="color: #b2c9a5; font-size: 0.85rem; text-decoration: underline;">
        Leave an idea though, I love to read them :)
        </a>
    `;
    }
    })
    .catch((err) => console.error("Error loading home updates:", err));
});