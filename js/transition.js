document.addEventListener("DOMContentLoaded", () => {

  const transition = document.getElementById("page-transition");

  document.querySelectorAll("a[href]").forEach(link => {
    link.addEventListener("click", e => {

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http")) return;

      const currentPage = window.location.pathname.split("/").pop();
      if (href === currentPage) return;

      e.preventDefault();

      transition.classList.add("active");
      document.body.style.overflow = "hidden";

      // Dans transition.js
      setTimeout(() => {
        window.location.href = href;
      }, 1000); // Passage de 700ms à 1000ms
    });
  });

});