window.SQLMasteryModules = (() => {
  const modules = Array.isArray(window.SQL_MODULES) ? window.SQL_MODULES : [];
  const escapeHtml = value => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

  function renderHome(containerId = "moduleGrid") {
    const host = document.getElementById(containerId);
    if (!host) return;

    host.innerHTML = modules.map(module => {
      const completed = readCompleted(module);
      const percent = module.questionCount
        ? Math.round((completed / module.questionCount) * 100)
        : 0;
      const action = completed > 0 ? "Continue" : "Start";

      return `
        <a class="home-module-card" href="learning-paths/${escapeHtml(module.slug)}/index.html">
          <span class="home-module-number">Module ${module.id}</span>
          <h2>${escapeHtml(module.title)}</h2>
          <p>${escapeHtml(module.description)}</p>
          <div class="home-module-meta">
            <span>${module.questionCount} questions</span>
            <span>${completed}/${module.questionCount} completed</span>
          </div>
          <div class="home-progress"><i style="width:${percent}%"></i></div>
          <strong>${action} →</strong>
        </a>`;
    }).join("");
  }

  function renderSidebar(containerId, activeSlug) {
    const host = document.getElementById(containerId);
    if (!host) return;
    host.innerHTML = modules.map(module => `
      <a class="module ${module.slug === activeSlug ? "active" : ""}"
         href="../${escapeHtml(module.slug)}/index.html">
        <b>Module ${module.id}</b>
        <small>${escapeHtml(module.title)} · ${module.questionCount} exercises</small>
      </a>`).join("");
  }

  function readCompleted(module) {
    const key = module.storageKey || `sqlMastery${module.slug.replace(/[^a-z0-9]/gi, "_")}V2`;
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      return Object.values(saved?.questions || {}).filter(item => item?.completed).length;
    } catch {
      return 0;
    }
  }

  function getBySlug(slug) {
    return modules.find(module => module.slug === slug) || null;
  }

  return { renderHome, renderSidebar, getBySlug, modules };
})();
