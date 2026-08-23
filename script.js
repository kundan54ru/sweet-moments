document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Lightweight reveal animation. Disabled automatically for reduced-motion users.
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduced && "IntersectionObserver" in window) {
    const style = document.createElement("style");
    style.textContent = ".reveal{opacity:0;transform:translateY(16px);transition:opacity .55s ease,transform .55s ease}.reveal.visible{opacity:1;transform:none}";
    document.head.appendChild(style);

    const targets = document.querySelectorAll(".category-card,.feature,.gallery-item,.location-card,.order-inner");
    targets.forEach(el => el.classList.add("reveal"));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach(el => observer.observe(el));
  }

  // Keeps CTA tracking hooks simple for Google Ads / GA4 later.
  document.querySelectorAll('a[href^="tel:"], a[href*="wa.me"]').forEach(link => {
    link.addEventListener("click", () => {
      const type = link.href.startsWith("tel:") ? "phone_click" : "whatsapp_click";
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: type, business: "Sweet Moments" });
    });
  });
});
