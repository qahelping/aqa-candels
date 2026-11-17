const sessions = [
  { id: "2026-11-17", label: "Вт, 17 ноября", remaining: 1 },
  { id: "2026-11-19", label: "Чт, 19 ноября", remaining: 1 },
  { id: "2026-11-24", label: "Вт, 24 ноября", remaining: 1 },
  { id: "2026-11-26", label: "Чт, 26 ноября", remaining: 5 },
];

const form = document.querySelector("form");
const date = form.elements.session;
const button = form.querySelector("button");
const status = document.querySelector("#status");

const places = new Intl.PluralRules("ru");
const placeLabels = { one: "свободное место", few: "свободных места", many: "свободных мест" };

function updateDates() {
  const available = sessions.filter((session) => session.remaining > 0);
  const placeholder = new Option(available.length ? "Выберите дату" : "Свободных мест нет", "");
  placeholder.disabled = true;
  date.replaceChildren(placeholder, ...available.map(
    ({ id, label, remaining }) => new Option(`${label} · ${remaining} ${placeLabels[places.select(remaining)]}`, id),
  ));
  date.value = "";
  date.disabled = button.disabled = available.length === 0;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const session = sessions.find(({ id }) => id === date.value);
  if (!session || session.remaining < 1) return;

  session.remaining -= 1;
  form.reset();
  updateDates();
  status.textContent = `Тестовая заявка на ${session.label.toLowerCase()} принята в деморежиме.`;
});

updateDates();
