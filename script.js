// Set this to your App Store link (for example https://apps.apple.com/app/idXXXXXXXXX)
const DOWNLOAD_URL = "";

document.querySelectorAll("[data-download]").forEach(a => {
  if (DOWNLOAD_URL) { a.href = DOWNLOAD_URL; a.rel = "noopener"; }
});

const nav = document.getElementById("nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 8), { passive: true });

const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

const flip = document.getElementById("flip");
if (flip) flip.addEventListener("click", () => flip.classList.toggle("on"));

const yr = document.getElementById("yr");
if (yr) yr.textContent = new Date().getFullYear();
