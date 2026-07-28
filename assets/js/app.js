window.SQLMasteryApp = (() => {
  const m = window.SQL_MASTERY_MODULE;
  const $ = id => document.getElementById(id);
  const configuredTotal = Number(m.questionCount);
  const totalQuestions = Number.isFinite(configuredTotal) && configuredTotal > 0
    ? configuredTotal
    : m.questions.length;
  let ready = false;
  let state = load();

  function load() {
    try {
      return Object.assign(
        { currentIndex: 0, questions: {}, history: [] },
        JSON.parse(localStorage.getItem(m.storageKey)) || {}
      );
    } catch {
      return { currentIndex: 0, questions: {}, history: [] };
    }
  }

  function save() { localStorage.setItem(m.storageKey, JSON.stringify(state)); }
  function q() { return m.questions[state.currentIndex]; }
  function qs() {
    return state.questions[q().num] ??= {
      attempts: 0,
      incorrectAttempts: 0,
      completed: false,
      firstTry: false,
      draft: ""
    };
  }

  function render() {
    SQLMasteryUI.question(q(), state.currentIndex, totalQuestions, qs().incorrectAttempts || 0, m);
    $("editor").value = qs().draft || "";
    SQLMasteryUI.stats(state, totalQuestions);
    SQLMasteryUI.list(m.questions, state, state.currentIndex, select);
    SQLMasteryUI.history(state.history);
    if ((qs().incorrectAttempts || 0) >= 3) SQLMasteryUI.solution(q().sql);
  }

  function select(i) {
    draft();
    state.currentIndex = Math.max(0, Math.min(m.questions.length - 1, i));
    save();
    render();
    tab("practice");
  }

  function draft() {
    if (ready) {
      qs().draft = $("editor").value;
      save();
    }
  }

  function run() {
    if (!ready) return;
    const sql = $("editor").value.trim();
    if (!sql) return SQLMasteryUI.feedback("bad", "Write a SQL query before running it.");
    const item = qs();
    item.draft = sql;
    item.attempts++;
    try {
      const actual = SQLMasteryDatabase.execute(sql);
      const expected = SQLMasteryDatabase.execute(q().sql);
      const validation = SQLMasteryValidator.validate(actual, expected, q().validation || { orderSensitive: q().orderSensitive }, sql);
      if (validation.correct && !item.completed) {
        item.completed = true;
        item.firstTry = item.attempts === 1;
      }
      if (!validation.correct) item.incorrectAttempts++;
      state.history.push({ question: q().num, sql, correct: validation.correct, elapsed: actual.elapsed, time: new Date().toISOString() });
      SQLMasteryUI.result(actual);
      const dialectNote = actual.dialectNotes?.length
        ? `\n\nDialect compatibility: ${actual.dialectNotes.join(" ")}`
        : "";
      SQLMasteryUI.feedback(validation.correct ? "ok" : "bad", validation.message + dialectNote);
    } catch (err) {
      if (!err.noPenalty) item.incorrectAttempts++;
      state.history.push({
        question: q().num,
        sql,
        correct: false,
        noPenalty: Boolean(err.noPenalty),
        elapsed: 0,
        time: new Date().toISOString()
      });
      SQLMasteryUI.feedback(err.noPenalty ? "warn" : "bad", err.message);
    }
    state.history = state.history.slice(-100);
    save();
    render();
  }

  function tab(name) {
    document.querySelectorAll(".tab").forEach(x => x.classList.toggle("active", x.dataset.tab === name));
    document.querySelectorAll(".panel").forEach(x => x.classList.toggle("active", x.id === name));
  }

  async function init() {
    $("loadingOverlay").hidden = false;
    try {
      if (!m.database) throw new Error("The module database property is missing.");
      if (Array.isArray(m.database)) throw new Error("This module must select one database before startup.");
      await SQLMasteryDatabase.init(m.database);
      ready = true;
      SQLMasteryUI.explorer(SQLMasteryDatabase.schema());
      render();
      document.querySelectorAll(".tab").forEach(x => x.onclick = () => tab(x.dataset.tab));
      $("editor").addEventListener("input", draft);
    } catch (err) {
      $("resultCard").innerHTML = `<div class="error-box"><b>Database loading failed.</b><br>${err.message}<br><br>Use GitHub Pages or a local web server, not file://.</div>`;
    } finally {
      $("loadingOverlay").hidden = true;
    }
  }

  window.startLearning = () => { $("landing").style.display = "none"; $("learningApp").classList.add("is-visible"); };
  window.showLanding = () => { draft(); $("learningApp").classList.remove("is-visible"); $("landing").style.display = "flex"; };
  window.runQuery = run;
  window.clearEditor = () => { $("editor").value = ""; qs().draft = ""; save(); SQLMasteryUI.feedback("warn", ""); $("resultTable").innerHTML = ""; $("resultMeta").textContent = ""; };
  window.resetDatabase = () => { SQLMasteryDatabase.reset(); SQLMasteryUI.feedback("warn", "The SQLite database has been reset."); };
  window.showHint = n => SQLMasteryUI.hint(q(), n);
  window.manualUnlock = () => SQLMasteryUI.solution(q().sql);
  window.move = d => select(state.currentIndex + d);
  document.addEventListener("DOMContentLoaded", init);
})();
