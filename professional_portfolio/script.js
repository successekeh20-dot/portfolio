const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const backdrop = document.getElementById("backdrop");
const navLinks = [...document.querySelectorAll(".nav-link")];
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");

function setMenu(open) {
  sidebar.classList.toggle("open", open);
  backdrop.classList.toggle("show", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
}
menuToggle.addEventListener("click", () => setMenu(!sidebar.classList.contains("open")));
backdrop.addEventListener("click", () => setMenu(false));
navLinks.forEach(link => link.addEventListener("click", () => {
  navLinks.forEach(item => item.classList.remove("active"));
  link.classList.add("active");
  setMenu(false);
}));

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") document.documentElement.dataset.theme = "light";
function updateThemeButton() {
  const isLight = document.documentElement.dataset.theme === "light";
  themeIcon.textContent = isLight ? "☀" : "☾";
  themeLabel.textContent = isLight ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
}
updateThemeButton();
themeToggle.addEventListener("click", () => {
  const isLight = document.documentElement.dataset.theme === "light";
  if (isLight) delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = "light";
  localStorage.setItem("portfolio-theme", isLight ? "dark" : "light");
  updateThemeButton();
});

const sections = [...document.querySelectorAll("main section[id]")];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => observer.observe(section));

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const recipient = "hello@example.com"; // Replace with your real email address.
  const subject = encodeURIComponent(`${data.get("subject")} — ${data.get("name")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nTopic: ${data.get("subject")}\n\n${data.get("message")}`
  );
  document.getElementById("formNote").textContent = "Opening your email application with the message details. Replace hello@example.com in script.js with your email.";
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});
