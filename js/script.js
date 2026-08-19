document.addEventListener("DOMContentLoaded", () => {
  const h = document.querySelector(".site-header"),
    t = document.querySelector(".nav-toggle"),
    m = document.querySelector(".nav-menu"),
    links = [...document.querySelectorAll(".nav-link")],
    sections = [...document.querySelectorAll("main section[id]")],
    items = document.querySelectorAll(".reveal"),
    year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  t?.addEventListener("click", () => {
    const open = m.classList.toggle("open");
    t.setAttribute("aria-expanded", open);
    t.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  links.forEach((l) =>
    l.addEventListener("click", () => {
      m.classList.remove("open");
      t?.setAttribute("aria-expanded", "false");
    }),
  );
  const update = () => h?.classList.toggle("scrolled", scrollY > 20);
  update();
  addEventListener("scroll", update, { passive: true });
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 },
  );
  items.forEach((i) => io.observe(i));
  const so = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting)
          links.forEach((l) =>
            l.classList.toggle(
              "active",
              l.getAttribute("href") === `#${e.target.id}`,
            ),
          );
      }),
    { rootMargin: "-35% 0px -55% 0px" },
  );
  sections.forEach((s) => so.observe(s));
});
