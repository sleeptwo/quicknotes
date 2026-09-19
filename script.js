const DOWNLOAD_URL = "https://apps.apple.com/app/id6744976924";
const AMPLITUDE_KEY = "717678053f0486b434033c9246b845f3";

// Web analytics: page views and download-button clicks go to Amplitude,
// tagged platform=website so they stay separate from in-app events.
const track = (name, props = {}) => {
  try { window.amplitude && amplitude.track(name, { platform: "website", ...props }); } catch (e) {}
};
try {
  if (window.amplitude) {
    amplitude.init(AMPLITUDE_KEY, { autocapture: false, defaultTracking: false });
    track("website_page_view", { path: location.pathname, referrer: document.referrer || "direct" });
  }
} catch (e) {}

document.querySelectorAll("[data-download]").forEach(a => {
  a.href = DOWNLOAD_URL;
  a.rel = "noopener";
  a.addEventListener("click", () => track("website_download_click", { button_location: a.dataset.place || "unknown" }));
});

const nav = document.getElementById("nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 8), { passive: true });

const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

const flip = document.getElementById("flip");
if (flip) flip.addEventListener("click", () => { flip.classList.toggle("on"); track("website_flashcard_flip"); });

const yr = document.getElementById("yr");
if (yr) yr.textContent = new Date().getFullYear();
