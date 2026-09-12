// Carta: switches between Cafetería / Sushi / Minutas panels.

export function initMenuTabs() {
  const tabsContainer = document.getElementById("menuTabs");
  if (!tabsContainer) return;

  const tabs = Array.from(tabsContainer.querySelectorAll(".menu-tab"));

  const activate = (tab) => {
    tabs.forEach((btn) => {
      const isActive = btn === tab;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", String(isActive));

      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (panel) {
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      }
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab));
  });
}
