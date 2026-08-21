(function () {
  // Lewati di perangkat tanpa mouse (touchscreen), supaya tidak mengganggu
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  var cursor = document.createElement("div");
  cursor.className = "bkm-cursor";
  cursor.textContent = "</>";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  var interactiveSelector = "a, button, input, textarea, select, [role='button'], .bkm-card, .bkm-project-row";

  document.addEventListener("mouseover", function (e) {
    if (e.target.closest(interactiveSelector)) {
      cursor.classList.add("is-active");
    }
  });

  document.addEventListener("mouseout", function (e) {
    if (e.target.closest(interactiveSelector)) {
      cursor.classList.remove("is-active");
    }
  });

  // Sembunyikan saat mouse keluar dari jendela browser
  document.addEventListener("mouseleave", function () {
    cursor.style.opacity = "0";
  });
  document.addEventListener("mouseenter", function () {
    cursor.style.opacity = "1";
  });
})();
