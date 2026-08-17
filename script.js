/* Scroll reveal: fades elements in once, the first time they enter the viewport.
   The .js class is set inline in the <head> so content is never hidden when
   JavaScript is unavailable. */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(".reveal");

  if (reduced || !("IntersectionObserver" in window)) {
    for (var i = 0; i < targets.length; i++) {
      targets[i].classList.add("is-visible");
    }
    return;
  }

  // Stagger siblings slightly so groups of cards cascade instead of popping.
  var groups = document.querySelectorAll("[data-stagger]");
  for (var g = 0; g < groups.length; g++) {
    var children = groups[g].querySelectorAll(".reveal");
    for (var c = 0; c < children.length; c++) {
      children[c].style.setProperty("--delay", Math.min(c, 6) * 0.07 + "s");
    }
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();
