(function () {
  "use strict";

  const data = window.MBAI_DATA;
  const $ = (id) => document.getElementById(id);
  const state = {
    language: navigator.language && navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en",
    name: "",
    index: 0,
    answers: Array(data.questions.length).fill(null),
    result: null
  };

  const screens = ["introScreen", "setupScreen", "quizScreen", "resultScreen"];
  let toastTimer;

  function ui(key) {
    return data.ui[state.language][key] || key;
  }

  function localized(item) {
    return item[state.language];
  }

  function showScreen(id) {
    screens.forEach((screenId) => $(screenId).classList.toggle("active", screenId === id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function applyLanguage() {
    document.documentElement.lang = state.language === "zh" ? "zh-CN" : "en";
    document.title = state.language === "zh" ? "MBAI — AI 时代人格测试" : "MBAI — AI Era Personality Test";
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = ui(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.placeholder = ui(element.dataset.i18nPlaceholder);
    });
    document.querySelectorAll("[data-language]").forEach((button) => {
      button.classList.toggle("active", button.dataset.language === state.language);
      button.setAttribute("aria-pressed", String(button.dataset.language === state.language));
    });
    $("quickLanguage").textContent = state.language === "zh" ? "EN" : "中";
    if ($("quizScreen").classList.contains("active")) renderQuestion();
    if ($("resultScreen").classList.contains("active") && state.result) renderResult();
  }

  function setLanguage(language) {
    state.language = language;
    applyLanguage();
  }

  function renderQuestion() {
    const question = data.questions[state.index];
    const content = localized(question);
    const answer = state.answers[state.index];
    $("progressBar").style.width = `${((state.index + 1) / data.questions.length) * 100}%`;
    $("progressCount").textContent = `${state.index + 1} / ${data.questions.length}`;
    $("questionKicker").textContent = `${ui("scenario")} ${String(state.index + 1).padStart(2, "0")}`;
    $("questionTitle").textContent = content.q;
    $("answerList").innerHTML = content.a.map((text, optionIndex) => (
      `<button class="answer-button${answer === optionIndex ? " selected" : ""}" type="button" data-option="${optionIndex}" aria-pressed="${answer === optionIndex}">${text}</button>`
    )).join("");
    $("answerList").querySelectorAll(".answer-button").forEach((button) => {
      button.addEventListener("click", () => {
        state.answers[state.index] = Number(button.dataset.option);
        renderQuestion();
      });
    });
    $("previousQuestion").disabled = state.index === 0;
    $("nextQuestion").disabled = answer === null;
    $("nextQuestion").querySelector("span:first-child").textContent = state.index === data.questions.length - 1 ? ui("viewResult") : ui("next");
  }

  function calculateResult(answers) {
    const scores = Array(data.axes.length).fill(0);
    const maximums = Array(data.axes.length).fill(0);
    data.questions.forEach((question, questionIndex) => {
      const option = answers[questionIndex];
      if (option === null || option === undefined) return;
      question.weights[option].forEach((value, axisIndex) => { scores[axisIndex] += value; });
      question.weights[0].forEach((value, axisIndex) => {
        maximums[axisIndex] += Math.max(Math.abs(value), Math.abs(question.weights[1][axisIndex]));
      });
    });

    const letters = data.axes.map((axis, axisIndex) => {
      if (scores[axisIndex] > 0) return axis.positive;
      if (scores[axisIndex] < 0) return axis.negative;
      const calibrationIndex = data.tieBreakQuestions[axis.id];
      const calibrationOption = answers[calibrationIndex];
      return data.questions[calibrationIndex].weights[calibrationOption][axisIndex] >= 0 ? axis.positive : axis.negative;
    });
    const percentages = scores.map((score, index) => Math.round(50 + (50 * score / maximums[index])));
    return { code: letters.join(""), letters, scores, maximums, percentages };
  }

  function resultModel() {
    const result = state.result;
    const baseCode = result.code.slice(0, 4);
    const tasteCode = result.code.slice(4);
    const base = data.baseTypes[baseCode];
    const baseCopy = localized(base);
    const variant = localized(base.variants[tasteCode]);
    const taste = localized(data.tasteProfiles[tasteCode]);
    const camp = localized(data.camps[result.code[0] + result.code[2]]);
    return { result, baseCode, tasteCode, base, baseCopy, variant, taste, camp, fullName: `${baseCopy.name}${state.language === "zh" ? "·" : " — "}${variant.modifier}` };
  }

  function renderResult() {
    const model = resultModel();
    const { result, baseCopy, variant, taste, camp, fullName } = model;
    $("reportOwner").textContent = ui("reportFor").replace("{name}", state.name);
    $("resultCode").textContent = result.code;
    $("campBadge").textContent = camp;
    $("resultName").textContent = fullName;
    $("resultTagline").textContent = `“${variant.tagline}”`;
    $("portraitCopy").textContent = `${baseCopy.portrait} ${taste.copy}`;
    $("edgeCopy").textContent = `${baseCopy.edge} ${taste.edge}`;
    $("bugCopy").textContent = `${baseCopy.bug} ${taste.bug}`;
    $("aiUseCopy").textContent = `${baseCopy.aiUse} ${taste.aiUse}`;
    $("workCopy").textContent = baseCopy.work;
    $("learnCopy").textContent = `${localized(data.modules[result.code[1]]).learn} ${localized(data.modules[result.code[2]]).learn}`;
    $("collabCopy").textContent = `${localized(data.modules[result.code[0]]).collab} ${localized(data.modules[result.code[3]]).collab}`;
    $("tasteHeading").textContent = taste.heading;
    $("tasteCopy").textContent = taste.copy;

    $("dimensionGrid").innerHTML = data.axes.map((axis, index) => {
      const copy = localized(axis);
      const positivePercentage = result.percentages[index];
      const isBalanced = positivePercentage === 50;
      const positiveWins = positivePercentage > 50 || (isBalanced && result.letters[index] === axis.positive);
      const value = isBalanced ? 50 : (positiveWins ? positivePercentage : 100 - positivePercentage);
      const label = isBalanced ? `${copy.positive} / ${copy.negative}` : (positiveWins ? copy.positive : copy.negative);
      const displayValue = isBalanced ? ui("balanced") : `${value}%`;
      return `<div class="dimension-item" title="${copy.description}">
        <div class="dimension-top"><span>${label}</span><span>${displayValue}</span></div>
        <div class="dimension-bar"><span style="width:${value}%"></span></div>
      </div>`;
    }).join("");
  }

  function completeQuiz() {
    state.result = calculateResult(state.answers);
    renderResult();
    history.replaceState(null, "", `#${state.result.code}`);
    showScreen("resultScreen");
  }

  function shareText() {
    const model = resultModel();
    const link = window.location.href.split("#")[0];
    if (state.language === "zh") {
      return `我的 MBAI 是 ${model.result.code}｜${model.fullName}\n“${model.variant.tagline}”\n${link}`;
    }
    return `My MBAI is ${model.result.code} — ${model.fullName}\n“${model.variant.tagline}”\n${link}`;
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  function toast(message) {
    clearTimeout(toastTimer);
    $("toast").textContent = message;
    $("toast").classList.add("show");
    toastTimer = setTimeout(() => $("toast").classList.remove("show"), 1800);
  }

  function wrapCanvasText(context, text, x, y, maxWidth, lineHeight, maxLines) {
    const units = state.language === "zh" ? Array.from(text) : text.split(" ").map((word, i) => i ? ` ${word}` : word);
    let line = "";
    let lineCount = 0;
    for (let i = 0; i < units.length; i += 1) {
      const test = line + units[i];
      if (context.measureText(test).width > maxWidth && line) {
        context.fillText(line, x, y + lineCount * lineHeight);
        line = units[i].trimStart();
        lineCount += 1;
        if (lineCount >= maxLines - 1) break;
      } else {
        line = test;
      }
    }
    if (lineCount < maxLines) context.fillText(line, x, y + lineCount * lineHeight);
    return y + (lineCount + 1) * lineHeight;
  }

  function drawShareCard() {
    const canvas = $("shareCanvas");
    const context = canvas.getContext("2d");
    const model = resultModel();
    const gradient = context.createLinearGradient(0, 0, 1080, 1350);
    gradient.addColorStop(0, "#0a0c10");
    gradient.addColorStop(.58, "#151824");
    gradient.addColorStop(1, "#0b1717");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 1080, 1350);

    const glow = context.createRadialGradient(870, 100, 0, 870, 100, 470);
    glow.addColorStop(0, "rgba(163,141,255,.28)");
    glow.addColorStop(1, "rgba(163,141,255,0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, 1080, 600);

    context.fillStyle = "#caff5c";
    context.font = "900 34px system-ui, sans-serif";
    context.fillText("MBAI", 82, 92);
    context.fillStyle = "#9aa4b5";
    context.font = "700 20px system-ui, sans-serif";
    context.fillText(state.language === "zh" ? `${state.name} 的 AI 时代人格` : `${state.name}'s AI-era personality`, 82, 140);

    context.fillStyle = "#caff5c";
    context.font = "950 150px system-ui, sans-serif";
    context.fillText(model.result.code, 76, 345);
    context.fillStyle = "#cfc4ff";
    context.font = "800 24px system-ui, sans-serif";
    context.fillText(model.camp.toUpperCase(), 82, 398);

    context.fillStyle = "#f4f7fb";
    context.font = state.language === "zh" ? "900 52px system-ui, sans-serif" : "900 44px system-ui, sans-serif";
    const titleEnd = wrapCanvasText(context, model.fullName, 82, 485, 910, 62, 2);
    context.fillStyle = "#c5ccd8";
    context.font = state.language === "zh" ? "500 29px system-ui, sans-serif" : "500 27px system-ui, sans-serif";
    const quoteEnd = wrapCanvasText(context, `“${model.variant.tagline}”`, 82, titleEnd + 34, 900, 45, 4);

    const boxY = Math.max(760, quoteEnd + 35);
    context.fillStyle = "rgba(255,255,255,.045)";
    context.strokeStyle = "rgba(255,255,255,.13)";
    context.lineWidth = 2;
    context.beginPath();
    context.roundRect(70, boxY, 940, 330, 28);
    context.fill();
    context.stroke();

    data.axes.forEach((axis, index) => {
      const copy = localized(axis);
      const y = boxY + 57 + index * 54;
      const positive = model.result.percentages[index];
      const positiveWins = positive >= 50;
      const value = positiveWins ? positive : 100 - positive;
      const label = positive === 50 ? `${copy.positive}/${copy.negative}` : (positiveWins ? copy.positive : copy.negative);
      context.fillStyle = "#e8edf5";
      context.font = "700 22px system-ui, sans-serif";
      context.fillText(label, 108, y);
      context.fillStyle = "#2a313e";
      context.fillRect(360, y - 16, 500, 10);
      context.fillStyle = index === 4 ? "#caff5c" : "#a38dff";
      context.fillRect(360, y - 16, 500 * value / 100, 10);
      context.fillStyle = "#9aa4b5";
      context.font = "600 20px system-ui, sans-serif";
      context.fillText(positive === 50 ? "50/50" : `${value}%`, 890, y);
    });

    context.fillStyle = "#7e8899";
    context.font = "500 19px system-ui, sans-serif";
    context.fillText("mbai · open source · 30 scenarios · 5 dimensions · 32 results", 82, 1282);
    return canvas;
  }

  function downloadShareCard() {
    const canvas = drawShareCard();
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `MBAI-${state.result.code}-${state.name}.png`;
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 500);
      toast(ui("downloaded"));
    }, "image/png");
  }

  function resetQuiz() {
    state.index = 0;
    state.answers.fill(null);
    state.result = null;
    history.replaceState(null, "", window.location.pathname + window.location.search);
    showScreen("introScreen");
  }

  $("openSetup").addEventListener("click", () => showScreen("setupScreen"));
  $("setupBack").addEventListener("click", () => showScreen("introScreen"));
  $("quickLanguage").addEventListener("click", () => setLanguage(state.language === "zh" ? "en" : "zh"));
  document.querySelectorAll("[data-language]").forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.language)));
  $("reportName").addEventListener("input", (event) => {
    state.name = event.target.value.trim();
    $("beginQuiz").disabled = state.name.length === 0;
  });
  $("beginQuiz").addEventListener("click", () => {
    if (!state.name) return;
    state.index = 0;
    showScreen("quizScreen");
    renderQuestion();
  });
  $("previousQuestion").addEventListener("click", () => {
    if (state.index > 0) { state.index -= 1; renderQuestion(); window.scrollTo({ top: 0, behavior: "smooth" }); }
  });
  $("nextQuestion").addEventListener("click", () => {
    if (state.answers[state.index] === null) return;
    if (state.index < data.questions.length - 1) {
      state.index += 1;
      renderQuestion();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else completeQuiz();
  });
  $("copyResult").addEventListener("click", async () => { await copyText(shareText()); toast(ui("copied")); });
  $("shareResult").addEventListener("click", async () => {
    const text = shareText();
    if (navigator.share) {
      try { await navigator.share({ title: ui("shareTitle"), text }); } catch (error) { if (error.name !== "AbortError") { await copyText(text); toast(ui("shareFallback")); } }
    } else { await copyText(text); toast(ui("shareFallback")); }
  });
  $("downloadCard").addEventListener("click", downloadShareCard);
  $("restartQuiz").addEventListener("click", resetQuiz);
  $("brandButton").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  applyLanguage();
})();

