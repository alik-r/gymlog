/*
 * gymlog — UI. Reads window.PROGRAM (data/program.js) and renders views
 * with hash routing (#/, #/monday, #/today, #/safety, #/progress, #/cardio).
 * Set/warm-up ticks live in memory only: a reload clears them.
 */
(function () {
  "use strict";

  var P = window.PROGRAM;
  var main = document.getElementById("main");
  var DAY_IDS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]; // Date#getDay order

  // In-memory tick state: { monday: { "w0": true, "e1-2": true }, ... }
  var ticks = {};

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // **bold**, *italic*, [text](url) on escaped text.
  function md(s) {
    return esc(s)
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");
  }

  function paras(arr) {
    return (arr || []).map(function (t) { return "<p>" + md(t) + "</p>"; }).join("");
  }

  function list(items, ordered) {
    var tag = ordered ? "ol" : "ul";
    return "<" + tag + ">" + items.map(function (t) { return "<li>" + md(t) + "</li>"; }).join("") + "</" + tag + ">";
  }

  // Body blocks: strings become paragraphs, { list: [...] } becomes a list.
  function blocks(body) {
    return (body || []).map(function (b) {
      return typeof b === "string" ? "<p>" + md(b) + "</p>" : list(b.list, b.ordered);
    }).join("");
  }

  function table(t, opts) {
    opts = opts || {};
    var numeric = t.rows.every(function (r) { return r.every(function (c) { return /^\d+$/.test(c); }); });
    var cls = numeric ? "data" : "data stack"; // short numeric tables fit as-is
    var head = "<thead><tr>" + t.columns.map(function (c) {
      return '<th scope="col"' + (numeric ? ' class="num"' : "") + ">" + esc(c) + "</th>";
    }).join("") + "</tr></thead>";
    var body = "<tbody>" + t.rows.map(function (r) {
      return "<tr>" + r.map(function (c, i) {
        return '<td data-label="' + esc(t.columns[i]) + '"' + (numeric ? ' class="num"' : "") + ">" + md(c) + "</td>";
      }).join("") + "</tr>";
    }).join("") + "</tbody>";
    var caption = opts.caption ? '<caption class="sr-only">' + esc(opts.caption) + "</caption>" : "";
    return '<div class="table-wrap"><table class="' + cls + '">' +
      caption + head + body + "</table></div>";
  }

  function footer() {
    return '<footer class="site-footer">' + esc(P.footer) + "</footer>";
  }

  function todayId() { return DAY_IDS[new Date().getDay()]; }

  function weekEntry(id) {
    for (var i = 0; i < P.week.length; i++) if (P.week[i].id === id) return P.week[i];
    return null;
  }

  function weekIndex(id) {
    for (var i = 0; i < P.week.length; i++) if (P.week[i].id === id) return i;
    return -1;
  }

  var ICON_TICK = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  var ICON_CLOCK = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>';
  var ICON_CHEV = '<svg class="chev" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';

  // ---------------------------------------------------------------------------
  // Views
  // ---------------------------------------------------------------------------
  function viewWeek() {
    var today = todayId();
    var s = P.schedule;
    var rows = P.week.map(function (d) {
      var isToday = d.id === today;
      var short = d.label.slice(0, 3);
      var meta = d.time !== "—" ? esc(d.time) : "";
      if (d.type === "workout" && P.workouts[d.id]) meta += (meta ? " · " : "") + esc(P.workouts[d.id].duration);
      if (d.tag) meta += (meta ? " · " : "") + esc(d.tag);
      var cls = "day-row" + (d.type === "workout" ? "" : " rest") + (isToday ? " is-today" : "");
      return '<li><a class="' + cls + '" href="#/' + d.id + '"' + (isToday ? ' aria-current="date"' : "") + ">" +
        '<span class="dow">' + short + "</span>" +
        '<span class="info"><span class="session">' + esc(d.session) +
        (isToday ? ' <span class="pill pill-today">Today</span>' : "") + "</span>" +
        (meta ? '<span class="meta">' + meta + "</span>" : "") + "</span>" +
        ICON_CHEV + "</a></li>";
    }).join("");

    return '<div class="page">' +
      '<p class="eyebrow">Your week</p><h1>Weekly schedule</h1>' +
      '<p class="lead">' + md(s.intro) + "</p>" +
      '<ul class="week-list">' + rows + "</ul>" +
      '<div class="card">' + "<p>" + md(s.sessionLength) + "</p>" + paras(s.notes) + "</div>" +
      footer() + "</div>";
  }

  function pager(id) {
    var i = weekIndex(id);
    var prev = P.week[(i + 6) % 7], next = P.week[(i + 1) % 7];
    return '<nav class="pager" aria-label="Previous and next day">' +
      '<a class="prev" href="#/' + prev.id + '"><small>‹ ' + esc(prev.label) + "</small><span>" + esc(prev.session) + "</span></a>" +
      '<a class="next" href="#/' + next.id + '"><small>' + esc(next.label) + " ›</small><span>" + esc(next.session) + "</span></a>" +
      "</nav>";
  }

  function exerciseCard(ex, dayId) {
    var img = P.images[ex.image];
    var images = "";
    if (img) {
      images = '<div class="ex-images' + (img.files.length === 1 ? " single" : "") + '">' +
        img.files.map(function (f, i) {
          var alt = img.alt + (img.files.length > 1 ? (i === 0 ? " (start position)" : " (end position)") : "");
          return '<img src="' + esc(f) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async" width="850" height="567">';
        }).join("") + "</div>";
    }
    var sets = "";
    for (var s = 1; s <= ex.sets; s++) {
      var key = "e" + ex.n + "-" + s;
      sets += '<label class="set-toggle"><input type="checkbox" data-key="' + key + '"' +
        (ticks[dayId] && ticks[dayId][key] ? " checked" : "") +
        ' aria-label="' + esc(ex.name) + ", set " + s + " of " + ex.sets + '">' +
        "<span>" + ICON_TICK + "Set " + s + "</span></label>";
    }
    return '<li><article class="card ex-card" id="ex-' + ex.n + '" data-ex="' + ex.n + '">' +
      '<div class="ex-top">' +
      '<h3 class="ex-title"><span class="ex-num" aria-hidden="true">' + ex.n + "</span>" +
      '<span><span class="sr-only">Exercise ' + ex.n + ": </span>" + esc(ex.name) + "</span></h3>" +
      '<div class="rx">' +
      '<div class="rx-main"><span class="rx-label">Sets × reps</span>' +
      '<span class="rx-value">' + ex.sets + '<span class="x">×</span>' + esc(ex.reps) + "</span></div>" +
      '<div class="rx-rest"><span class="rx-label">Rest</span><span class="rx-value">' + esc(ex.rest) + "</span></div>" +
      "</div></div>" +
      images +
      '<div class="ex-body">' +
      (ex.note ? '<p class="ex-note">' + md(ex.note) + "</p>" : "") +
      (ex.sub ? '<p class="sub-note"><strong>If it hurts</strong>' + md(ex.sub) + "</p>" : "") +
      '<div class="sets" role="group" aria-label="Sets for ' + esc(ex.name) + '">' + sets + "</div>" +
      "</div></article></li>";
  }

  function viewWorkout(id, viaToday) {
    var w = P.workouts[id];
    var d = weekEntry(id);
    var t = ticks[id] || {};
    var warm = w.warmup.steps.map(function (step, i) {
      var key = "w" + i;
      return '<li><label class="check-row"><input type="checkbox" data-key="' + key + '"' + (t[key] ? " checked" : "") + ">" +
        '<span class="check-box" aria-hidden="true"><span class="num">' + (i + 1) + '</span><span class="tick">' + ICON_TICK + "</span></span>" +
        '<span class="check-text">' + md(step) + "</span></label></li>";
    }).join("");

    var notes = (w.notes || []).map(function (n) {
      return '<div class="card"><h3 style="margin-top:0">' + esc(n.title) + "</h3>" + blocks(n.body) + "</div>";
    }).join("");

    return '<div class="page" data-day="' + id + '">' +
      '<div class="day-head"><p class="eyebrow">' + esc(d.label) + (viaToday || id === todayId() ? " · Today" : "") +
      (d.time !== "Flexible" ? " · " + esc(d.time) : "") + "</p>" +
      "<h1>" + esc(w.session) + "</h1>" +
      '<p class="goal"><strong>Goal:</strong> ' + md(w.goal) + "</p>" +
      (w.intro ? '<p class="muted">' + md(w.intro) + "</p>" : "") +
      '<div class="day-facts"><span class="fact">' + ICON_CLOCK + esc(w.duration) + '</span><span class="fact">' +
      w.exercises.length + " exercises</span>" + (d.tag ? '<span class="fact">' + esc(d.tag) + "</span>" : "") + "</div></div>" +
      '<div class="progress-bar" aria-live="polite"><span class="count" id="set-count"></span>' +
      '<div class="progress-track" aria-hidden="true"><div class="progress-fill" id="set-fill"></div></div>' +
      '<button type="button" class="btn" data-action="reset">Reset</button></div>' +
      '<section class="card" aria-labelledby="wu-title">' +
      '<div class="section-title"><h2 id="wu-title" style="margin-top:0">Warm-up</h2><span class="muted">' + esc(w.warmup.duration) + "</span></div>" +
      (w.warmup.intro ? '<p class="muted">' + md(w.warmup.intro) + "</p>" : "") +
      '<ol class="checklist">' + warm + "</ol>" +
      (w.warmup.note ? '<p class="small muted" style="margin-top:.5rem">' + md(w.warmup.note) + "</p>" : "") +
      "</section>" +
      '<h2>Workout</h2><ol class="ex-list">' + w.exercises.map(function (ex) { return exerciseCard(ex, id); }).join("") + "</ol>" +
      '<div class="day-actions"><button type="button" class="btn" data-action="reset">Reset this day</button></div>' +
      (notes ? "<h2>Notes for this day</h2>" + notes : "") +
      pager(id) + footer() + "</div>";
  }

  function viewRest(id, viaToday) {
    var d = weekEntry(id);
    var r = P.restDays[id] || {};
    var next = r.next ? weekEntry(r.next) : null;
    var isSunday = d.type === "optional";
    var icon = isSunday
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="15" cy="5" r="2"/><path d="M8 21l3-6 3 2v4M11 15l1-5-3 1-2 3M12 10l3 2 3-1"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z"/></svg>';
    var title = isSunday ? "Optional cardio or rest" : "Rest day";
    var body = isSunday
      ? "<p>" + md(r.intro) + '</p><p><a class="btn btn-primary" href="#/cardio">See cardio options</a> <a class="btn" href="#/saturday">Lower B session</a></p>'
      : '<p class="lead">No gym today. Recovery is part of the program.</p>';

    return '<div class="page">' +
      '<p class="eyebrow">' + esc(d.label) + (viaToday || id === todayId() ? " · Today" : "") + "</p>" +
      '<div class="card rest-hero">' + icon + "<h1>" + title + "</h1>" + body + "</div>" +
      (next ? '<a class="day-row" href="#/' + next.id + '" style="margin-bottom:1rem">' +
        '<span class="dow">Next</span><span class="info"><span class="session">' + esc(next.session) + "</span>" +
        '<span class="meta">' + esc(next.label) + (next.time !== "—" ? " · " + esc(next.time) : "") + "</span></span>" + ICON_CHEV + "</a>" : "") +
      '<div class="card"><h3 style="margin-top:0">Between sessions</h3><p>' + md(P.restDays.tip) + "</p></div>" +
      pager(id) + footer() + "</div>";
  }

  function viewSafety() {
    var s = P.safety;
    var warnIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l9.5 17h-19L12 3z"/><path d="M12 10v4.5M12 17.5v.01"/></svg>';
    var adj = s.adjustments.groups.map(function (g) {
      return '<div class="adjust"><h3>' + esc(g.title) + "</h3><p>" + md(g.text) + "</p>" +
        (g.sub ? '<p class="sub-note"><strong>If it hurts</strong>' + md(g.sub) + "</p>" : "") + "</div>";
    }).join("");
    return '<div class="page">' +
      '<p class="eyebrow">Safety &amp; form</p><h1>Train without flare-ups</h1>' +
      '<section class="warning" role="note" aria-labelledby="warn-title">' +
      '<h2 id="warn-title">' + warnIcon + esc(s.warning.title) + "</h2>" +
      list(s.warning.items) + "<p>" + md(s.warning.text) + "</p></section>" +
      '<div class="toc"><a href="#safety-rules">Safety rules</a><a href="#stop-set">When to stop a set</a><a href="#adjustments">Back &amp; shoulder</a></div>' +
      '<section class="card" id="safety-rules"><h2 style="margin-top:0">Important safety rules</h2>' +
      "<p>" + md(s.intro) + "</p>" + list(s.rules) + '<p class="small muted">' + md(s.rulesSource) + "</p></section>" +
      '<section class="card" id="stop-set"><h2 style="margin-top:0">' + esc(s.stopSet.title) + "</h2>" +
      "<p>" + md(s.stopSet.intro) + "</p>" + list(s.stopSet.items) + "<p><strong>" + md(s.stopSet.outro) + "</strong></p></section>" +
      '<section class="card" id="adjustments"><h2 style="margin-top:0">' + esc(s.adjustments.title) + "</h2>" + adj +
      '<p class="callout" style="margin-top:1rem">' + md(s.adjustments.outro) + "</p></section>" +
      footer() + "</div>";
  }

  function viewProgress() {
    var p = P.progression;
    return '<div class="page">' +
      '<p class="eyebrow">Progression</p><h1>How to get stronger</h1>' + paras(p.intro) +
      '<div class="toc"><a href="#double">Double progression</a><a href="#effort">Effort</a><a href="#starting">Starting weights</a><a href="#increments">Adding weight</a><a href="#first-weeks">First 4 weeks</a></div>' +
      '<section class="card" id="double"><h2 style="margin-top:0">' + esc(p.double.title) + "</h2>" +
      "<p>" + md(p.double.example) + "</p><p>" + md(p.double.tableIntro) + "</p>" +
      table(p.double.table) + paras(p.double.after) + "</section>" +
      '<section class="card" id="effort"><h2 style="margin-top:0">' + esc(p.effort.title) + "</h2>" +
      '<div class="callout"><span class="big-number">6–7 / 10</span>' + md(p.effort.target) + "</div>" +
      '<div class="callout"><span class="big-number">3–4 RIR</span>' + md(p.effort.rir) + "</div>" +
      paras(p.effort.after) + "</section>" +
      '<section class="card" id="starting"><h2 style="margin-top:0">' + esc(p.starting.title) + "</h2>" +
      paras(p.starting.intro) + table(p.starting.table) + "</section>" +
      '<section class="card" id="increments"><h2 style="margin-top:0">' + esc(p.increments.title) + "</h2>" +
      list(p.increments.items) + paras(p.increments.after) + "</section>" +
      '<section class="card" id="first-weeks"><h2 style="margin-top:0">' + esc(p.firstWeeks.title) + "</h2>" +
      "<p>" + md(p.firstWeeks.intro) + "</p>" + table(p.firstWeeks.table) + paras(p.firstWeeks.after) + "</section>" +
      '<p class="muted small">See also: <a href="#/safety">when to stop a set</a>.</p>' +
      footer() + "</div>";
  }

  function viewCardio() {
    var c = P.cardio, n = P.nutrition, r = P.routine, t = P.tracking;
    var options = c.options.map(function (o) {
      return '<div class="card"><div class="option-head"><span class="option-key" aria-hidden="true">' + esc(o.key) + "</span>" +
        "<h3>Option " + esc(o.key) + ": " + esc(o.title) + "</h3>" +
        (o.duration ? '<span class="pill">' + esc(o.duration) + "</span>" : "") + "</div>" +
        paras(o.body) + (o.table ? table(o.table) : "") + paras(o.after) + "</div>";
    }).join("");
    return '<div class="page">' +
      '<p class="eyebrow">Cardio &amp; food</p><h1>Cardio, nutrition &amp; routine</h1>' +
      '<div class="toc"><a href="#cardio">Weekend cardio</a><a href="#nutrition">Nutrition</a><a href="#shake">Shake</a><a href="#weigh-in">Weigh-in</a><a href="#routine">06:30 routine</a><a href="#tracking">What to track</a></div>' +
      '<section id="cardio"><h2>' + esc(c.title) + "</h2>" + paras(c.intro) + options +
      '<p class="callout">' + md(c.recommendation) + "</p>" + "<p>" + md(c.outro) + "</p></section>" +
      '<section id="nutrition"><h2>' + esc(n.title) + "</h2>" + paras(n.intro) +
      '<div class="card"><h3 style="margin-top:0">' + esc(n.targets.title) + "</h3>" + table(n.targets.table) + paras(n.targets.after) + "</div>" +
      '<div class="card" id="shake"><h3 style="margin-top:0">' + esc(n.shake.title) + "</h3>" +
      "<p>" + md(n.shake.intro) + "</p>" + list(n.shake.ingredients) + "<p><strong>" + md(n.shake.method) + "</strong></p>" +
      paras(n.shake.after) + "<p>" + md(n.shake.foods) + "</p></div>" +
      '<div class="card" id="weigh-in"><h3 style="margin-top:0">' + esc(n.weighIn.title) + "</h3>" +
      "<p>" + md(n.weighIn.intro) + "</p>" + list(n.weighIn.steps, true) + "<p>" + md(n.weighIn.after) + "</p></div>" +
      '<p class="sub-note"><strong>Reflux</strong>' + md(n.reflux) + "</p></section>" +
      '<section id="routine"><h2>' + esc(r.title) + "</h2>" + paras(r.intro) + table(r.table) +
      '<div class="card">' + paras(r.after) + "</div>" +
      '<div class="card"><h3 style="margin-top:0">' + esc(r.adjustment.title) + "</h3>" + paras(r.adjustment.body) + "</div></section>" +
      '<section id="tracking"><h2>' + esc(t.title) + "</h2>" + paras(t.intro) + table(t.table) +
      '<div class="card">' + paras(t.after) + "</div></section>" +
      footer() + "</div>";
  }

  // ---------------------------------------------------------------------------
  // Set checkbox behaviour (event delegation, in-memory only)
  // ---------------------------------------------------------------------------
  function updateProgress(page) {
    var count = document.getElementById("set-count");
    if (!count) return;
    var boxes = page.querySelectorAll(".set-toggle input");
    var done = 0;
    boxes.forEach(function (b) { if (b.checked) done++; });
    count.textContent = done + " / " + boxes.length + " sets";
    document.getElementById("set-fill").style.width = (boxes.length ? (done / boxes.length) * 100 : 0) + "%";
    page.querySelectorAll(".ex-card").forEach(function (card) {
      var inputs = card.querySelectorAll(".set-toggle input");
      var all = inputs.length > 0;
      inputs.forEach(function (i) { if (!i.checked) all = false; });
      card.classList.toggle("done", all);
    });
  }

  main.addEventListener("change", function (e) {
    var input = e.target;
    var page = input.closest("[data-day]");
    if (!page || !input.dataset.key) return;
    var day = page.dataset.day;
    ticks[day] = ticks[day] || {};
    if (input.checked) ticks[day][input.dataset.key] = true;
    else delete ticks[day][input.dataset.key];
    updateProgress(page);
  });

  main.addEventListener("click", function (e) {
    var btn = e.target.closest('[data-action="reset"]');
    if (!btn) return;
    var page = btn.closest("[data-day]");
    delete ticks[page.dataset.day];
    page.querySelectorAll('input[type="checkbox"]').forEach(function (i) { i.checked = false; });
    updateProgress(page);
  });

  // In-page anchor links (#section) would clash with hash routing; scroll instead.
  main.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var href = a.getAttribute("href");
    if (href.charAt(1) === "/") return;
    e.preventDefault();
    var target = document.getElementById(href.slice(1));
    if (target) {
      if (target.tagName === "DETAILS") target.open = true;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // ---------------------------------------------------------------------------
  // Router
  // ---------------------------------------------------------------------------
  var TITLES = { week: "Week", safety: "Safety & form", progress: "Progression", cardio: "Cardio & nutrition" };

  function render() {
    var route = (location.hash.replace(/^#\/?/, "").split(/[/?]/)[0] || "").toLowerCase();
    var nav = route || "week";
    var html, title;
    var viaToday = route === "today";
    var dayId = viaToday ? todayId() : route;

    if (!route) { html = viewWeek(); title = TITLES.week; }
    else if (route === "safety") { html = viewSafety(); title = TITLES.safety; }
    else if (route === "progress") { html = viewProgress(); title = TITLES.progress; }
    else if (route === "cardio") { html = viewCardio(); title = TITLES.cardio; }
    else if (weekEntry(dayId)) {
      var d = weekEntry(dayId);
      html = P.workouts[dayId] ? viewWorkout(dayId, viaToday) : viewRest(dayId, viaToday);
      title = d.label + (P.workouts[dayId] ? " — " + P.workouts[dayId].session : "");
      nav = viaToday || dayId === todayId() ? "today" : "week";
    } else {
      html = '<div class="page"><h1>Page not found</h1><p><a class="btn btn-primary" href="#/">Back to the week</a></p>' + footer() + "</div>";
      title = "Not found";
      nav = "";
    }

    main.innerHTML = html;
    document.title = title + " · gymlog";
    document.querySelectorAll(".bottom-nav a").forEach(function (a) {
      if (a.dataset.nav === nav) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    var page = main.querySelector("[data-day]");
    if (page) updateProgress(page);
    window.scrollTo(0, 0);
  }

  function setDate() {
    var el = document.getElementById("topbar-date");
    if (!el) return;
    try {
      el.textContent = new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "short" });
    } catch (e) {
      el.textContent = weekEntry(todayId()).label;
    }
  }

  window.addEventListener("hashchange", render);
  setDate();
  render();
})();
