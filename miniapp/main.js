const telegram = window.Telegram?.WebApp;
const startButton = document.querySelector("[data-start-onboarding]");
const continueGoalButton = document.querySelector("[data-continue-goal]");
const continueSexButton = document.querySelector("[data-continue-sex]");
const continueAgeButton = document.querySelector("[data-continue-age]");
const continueHeightButton = document.querySelector("[data-continue-height]");
const continueWeightButton = document.querySelector("[data-continue-weight]");
const continueActivityButton = document.querySelector("[data-continue-activity]");
const continueSummaryButton = document.querySelector("[data-continue-summary]");
const continuePlanPrepButton = document.querySelector("[data-continue-plan-prep]");
const continueTargetsResultButton = document.querySelector("[data-continue-targets-result]");
const dashboardFocus = document.querySelector("[data-dashboard-focus]");
const dashboardDailyFocus = document.querySelector("[data-dashboard-daily-focus]");
const dashboardPrimaryButton = document.querySelector("[data-dashboard-primary]");
const dashboardCards = [...document.querySelectorAll("[data-dashboard-open]")];
const nutritionFocus = document.querySelector("[data-nutrition-focus]");
const nutritionDailyFocus = document.querySelector("[data-nutrition-daily-focus]");
const nutritionPrimaryButton = document.querySelector("[data-nutrition-primary]");
const nutritionLogInput = document.querySelector("[data-nutrition-log-input]");
const nutritionLogContinueButton = document.querySelector("[data-nutrition-log-continue]");
const nutritionLogNote = document.querySelector("[data-nutrition-log-note]");
const nutritionLogReviewText = document.querySelector("[data-nutrition-log-review-text]");
const nutritionLogConfirmButton = document.querySelector("[data-nutrition-log-confirm]");
const nutritionLogEditButton = document.querySelector("[data-nutrition-log-edit]");
const nutritionLogConfirmText = document.querySelector("[data-nutrition-log-confirm-text]");
const nutritionLogNewButton = document.querySelector("[data-nutrition-log-new]");
const nutritionLogHomeButton = document.querySelector("[data-nutrition-log-home]");
const nutritionCards = [...document.querySelectorAll("[data-nutrition-open]")];
const trainingFocus = document.querySelector("[data-training-focus]");
const trainingDailyFocus = document.querySelector("[data-training-daily-focus]");
const trainingPrimaryButton = document.querySelector("[data-training-primary]");
const trainingLogInput = document.querySelector("[data-training-log-input]");
const trainingLogContinueButton = document.querySelector("[data-training-log-continue]");
const trainingLogNote = document.querySelector("[data-training-log-note]");
const trainingLogReviewText = document.querySelector("[data-training-log-review-text]");
const trainingLogConfirmButton = document.querySelector("[data-training-log-confirm]");
const trainingLogEditButton = document.querySelector("[data-training-log-edit]");
const trainingLogConfirmText = document.querySelector("[data-training-log-confirm-text]");
const trainingLogNewButton = document.querySelector("[data-training-log-new]");
const trainingLogHomeButton = document.querySelector("[data-training-log-home]");
const trainingCards = [...document.querySelectorAll("[data-training-open]")];
const progressFocus = document.querySelector("[data-progress-focus]");
const progressDailyFocus = document.querySelector("[data-progress-daily-focus]");
const progressPrimaryButton = document.querySelector("[data-progress-primary]");
const progressWeightInput = document.querySelector("[data-progress-weight-input]");
const progressWeightContinueButton = document.querySelector("[data-progress-weight-continue]");
const progressWeightNote = document.querySelector("[data-progress-weight-note]");
const progressWeightReviewText = document.querySelector("[data-progress-weight-review-text]");
const progressWeightConfirmButton = document.querySelector("[data-progress-weight-confirm]");
const progressWeightEditButton = document.querySelector("[data-progress-weight-edit]");
const progressWeightConfirmText = document.querySelector("[data-progress-weight-confirm-text]");
const progressWeightNewButton = document.querySelector("[data-progress-weight-new]");
const progressWeightHomeButton = document.querySelector("[data-progress-weight-home]");
const progressCheckinOptions = [...document.querySelectorAll("[data-progress-checkin]")];
const progressCheckinContinueButton = document.querySelector("[data-progress-checkin-continue]");
const progressCards = [...document.querySelectorAll("[data-progress-open]")];
const goalNote = document.querySelector("[data-goal-note]");
const sexNote = document.querySelector("[data-sex-note]");
const ageNote = document.querySelector("[data-age-note]");
const heightNote = document.querySelector("[data-height-note]");
const weightNote = document.querySelector("[data-weight-note]");
const activityNote = document.querySelector("[data-activity-note]");
const ageInput = document.querySelector("[data-age-input]");
const heightInput = document.querySelector("[data-height-input]");
const weightInput = document.querySelector("[data-weight-input]");
const goalOptions = [...document.querySelectorAll("[data-goal]")];
const sexOptions = [...document.querySelectorAll("[data-sex]")];
const activityOptions = [...document.querySelectorAll("[data-activity]")];
const summaryFields = {
  goal: document.querySelector("[data-summary-goal]"),
  sex: document.querySelector("[data-summary-sex]"),
  age: document.querySelector("[data-summary-age]"),
  height: document.querySelector("[data-summary-height]"),
  weight: document.querySelector("[data-summary-weight]"),
  activity: document.querySelector("[data-summary-activity]"),
};
const resultFields = {
  goal: document.querySelector("[data-result-goal]"),
  age: document.querySelector("[data-result-age]"),
  height: document.querySelector("[data-result-height]"),
  weight: document.querySelector("[data-result-weight]"),
  activity: document.querySelector("[data-result-activity]"),
  guidanceTitle: document.querySelector("[data-target-guidance-title]"),
  guidance1: document.querySelector("[data-target-guidance-1]"),
  guidance2: document.querySelector("[data-target-guidance-2]"),
  guidance3: document.querySelector("[data-target-guidance-3]"),
};
const screens = [...document.querySelectorAll("[data-screen]")];
const state = {
  screen: "welcome",
  goal: null,
  sex: null,
  age: null,
  height: null,
  weight: null,
  activity: null,
  nutritionLogText: "",
  trainingLogText: "",
  progressWeightText: "",
  progressCheckinStatus: "",
};
const goalLabels = {
  "fat-loss": "Похудеть",
  "muscle-gain": "Набрать массу",
  maintenance: "Поддерживать форму",
};
const sexLabels = {
  male: "Мужчина",
  female: "Женщина",
};
const activityLabels = {
  low: "Низкая",
  moderate: "Умеренная",
  high: "Высокая",
  "very-high": "Очень высокая",
};
const targetGuidance = {
  "fat-loss": {
    title: "Фокус по цели",
    items: [
      "Держи дефицит и не распыляйся на лишние шаги.",
      "Ставь в приоритет регулярный лог питания.",
      "Следи за весом и динамикой без спешки.",
    ],
  },
  "muscle-gain": {
    title: "Фокус по цели",
    items: [
      "Сделай питание стабильным и держи восстановление.",
      "Сохраняй регулярные тренировки без больших провалов.",
      "Отслеживай вес и прогресс по нагрузке.",
    ],
  },
  maintenance: {
    title: "Фокус по цели",
    items: [
      "Держи ровный режим и не усложняй процесс.",
      "Логируй питание регулярно, без перегруза.",
      "Смотри на стабильность и общий прогресс.",
    ],
  },
};
const dashboardCopy = {
  "fat-loss": {
    focus: "Сегодняшний фокус: стабильность, лог питания и контроль веса.",
    daily: "Начни с первого приёма пищи и короткой записи.",
    primary: "Записать приём пищи",
  },
  "muscle-gain": {
    focus: "Сегодняшний фокус: питание, восстановление и тренировки без провалов.",
    daily: "Начни с первого приёма пищи и отметь тренировочный план.",
    primary: "Записать приём пищи",
  },
  maintenance: {
    focus: "Сегодняшний фокус: баланс, регулярность и спокойный контроль.",
    daily: "Начни с первой записи и удержи ровный ритм дня.",
    primary: "Записать приём пищи",
  },
};
const nutritionCopy = {
  "fat-loss": {
    focus: "Начни с простого: фиксируй приёмы пищи и держи режим под контролем.",
    daily: "Начни с первого приёма пищи сегодня.",
  },
  "muscle-gain": {
    focus: "Начни с простого: фиксируй приёмы пищи и держи режим под контролем.",
    daily: "Зафиксируй то, что уже съел сегодня, без лишней точности.",
  },
  maintenance: {
    focus: "Начни с простого: фиксируй приёмы пищи и держи режим под контролем.",
    daily: "Соблюдай режим и следи за регулярностью.",
  },
};
const trainingCopy = {
  "fat-loss": {
    focus: "Держи ритм тренировок и отмечай ключевые шаги без лишней сложности.",
    daily: "Начни с фиксации сегодняшней тренировки.",
  },
  "muscle-gain": {
    focus: "Держи ритм тренировок и отмечай ключевые шаги без лишней сложности.",
    daily: "Если уже тренировался, просто отметь это.",
  },
  maintenance: {
    focus: "Держи ритм тренировок и отмечай ключевые шаги без лишней сложности.",
    daily: "Стабильность важнее идеального старта.",
  },
};
const progressCopy = {
  "fat-loss": {
    focus: "Следи за изменениями спокойно и регулярно, без перегруза и лишнего шума.",
    daily: "Начни с фиксации текущего веса.",
  },
  "muscle-gain": {
    focus: "Следи за изменениями спокойно и регулярно, без перегруза и лишнего шума.",
    daily: "Отмечай изменения регулярно, а не идеально.",
  },
  maintenance: {
    focus: "Следи за изменениями спокойно и регулярно, без перегруза и лишнего шума.",
    daily: "Прогресс виден лучше, когда записи стабильны.",
  },
};
const sectionReturnMap = {
  nutrition: "nutrition-home",
  training: "training-home",
  progress: "progress-home",
};
const sectionHomeReturnTarget = "dashboard-home";
const sectionBackLabelMap = {
  nutrition: "Назад к питанию",
  training: "Назад к тренировкам",
  progress: "Назад к прогрессу",
};
const sectionHomeBackLabel = "Назад к панели";

telegram?.ready();
telegram?.expand();

if (telegram?.themeParams?.bg_color) {
  document.documentElement.style.setProperty("--bg", telegram.themeParams.bg_color);
}

function wireSectionBackButtons() {
  screens.forEach((screen) => {
    const screenName = screen.dataset.screen ?? "";
    const sectionKey = Object.keys(sectionReturnMap).find((key) => screenName.startsWith(`${key}-`));

    if (!sectionKey || screen.querySelector("[data-section-back]")) {
      return;
    }

    const header = screen.querySelector(".step-header");
    if (!header) {
      return;
    }

    const isSectionHome = screenName === `${sectionKey}-home`;

    const backButton = document.createElement("button");
    backButton.type = "button";
    backButton.className = "header-back";
    backButton.dataset.sectionBack = isSectionHome ? sectionHomeReturnTarget : sectionReturnMap[sectionKey];
    backButton.setAttribute("aria-label", isSectionHome ? sectionHomeBackLabel : sectionBackLabelMap[sectionKey] ?? "Назад");
    backButton.title = isSectionHome ? sectionHomeBackLabel : sectionBackLabelMap[sectionKey] ?? "Назад";
    backButton.textContent = "←";

    const headerGroup = document.createElement("div");
    headerGroup.className = "section-header";
    headerGroup.appendChild(backButton);

    header.insertBefore(headerGroup, header.firstChild);
  });
}

wireSectionBackButtons();

function showScreen(screen) {
  state.screen = screen;
  document.body.dataset.step = screen;
  screens.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.screen === screen);
  });
  window.location.hash = screen;
}

function selectGoal(goal) {
  state.goal = goal;
  document.body.dataset.hasGoal = "true";

  goalOptions.forEach((option) => {
    const isSelected = option.dataset.goal === goal;
    option.classList.toggle("is-selected", isSelected);
    option.setAttribute("aria-checked", String(isSelected));
  });

  if (continueGoalButton) {
    continueGoalButton.disabled = false;
  }

  if (goalNote) {
    goalNote.textContent = "Цель выбрана.";
  }
}

function selectSex(sex) {
  state.sex = sex;
  document.body.dataset.hasSex = "true";

  sexOptions.forEach((option) => {
    const isSelected = option.dataset.sex === sex;
    option.classList.toggle("is-selected", isSelected);
    option.setAttribute("aria-checked", String(isSelected));
  });

  if (continueSexButton) {
    continueSexButton.disabled = false;
  }

  if (sexNote) {
    sexNote.textContent = "Пол выбран.";
  }
}

function parseAge(value) {
  if (!/^\d+$/.test(value)) {
    return null;
  }

  const age = Number(value);
  return age >= 14 && age <= 80 ? age : null;
}

function updateAge(value) {
  const numericValue = value.replace(/\D/g, "").slice(0, 2);

  if (ageInput && ageInput.value !== numericValue) {
    ageInput.value = numericValue;
  }

  const age = parseAge(numericValue);
  state.age = age;
  document.body.dataset.hasAge = age ? "true" : "false";

  if (continueAgeButton) {
    continueAgeButton.disabled = age === null;
  }

  if (!ageNote) {
    return;
  }

  if (numericValue.length === 0) {
    ageNote.textContent = "Введите возраст числом.";
    return;
  }

  ageNote.textContent = age === null
    ? "Возраст должен быть от 14 до 80."
    : "Возраст принят.";
}

function parseHeight(value) {
  if (!/^\d+$/.test(value)) {
    return null;
  }

  const height = Number(value);
  return height >= 120 && height <= 230 ? height : null;
}

function updateHeight(value) {
  const numericValue = value.replace(/\D/g, "").slice(0, 3);

  if (heightInput && heightInput.value !== numericValue) {
    heightInput.value = numericValue;
  }

  const height = parseHeight(numericValue);
  state.height = height;
  document.body.dataset.hasHeight = height ? "true" : "false";

  if (continueHeightButton) {
    continueHeightButton.disabled = height === null;
  }

  if (!heightNote) {
    return;
  }

  if (numericValue.length === 0) {
    heightNote.textContent = "Введите рост числом.";
    return;
  }

  heightNote.textContent = height === null
    ? "Рост должен быть от 120 до 230 см."
    : "Рост принят.";
}

function normalizeWeightInput(value) {
  const normalized = value.replace(",", ".").replace(/[^\d.]/g, "");
  const [integerPart = "", decimalPart = ""] = normalized.split(".");
  const safeInteger = integerPart.slice(0, 3);
  const safeDecimal = decimalPart.slice(0, 1);

  return normalized.includes(".") && safeDecimal.length > 0
    ? `${safeInteger}.${safeDecimal}`
    : safeInteger;
}

function parseWeight(value) {
  if (!/^\d+(?:\.\d)?$/.test(value)) {
    return null;
  }

  const weight = Number(value);
  return weight >= 35 && weight <= 250 ? weight : null;
}

function updateWeight(value) {
  const numericValue = normalizeWeightInput(value);

  if (weightInput && weightInput.value !== numericValue) {
    weightInput.value = numericValue;
  }

  const weight = parseWeight(numericValue);
  state.weight = weight;
  document.body.dataset.hasWeight = weight ? "true" : "false";

  if (continueWeightButton) {
    continueWeightButton.disabled = weight === null;
  }

  if (!weightNote) {
    return;
  }

  if (numericValue.length === 0) {
    weightNote.textContent = "Введите вес числом.";
    return;
  }

  weightNote.textContent = weight === null
    ? "Вес должен быть от 35 до 250 кг."
    : "Вес принят.";
}

function selectActivity(activity) {
  state.activity = activity;
  document.body.dataset.hasActivity = "true";

  activityOptions.forEach((option) => {
    const isSelected = option.dataset.activity === activity;
    option.classList.toggle("is-selected", isSelected);
    option.setAttribute("aria-checked", String(isSelected));
  });

  if (continueActivityButton) {
    continueActivityButton.disabled = false;
  }

  if (activityNote) {
    activityNote.textContent = "Активность выбрана.";
  }
}

function renderSummary() {
  if (summaryFields.goal) {
    summaryFields.goal.textContent = goalLabels[state.goal] ?? "—";
  }

  if (summaryFields.sex) {
    summaryFields.sex.textContent = sexLabels[state.sex] ?? "—";
  }

  if (summaryFields.age) {
    summaryFields.age.textContent = state.age ? `${state.age} лет` : "—";
  }

  if (summaryFields.height) {
    summaryFields.height.textContent = state.height ? `${state.height} см` : "—";
  }

  if (summaryFields.weight) {
    summaryFields.weight.textContent = state.weight ? `${state.weight} кг` : "—";
  }

  if (summaryFields.activity) {
    summaryFields.activity.textContent = activityLabels[state.activity] ?? "—";
  }
}

function renderTargetsResult() {
  if (resultFields.goal) {
    resultFields.goal.textContent = goalLabels[state.goal] ?? "—";
  }

  if (resultFields.age) {
    resultFields.age.textContent = state.age ? `${state.age} лет` : "—";
  }

  if (resultFields.height) {
    resultFields.height.textContent = state.height ? `${state.height} см` : "—";
  }

  if (resultFields.weight) {
    resultFields.weight.textContent = state.weight ? `${state.weight} кг` : "—";
  }

  if (resultFields.activity) {
    resultFields.activity.textContent = activityLabels[state.activity] ?? "—";
  }

  const guidance = targetGuidance[state.goal] ?? targetGuidance.maintenance;

  if (resultFields.guidanceTitle) {
    resultFields.guidanceTitle.textContent = guidance.title;
  }

  if (resultFields.guidance1) {
    resultFields.guidance1.textContent = guidance.items[0];
  }

  if (resultFields.guidance2) {
    resultFields.guidance2.textContent = guidance.items[1];
  }

  if (resultFields.guidance3) {
    resultFields.guidance3.textContent = guidance.items[2];
  }
}

function renderDashboardHome() {
  const copy = dashboardCopy[state.goal] ?? dashboardCopy.maintenance;

  if (dashboardFocus) {
    dashboardFocus.textContent = copy.focus;
  }

  if (dashboardDailyFocus) {
    dashboardDailyFocus.textContent = copy.daily;
  }

  if (dashboardPrimaryButton) {
    dashboardPrimaryButton.textContent = copy.primary;
  }
}

function renderNutritionHome() {
  const copy = nutritionCopy[state.goal] ?? nutritionCopy.maintenance;

  if (nutritionFocus) {
    nutritionFocus.textContent = copy.focus;
  }

  if (nutritionDailyFocus) {
    nutritionDailyFocus.textContent = copy.daily;
  }

  if (nutritionPrimaryButton) {
    nutritionPrimaryButton.textContent = "Записать приём пищи";
  }
}

function renderNutritionLogEntry() {
  if (nutritionLogInput) {
    nutritionLogInput.value = state.nutritionLogText ?? "";
  }

  const isValid = isValidNutritionLogText(state.nutritionLogText ?? "");

  if (nutritionLogContinueButton) {
    nutritionLogContinueButton.disabled = !isValid;
  }

  if (nutritionLogNote) {
    nutritionLogNote.textContent = isValid
      ? "Запись выглядит нормально."
      : "Опиши еду коротко и по делу.";
  }
}

function renderNutritionLogReview() {
  if (nutritionLogReviewText) {
    nutritionLogReviewText.textContent = state.nutritionLogText?.trim() || "—";
  }
}

function renderNutritionLogConfirm() {
  if (nutritionLogConfirmText) {
    nutritionLogConfirmText.textContent = state.nutritionLogText?.trim() || "—";
  }
}

function renderTrainingHome() {
  const copy = trainingCopy[state.goal] ?? trainingCopy.maintenance;

  if (trainingFocus) {
    trainingFocus.textContent = copy.focus;
  }

  if (trainingDailyFocus) {
    trainingDailyFocus.textContent = copy.daily;
  }

  if (trainingPrimaryButton) {
    trainingPrimaryButton.textContent = "Записать тренировку";
  }
}

function renderTrainingLogEntry() {
  if (trainingLogInput) {
    trainingLogInput.value = state.trainingLogText ?? "";
  }

  const isValid = isValidTrainingLogText(state.trainingLogText ?? "");

  if (trainingLogContinueButton) {
    trainingLogContinueButton.disabled = !isValid;
  }

  if (trainingLogNote) {
    trainingLogNote.textContent = isValid
      ? "Запись выглядит нормально."
      : "Опиши тренировку коротко и по делу.";
  }
}

function renderTrainingLogReview() {
  if (trainingLogReviewText) {
    trainingLogReviewText.textContent = state.trainingLogText?.trim() || "—";
  }
}

function renderTrainingLogConfirm() {
  if (trainingLogConfirmText) {
    trainingLogConfirmText.textContent = state.trainingLogText?.trim() || "—";
  }
}

function renderProgressHome() {
  const copy = progressCopy[state.goal] ?? progressCopy.maintenance;

  if (progressFocus) {
    progressFocus.textContent = copy.focus;
  }

  if (progressDailyFocus) {
    progressDailyFocus.textContent = copy.daily;
  }

  if (progressPrimaryButton) {
    progressPrimaryButton.textContent = "Записать вес";
  }
}

function renderProgressWeightEntry() {
  if (progressWeightInput) {
    progressWeightInput.value = state.progressWeightText ?? "";
  }

  const isValid = isValidProgressWeightText(state.progressWeightText ?? "");

  if (progressWeightContinueButton) {
    progressWeightContinueButton.disabled = !isValid;
  }

  if (progressWeightNote) {
    progressWeightNote.textContent = isValid
      ? "Запись выглядит нормально."
      : "Можно ввести целое число или одну цифру после запятой.";
  }
}

function renderProgressWeightReview() {
  if (progressWeightReviewText) {
    const value = state.progressWeightText?.trim() || "—";
    progressWeightReviewText.textContent = `${value} кг`;
  }
}

function renderProgressWeightConfirm() {
  if (progressWeightConfirmText) {
    const value = state.progressWeightText?.trim() || "—";
    progressWeightConfirmText.textContent = `${value} кг`;
  }
}

function renderProgressCheckin() {
  progressCheckinOptions.forEach((option) => {
    const isSelected = option.dataset.progressCheckin === state.progressCheckinStatus;
    option.classList.toggle("is-selected", isSelected);
    option.setAttribute("aria-checked", String(isSelected));
  });

  if (progressCheckinContinueButton) {
    progressCheckinContinueButton.disabled = !state.progressCheckinStatus;
  }
}

function renderProgressCheckinReview() {
  // Narrow placeholder kept for V1.
}

function isValidNutritionLogText(value) {
  const trimmed = value.trim();
  return trimmed.length >= 3 && /[A-Za-zА-Яа-я0-9]/.test(trimmed);
}

function isValidTrainingLogText(value) {
  const trimmed = value.trim();
  return trimmed.length >= 3 && /[A-Za-zА-Яа-я0-9]/.test(trimmed);
}

function isValidProgressWeightText(value) {
  const normalized = value.trim().replace(",", ".");
  if (!normalized) {
    return false;
  }

  if (!/^\d{1,3}([.,]\d)?$/.test(value.trim())) {
    return false;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed >= 35 && parsed <= 250;
}

startButton?.addEventListener("click", () => {
  telegram?.HapticFeedback?.impactOccurred?.("medium");
  showScreen("onboarding-goal");
});

goalOptions.forEach((option) => {
  option.addEventListener("click", () => {
    telegram?.HapticFeedback?.selectionChanged?.();
    selectGoal(option.dataset.goal);
  });
});

continueGoalButton?.addEventListener("click", () => {
  if (!state.goal) {
    return;
  }

  telegram?.HapticFeedback?.impactOccurred?.("light");
  showScreen("onboarding-sex");
});

sexOptions.forEach((option) => {
  option.addEventListener("click", () => {
    telegram?.HapticFeedback?.selectionChanged?.();
    selectSex(option.dataset.sex);
  });
});

continueSexButton?.addEventListener("click", () => {
  if (!state.sex) {
    return;
  }

  telegram?.HapticFeedback?.impactOccurred?.("light");
  showScreen("onboarding-age");
});

ageInput?.addEventListener("input", (event) => {
  updateAge(event.target.value);
});

continueAgeButton?.addEventListener("click", () => {
  if (!state.age) {
    return;
  }

  telegram?.HapticFeedback?.impactOccurred?.("light");
  showScreen("onboarding-height");
});

heightInput?.addEventListener("input", (event) => {
  updateHeight(event.target.value);
});

continueHeightButton?.addEventListener("click", () => {
  if (!state.height) {
    return;
  }

  telegram?.HapticFeedback?.impactOccurred?.("light");
  showScreen("onboarding-weight");
});

weightInput?.addEventListener("input", (event) => {
  updateWeight(event.target.value);
});

continueWeightButton?.addEventListener("click", () => {
  if (!state.weight) {
    return;
  }

  telegram?.HapticFeedback?.impactOccurred?.("light");
  showScreen("onboarding-activity");
});

activityOptions.forEach((option) => {
  option.addEventListener("click", () => {
    telegram?.HapticFeedback?.selectionChanged?.();
    selectActivity(option.dataset.activity);
  });
});

continueActivityButton?.addEventListener("click", () => {
  if (!state.activity) {
    return;
  }

  telegram?.HapticFeedback?.impactOccurred?.("light");
  renderSummary();
  showScreen("onboarding-summary");
});

continueSummaryButton?.addEventListener("click", () => {
  telegram?.HapticFeedback?.impactOccurred?.("light");
  showScreen("onboarding-plan-prep");
});

continuePlanPrepButton?.addEventListener("click", () => {
  telegram?.HapticFeedback?.impactOccurred?.("light");
  renderTargetsResult();
  showScreen("onboarding-targets-result");
});

continueTargetsResultButton?.addEventListener("click", () => {
  telegram?.HapticFeedback?.impactOccurred?.("light");
  renderDashboardHome();
  showScreen("dashboard-home");
});

dashboardPrimaryButton?.addEventListener("click", () => {
  telegram?.HapticFeedback?.impactOccurred?.("light");
  renderNutritionHome();
  showScreen("nutrition-home");
});

dashboardCards.forEach((card) => {
  card.addEventListener("click", () => {
    const target = card.dataset.dashboardOpen;

    if (target === "nutrition") {
      renderNutritionHome();
      showScreen("nutrition-home");
      return;
    }

    if (target === "workouts") {
      renderTrainingHome();
      showScreen("training-home");
      return;
    }

    if (target === "progress") {
      renderProgressHome();
      showScreen("progress-home");
    }
  });
});

nutritionPrimaryButton?.addEventListener("click", () => {
  telegram?.HapticFeedback?.impactOccurred?.("light");
  renderNutritionLogEntry();
  showScreen("nutrition-log-entry");
});

nutritionCards.forEach((card) => {
  card.addEventListener("click", () => {
    const target = card.dataset.nutritionOpen;

    if (target === "log") {
      renderNutritionLogEntry();
      showScreen("nutrition-log-entry");
      return;
    }

    if (target === "quick") {
      showScreen("nutrition-quick-entry-next");
      return;
    }

    if (target === "last") {
      showScreen("nutrition-last-meal-next");
      return;
    }

    if (target === "focus") {
      showScreen("nutrition-focus-next");
    }
  });
});

nutritionLogInput?.addEventListener("input", (event) => {
  const value = event.target.value;
  state.nutritionLogText = value;

  if (nutritionLogContinueButton) {
    nutritionLogContinueButton.disabled = !isValidNutritionLogText(value);
  }

  if (nutritionLogNote) {
    nutritionLogNote.textContent = isValidNutritionLogText(value)
      ? "Запись выглядит нормально."
      : "Опиши еду коротко и по делу.";
  }
});

nutritionLogContinueButton?.addEventListener("click", () => {
  if (!isValidNutritionLogText(state.nutritionLogText ?? "")) {
    return;
  }

  telegram?.HapticFeedback?.impactOccurred?.("light");
  renderNutritionLogReview();
  showScreen("nutrition-log-review");
});

nutritionLogEditButton?.addEventListener("click", () => {
  telegram?.HapticFeedback?.selectionChanged?.();
  renderNutritionLogEntry();
  showScreen("nutrition-log-entry");
});

nutritionLogConfirmButton?.addEventListener("click", () => {
  telegram?.HapticFeedback?.impactOccurred?.("light");
  renderNutritionLogConfirm();
  showScreen("nutrition-log-confirm");
});

nutritionLogNewButton?.addEventListener("click", () => {
  telegram?.HapticFeedback?.selectionChanged?.();
  state.nutritionLogText = "";
  if (nutritionLogInput) {
    nutritionLogInput.value = "";
  }
  renderNutritionLogEntry();
  showScreen("nutrition-log-entry");
});

nutritionLogHomeButton?.addEventListener("click", () => {
  telegram?.HapticFeedback?.impactOccurred?.("light");
  renderNutritionHome();
  showScreen("nutrition-home");
});

trainingPrimaryButton?.addEventListener("click", () => {
  telegram?.HapticFeedback?.impactOccurred?.("light");
  renderTrainingLogEntry();
  showScreen("training-log-entry");
});

trainingCards.forEach((card) => {
  card.addEventListener("click", () => {
    const target = card.dataset.trainingOpen;

    if (target === "log") {
      renderTrainingLogEntry();
      showScreen("training-log-entry");
      return;
    }

    if (target === "quick") {
      showScreen("training-quick-start-next");
      return;
    }

    if (target === "last") {
      showScreen("training-last-session-next");
      return;
    }

    if (target === "focus") {
      showScreen("training-focus-next");
    }
  });
});

trainingLogInput?.addEventListener("input", (event) => {
  const value = event.target.value;
  state.trainingLogText = value;

  if (trainingLogContinueButton) {
    trainingLogContinueButton.disabled = !isValidTrainingLogText(value);
  }

  if (trainingLogNote) {
    trainingLogNote.textContent = isValidTrainingLogText(value)
      ? "Запись выглядит нормально."
      : "Опиши тренировку коротко и по делу.";
  }
});

trainingLogContinueButton?.addEventListener("click", () => {
  if (!isValidTrainingLogText(state.trainingLogText ?? "")) {
    return;
  }

  telegram?.HapticFeedback?.impactOccurred?.("light");
  renderTrainingLogReview();
  showScreen("training-log-review");
});

trainingLogEditButton?.addEventListener("click", () => {
  telegram?.HapticFeedback?.selectionChanged?.();
  renderTrainingLogEntry();
  showScreen("training-log-entry");
});

trainingLogConfirmButton?.addEventListener("click", () => {
  telegram?.HapticFeedback?.impactOccurred?.("light");
  renderTrainingLogConfirm();
  showScreen("training-log-confirm");
});

trainingLogNewButton?.addEventListener("click", () => {
  telegram?.HapticFeedback?.selectionChanged?.();
  state.trainingLogText = "";
  if (trainingLogInput) {
    trainingLogInput.value = "";
  }
  renderTrainingLogEntry();
  showScreen("training-log-entry");
});

trainingLogHomeButton?.addEventListener("click", () => {
  telegram?.HapticFeedback?.impactOccurred?.("light");
  renderTrainingHome();
  showScreen("training-home");
});

progressPrimaryButton?.addEventListener("click", () => {
  telegram?.HapticFeedback?.impactOccurred?.("light");
  renderProgressWeightEntry();
  showScreen("progress-weight-log-entry");
});

progressCards.forEach((card) => {
  card.addEventListener("click", () => {
    const target = card.dataset.progressOpen;

    if (target === "weight") {
      renderProgressWeightEntry();
      showScreen("progress-weight-log-entry");
      return;
    }

    if (target === "checkin") {
      renderProgressCheckin();
      showScreen("progress-checkin");
      return;
    }

    if (target === "last") {
      showScreen("progress-last-entry-next");
      return;
    }

    if (target === "focus") {
      showScreen("progress-focus-next");
    }
  });
});

progressWeightInput?.addEventListener("input", (event) => {
  const value = event.target.value.replace(",", ".");
  event.target.value = value;
  state.progressWeightText = value;

  if (progressWeightContinueButton) {
    progressWeightContinueButton.disabled = !isValidProgressWeightText(value);
  }

  if (progressWeightNote) {
    progressWeightNote.textContent = isValidProgressWeightText(value)
      ? "Запись выглядит нормально."
      : "Можно ввести целое число или одну цифру после запятой.";
  }
});

progressWeightContinueButton?.addEventListener("click", () => {
  if (!isValidProgressWeightText(state.progressWeightText ?? "")) {
    return;
  }

  telegram?.HapticFeedback?.impactOccurred?.("light");
  renderProgressWeightReview();
  showScreen("progress-weight-log-review");
});

progressWeightEditButton?.addEventListener("click", () => {
  telegram?.HapticFeedback?.selectionChanged?.();
  renderProgressWeightEntry();
  showScreen("progress-weight-log-entry");
});

progressWeightConfirmButton?.addEventListener("click", () => {
  telegram?.HapticFeedback?.impactOccurred?.("light");
  renderProgressWeightConfirm();
  showScreen("progress-weight-log-confirm");
});

progressWeightNewButton?.addEventListener("click", () => {
  telegram?.HapticFeedback?.selectionChanged?.();
  state.progressWeightText = "";
  if (progressWeightInput) {
    progressWeightInput.value = "";
  }
  renderProgressWeightEntry();
  showScreen("progress-weight-log-entry");
});

progressWeightHomeButton?.addEventListener("click", () => {
  telegram?.HapticFeedback?.impactOccurred?.("light");
  renderProgressHome();
  showScreen("progress-home");
});

progressCheckinOptions.forEach((option) => {
  option.addEventListener("click", () => {
    telegram?.HapticFeedback?.selectionChanged?.();
    state.progressCheckinStatus = option.dataset.progressCheckin ?? "";
    renderProgressCheckin();
  });
});

progressCheckinContinueButton?.addEventListener("click", () => {
  if (!state.progressCheckinStatus) {
    return;
  }

  telegram?.HapticFeedback?.impactOccurred?.("light");
  renderProgressCheckinReview();
  showScreen("progress-checkin-review-next");
});

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const button = event.target.closest("[data-section-back]");
  if (!button) {
    return;
  }

  const target = button.dataset.sectionBack;
  if (!target) {
    return;
  }

  telegram?.HapticFeedback?.impactOccurred?.("light");
  if (target === "dashboard-home") {
    renderDashboardHome();
  }
  showScreen(target);
});

if (window.location.hash === "#onboarding-goal") {
  showScreen("onboarding-goal");
} else if (window.location.hash === "#onboarding-sex") {
  showScreen("onboarding-sex");
} else if (window.location.hash === "#onboarding-age") {
  showScreen("onboarding-age");
} else if (window.location.hash === "#onboarding-height") {
  showScreen("onboarding-height");
} else if (window.location.hash === "#onboarding-weight") {
  showScreen("onboarding-weight");
} else if (window.location.hash === "#onboarding-activity") {
  showScreen("onboarding-activity");
} else if (window.location.hash === "#onboarding-summary") {
  renderSummary();
  showScreen("onboarding-summary");
} else if (window.location.hash === "#onboarding-plan-prep") {
  showScreen("onboarding-plan-prep");
} else if (window.location.hash === "#onboarding-targets-result") {
  renderTargetsResult();
  showScreen("onboarding-targets-result");
} else if (window.location.hash === "#dashboard-home") {
  renderDashboardHome();
  showScreen("dashboard-home");
} else if (window.location.hash === "#nutrition-home") {
  renderNutritionHome();
  showScreen("nutrition-home");
} else if (window.location.hash === "#nutrition-log-entry") {
  renderNutritionLogEntry();
  showScreen("nutrition-log-entry");
} else if (window.location.hash === "#nutrition-log-next") {
  renderNutritionLogEntry();
  showScreen("nutrition-log-entry");
} else if (window.location.hash === "#nutrition-log-review") {
  renderNutritionLogReview();
  showScreen("nutrition-log-review");
} else if (window.location.hash === "#nutrition-log-review-next") {
  renderNutritionLogReview();
  showScreen("nutrition-log-review");
} else if (window.location.hash === "#nutrition-log-confirm") {
  renderNutritionLogConfirm();
  showScreen("nutrition-log-confirm");
} else if (window.location.hash === "#nutrition-log-confirm-next") {
  renderNutritionLogConfirm();
  showScreen("nutrition-log-confirm");
} else if (window.location.hash === "#nutrition-quick-entry-next") {
  showScreen("nutrition-quick-entry-next");
} else if (window.location.hash === "#nutrition-last-meal-next") {
  showScreen("nutrition-last-meal-next");
} else if (window.location.hash === "#nutrition-focus-next") {
  showScreen("nutrition-focus-next");
} else if (window.location.hash === "#training-home") {
  renderTrainingHome();
  showScreen("training-home");
} else if (window.location.hash === "#training-log-next") {
  renderTrainingLogEntry();
  showScreen("training-log-entry");
} else if (window.location.hash === "#training-log-entry") {
  renderTrainingLogEntry();
  showScreen("training-log-entry");
} else if (window.location.hash === "#training-log-review-next") {
  renderTrainingLogReview();
  showScreen("training-log-review");
} else if (window.location.hash === "#training-log-review") {
  renderTrainingLogReview();
  showScreen("training-log-review");
} else if (window.location.hash === "#training-log-confirm") {
  renderTrainingLogConfirm();
  showScreen("training-log-confirm");
} else if (window.location.hash === "#training-log-confirm-next") {
  renderTrainingLogConfirm();
  showScreen("training-log-confirm");
} else if (window.location.hash === "#training-quick-start-next") {
  showScreen("training-quick-start-next");
} else if (window.location.hash === "#training-last-session-next") {
  showScreen("training-last-session-next");
} else if (window.location.hash === "#training-focus-next") {
  showScreen("training-focus-next");
} else if (window.location.hash === "#progress-home") {
  renderProgressHome();
  showScreen("progress-home");
} else if (window.location.hash === "#progress-weight-log-next") {
  renderProgressWeightEntry();
  showScreen("progress-weight-log-entry");
} else if (window.location.hash === "#progress-weight-log-entry") {
  renderProgressWeightEntry();
  showScreen("progress-weight-log-entry");
} else if (window.location.hash === "#progress-weight-log-review") {
  renderProgressWeightReview();
  showScreen("progress-weight-log-review");
} else if (window.location.hash === "#progress-weight-log-review-next") {
  renderProgressWeightReview();
  showScreen("progress-weight-log-review");
} else if (window.location.hash === "#progress-weight-log-confirm") {
  renderProgressWeightConfirm();
  showScreen("progress-weight-log-confirm");
} else if (window.location.hash === "#progress-weight-log-confirm-next") {
  renderProgressWeightConfirm();
  showScreen("progress-weight-log-confirm");
} else if (window.location.hash === "#progress-checkin") {
  renderProgressCheckin();
  showScreen("progress-checkin");
} else if (window.location.hash === "#progress-checkin-next") {
  renderProgressCheckin();
  showScreen("progress-checkin");
} else if (window.location.hash === "#progress-checkin-review-next") {
  renderProgressCheckinReview();
  showScreen("progress-checkin-review-next");
} else if (window.location.hash === "#progress-last-entry-next") {
  showScreen("progress-last-entry-next");
} else if (window.location.hash === "#progress-focus-next") {
  showScreen("progress-focus-next");
}
