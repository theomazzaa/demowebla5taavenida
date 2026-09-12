// Live "abierto / cerrado" indicator, computed in America/Argentina/Buenos_Aires
// regardless of the visitor's own timezone.
//
// Horario real del local:
//   Lunes a viernes  8:00–17:30
//   Sábado           8:00–16:30
//   Domingo          cerrado

const SCHEDULE = {
  1: { open: 8 * 60, close: 17 * 60 + 30 }, // lunes
  2: { open: 8 * 60, close: 17 * 60 + 30 },
  3: { open: 8 * 60, close: 17 * 60 + 30 },
  4: { open: 8 * 60, close: 17 * 60 + 30 },
  5: { open: 8 * 60, close: 17 * 60 + 30 },
  6: { open: 8 * 60, close: 16 * 60 + 30 }, // sábado
  0: null, // domingo, cerrado
};

const DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const TIME_ZONE = "America/Argentina/Buenos_Aires";
const REFRESH_MS = 60 * 1000;

function getBuenosAiresParts() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(new Date());
  const lookup = Object.fromEntries(parts.map((p) => [p.type, p.value]));

  const weekdayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const day = weekdayMap[lookup.weekday];
  const hour = Number(lookup.hour) % 24;
  const minute = Number(lookup.minute);

  return { day, minutes: hour * 60 + minute };
}

function formatHHMM(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}:${String(m).padStart(2, "0")}`;
}

function nextOpening(day) {
  for (let offset = 1; offset <= 7; offset++) {
    const nextDay = (day + offset) % 7;
    const schedule = SCHEDULE[nextDay];
    if (schedule) {
      return { dayName: DAY_NAMES[nextDay], open: schedule.open };
    }
  }
  return null;
}

function computeStatus() {
  const { day, minutes } = getBuenosAiresParts();
  const schedule = SCHEDULE[day];
  const isOpenToday = schedule && minutes >= schedule.open && minutes < schedule.close;

  if (isOpenToday) {
    return { isOpen: true, text: `Abierto ahora · cierra ${formatHHMM(schedule.close)}` };
  }

  const upcoming = nextOpening(day);
  const beforeOpeningToday = schedule && minutes < schedule.open;

  if (beforeOpeningToday) {
    return { isOpen: false, text: `Cerrado · abre hoy a las ${formatHHMM(schedule.open)}` };
  }

  if (upcoming) {
    return { isOpen: false, text: `Cerrado · abre ${upcoming.dayName} a las ${formatHHMM(upcoming.open)}` };
  }

  return { isOpen: false, text: "Cerrado" };
}

export function initHours() {
  const dot = document.getElementById("statusDot");
  const text = document.getElementById("statusText");
  if (!dot || !text) return;

  const render = () => {
    const status = computeStatus();
    dot.classList.toggle("is-open", status.isOpen);
    dot.classList.toggle("is-closed", !status.isOpen);
    text.textContent = status.text;
  };

  render();
  setInterval(render, REFRESH_MS);
}
