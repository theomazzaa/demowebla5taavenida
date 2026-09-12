import { initNav } from "./nav.js";
import { initHours } from "./hours.js";
import { initMenuTabs } from "./menuTabs.js";

initNav();
initHours();
initMenuTabs();

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
