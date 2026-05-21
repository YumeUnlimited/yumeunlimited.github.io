const body = document.body;
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("[data-nav-menu]");
const year = document.querySelector("[data-year]");
const contactForm = document.querySelector("[data-contact-form]");

const contactEmail = "yumeunlimited@gmail.com";
const isJapanesePage = document.documentElement.lang.startsWith("ja");

if (year) {
  year.textContent = new Date().getFullYear();
}

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const projectType = String(formData.get("projectType") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const subjectText = isJapanesePage
    ? `ゲームプロジェクトのお問い合わせ: ${name || "訪問者"}`
    : `Game project inquiry from ${name || "a visitor"}`;
  const subject = encodeURIComponent(subjectText);
  const bodyLines = isJapanesePage
    ? [`お名前: ${name}`, `メール: ${email}`, `プロジェクト種別: ${projectType}`, "", message]
    : [`Name: ${name}`, `Email: ${email}`, `Project type: ${projectType}`, "", message];
  const bodyText = encodeURIComponent(
    bodyLines.join("\n"),
  );

  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${bodyText}`;
});
