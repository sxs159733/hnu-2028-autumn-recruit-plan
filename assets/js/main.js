/* 湖南大学 2028 届秋招求职作战计划 · 交互脚本
   仅依赖浏览器原生 API，无第三方库 */
(function () {
  "use strict";

  /* 移动端导航开合 */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) nav.classList.remove("open");
    });
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) nav.classList.remove("open");
    });
  }

  /* 当前页高亮 */
  var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav a, .footer .f-links a").forEach(function (a) {
    var href = (a.getAttribute("href") || "").split("#")[0].split("/").pop().toLowerCase();
    if (href === here) a.classList.add("active");
  });

  /* 回到顶部 */
  var back = document.querySelector(".backtop");
  if (back) {
    back.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", function () {
      back.classList.toggle("show", window.scrollY > 420);
    }, { passive: true });
  }

  /* 行动清单勾选状态本地保存（仅本机浏览器，不影响站点内容） */
  var boxes = document.querySelectorAll(".checklist input[type=checkbox]");
  if (boxes.length) {
    var KEY = "hnu2028-plan-checklist-v1";
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { saved = {}; }
    boxes.forEach(function (b, i) {
      var id = b.dataset.id || String(i);
      if (saved[id]) b.checked = true;
      b.addEventListener("change", function () {
        saved[id] = b.checked;
        try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {}
      });
    });
  }
})();
