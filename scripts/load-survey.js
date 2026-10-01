document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  let projectId = params.get("id");

  if (!projectId) {
    const pathParts = window.location.pathname.replace(/\/$/, "").split("/");
    const rawFile = pathParts[pathParts.length - 1] || "";
    projectId = rawFile.replace(".html", "").toLowerCase();
  }

  const container = document.getElementById("survey-container");
  if (!projectId) {
    if (container) container.innerHTML = "<p style='color: #8c826e; text-align: center;'>No project specified.</p>";
    return;
  }

  fetch("../data/projects.json")
    .then((res) => {
      if (!res.ok) throw new Error("Could not load projects.json");
      return res.json();
    })
    .then((projects) => {
      const project = projects.find((p) => p.id && p.id.toLowerCase() === projectId.toLowerCase());

      if (!project) {
        if (container) container.innerHTML = "<p style='color: #8c826e; text-align: center;'>Project not found.</p>";
        return;
      }

      // 1. Update Page Titles & Header Links
      document.title = `${project.title}: survey — infunibuley`;

      const projLink = document.getElementById("project-link");
      if (projLink) {
        projLink.textContent = project.title;
        projLink.href = `https://infunibuley.github.io/pages/project?id=${project.id}`;
      }

      // 2. Check if Survey is Closed (Stage is not 3)
      const isOpen = Number(project.stage) === 3;
      if (!isOpen) {
        renderClosedMessage(container, project);
        return;
      }

      // 3. Check if Tally Form ID exists
      if (!project.form_id) {
        if (container) {
          container.innerHTML = "<p style='color: #8c826e; text-align: center;'>No survey configured for this project yet.</p>";
        }
        return;
      }

      // 4. Inject Tally Embed iframe
      renderTallyEmbed(container, project.form_id, project.title);
    })
    .catch((err) => {
      console.error("Error loading survey:", err);
      if (container) {
        container.innerHTML = "<p style='color: #8c826e; text-align: center;'>Failed to load survey. Please try again later.</p>";
      }
    });
});

function renderTallyEmbed(container, formId, title) {
  // transparentBackground=1 ensures Tally adopts your page's background smoothly
  container.innerHTML = `
    <iframe 
      data-tally-src="https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
      loading="lazy" 
      width="100%" 
      height="300" 
      frameborder="0" 
      marginheight="0" 
      marginwidth="0" 
      title="${title}">
    </iframe>
  `;

  // If Tally script has already loaded, refresh embeds to auto-fit height
  if (window.Tally) {
    window.Tally.loadEmbeds();
  }
}

function renderClosedMessage(container, project) {
  const closeDate = project.survey_close || project.cranking_the_dials || "a previous stage";
  
  container.innerHTML = `
    <div style="text-align: center; padding: 30px 20px; border: 1px dashed #3b3329; border-radius: 8px; margin: 20px 0;">
      <p style="color: #d4cebe; font-size: 1.15rem; margin-bottom: 8px;">This survey is currently closed.</p>
      <p style="color: #8c826e; font-size: 0.9rem; margin: 0;">Responses closed on ${closeDate} when the project entered Stage 4.</p>
    </div>
  `;
}