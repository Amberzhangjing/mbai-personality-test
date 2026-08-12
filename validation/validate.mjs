import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const data = require("../data/mbai-data.js");
const root = resolve(new URL("..", import.meta.url).pathname);
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function calculate(answers) {
  const scores = Array(data.axes.length).fill(0);
  const maximums = Array(data.axes.length).fill(0);
  data.questions.forEach((question, questionIndex) => {
    question.weights[answers[questionIndex]].forEach((value, axisIndex) => { scores[axisIndex] += value; });
    question.weights[0].forEach((value, axisIndex) => {
      maximums[axisIndex] += Math.max(Math.abs(value), Math.abs(question.weights[1][axisIndex]));
    });
  });
  const letters = data.axes.map((axis, axisIndex) => {
    if (scores[axisIndex] > 0) return axis.positive;
    if (scores[axisIndex] < 0) return axis.negative;
    const questionIndex = data.tieBreakQuestions[axis.id];
    const value = data.questions[questionIndex].weights[answers[questionIndex]][axisIndex];
    return value >= 0 ? axis.positive : axis.negative;
  });
  return { code: letters.join(""), scores, maximums };
}

function targetSigns(code) {
  return data.axes.map((axis, index) => code[index] === axis.positive ? 1 : -1);
}

function canonicalAnswers(code) {
  const target = targetSigns(code);
  return data.questions.map((question) => {
    const utility = question.weights.map((weights) => weights.reduce((sum, value, index) => sum + value * target[index], 0));
    return utility[1] > utility[0] ? 1 : 0;
  });
}

function allCodes() {
  return data.axes.reduce((codes, axis) => codes.flatMap((code) => [code + axis.positive, code + axis.negative]), [""]);
}

function lcg(seed) {
  let value = seed >>> 0;
  return () => {
    value = (1664525 * value + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

check(data.version && /^\d+\.\d+\.\d+$/.test(data.version), "Version must use semver.");
check(data.questions.length === 30, `Expected 30 questions, found ${data.questions.length}.`);
check(data.axes.length === 5, `Expected 5 axes, found ${data.axes.length}.`);
check(Object.keys(data.baseTypes).length === 16, `Expected 16 base types, found ${Object.keys(data.baseTypes).length}.`);

const ids = new Set();
const primaryCounts = Object.fromEntries(data.axes.map((axis) => [axis.id, 0]));
const directionCounts = Object.fromEntries(data.axes.map((axis) => [axis.id, { positiveFirst: 0, negativeFirst: 0 }]));

data.questions.forEach((question, index) => {
  check(!ids.has(question.id), `Duplicate question id ${question.id}.`);
  ids.add(question.id);
  check(question.id === `Q${String(index + 1).padStart(2, "0")}`, `Question order/id mismatch at index ${index}.`);
  check(primaryCounts[question.primary] !== undefined, `${question.id} has unknown primary axis ${question.primary}.`);
  primaryCounts[question.primary] += 1;
  check(Array.isArray(question.weights) && question.weights.length === 2, `${question.id} must have two weight vectors.`);
  question.weights.forEach((weights, optionIndex) => check(Array.isArray(weights) && weights.length === 5, `${question.id} option ${optionIndex} must have five weights.`));
  check(question.weights[0].every((value, axisIndex) => value === -question.weights[1][axisIndex]), `${question.id} option vectors must be symmetric.`);
  data.languages.forEach((language) => {
    check(question[language] && typeof question[language].q === "string" && question[language].q.trim(), `${question.id} is missing ${language} question text.`);
    check(question[language] && Array.isArray(question[language].a) && question[language].a.length === 2, `${question.id} needs two ${language} answers.`);
    check(question[language] && question[language].a.every((answer) => typeof answer === "string" && answer.trim()), `${question.id} has an empty ${language} answer.`);
  });
  const axisIndex = data.axes.findIndex((axis) => axis.id === question.primary);
  const firstValue = question.weights[0][axisIndex];
  check(Math.abs(firstValue) === 2, `${question.id} primary axis should have magnitude 2.`);
  if (firstValue > 0) directionCounts[question.primary].positiveFirst += 1;
  else directionCounts[question.primary].negativeFirst += 1;
});

Object.entries(primaryCounts).forEach(([axis, count]) => check(count === 6, `${axis} should be primary on 6 questions, found ${count}.`));
Object.entries(directionCounts).forEach(([axis, counts]) => {
  check(counts.positiveFirst === 3 && counts.negativeFirst === 3, `${axis} should alternate first-option direction 3/3, found ${counts.positiveFirst}/${counts.negativeFirst}.`);
});

Object.entries(data.baseTypes).forEach(([code, type]) => {
  check(code.length === 4, `${code} should be a four-letter base code.`);
  data.languages.forEach((language) => {
    ["name", "portrait", "edge", "bug", "aiUse", "work"].forEach((field) => check(type[language] && type[language][field], `${code} missing ${language}.${field}.`));
    ["T", "U"].forEach((taste) => {
      check(type.variants && type.variants[taste] && type.variants[taste][language].modifier, `${code}${taste} missing ${language} modifier.`);
      check(type.variants && type.variants[taste] && type.variants[taste][language].tagline, `${code}${taste} missing ${language} tagline.`);
    });
  });
});

const codes = allCodes();
check(codes.length === 32, `Expected 32 generated codes, found ${codes.length}.`);
codes.forEach((code) => {
  const base = code.slice(0, 4);
  check(Boolean(data.baseTypes[base]), `${code} has no base type ${base}.`);
  const actual = calculate(canonicalAnswers(code)).code;
  check(actual === code, `Canonical path for ${code} returned ${actual}.`);
});

const html = readFileSync(resolve(root, "index.html"), "utf8");
check(html.includes("data/mbai-data.js"), "index.html must load the assessment data.");
check(html.includes("assets/app.js"), "index.html must load the application logic.");
check(html.includes("assets/styles.css"), "index.html must load the stylesheet.");

const sampleSize = 200000;
const random = lcg(0x4d424149);
const distribution = Object.fromEntries(codes.map((code) => [code, 0]));
const positiveAxisCounts = Array(data.axes.length).fill(0);
for (let sample = 0; sample < sampleSize; sample += 1) {
  const answers = data.questions.map(() => random() < .5 ? 0 : 1);
  const result = calculate(answers);
  distribution[result.code] += 1;
  result.code.split("").forEach((letter, index) => { if (letter === data.axes[index].positive) positiveAxisCounts[index] += 1; });
}

const shares = Object.fromEntries(Object.entries(distribution).map(([code, count]) => [code, 100 * count / sampleSize]));
const values = Object.values(shares);
const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
const standardDeviation = Math.sqrt(values.reduce((sum, value) => sum + ((value - mean) ** 2), 0) / values.length);
const sorted = Object.entries(shares).sort((a, b) => b[1] - a[1]);

sorted.forEach(([code, share]) => check(share >= .2, `${code} appears too rarely in simulation: ${share.toFixed(3)}%.`));
check(sorted[0][1] <= 10, `Largest result share is too high: ${sorted[0][0]} ${sorted[0][1].toFixed(3)}%.`);
check(standardDeviation <= 2.5, `Distribution standard deviation is too high: ${standardDeviation.toFixed(3)}.`);
positiveAxisCounts.forEach((count, index) => {
  const share = 100 * count / sampleSize;
  check(share >= 48 && share <= 52, `${data.axes[index].id} positive pole is structurally imbalanced: ${share.toFixed(2)}%.`);
});

if (failures.length) {
  console.error(`MBAI validation failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("MBAI validation passed.");
console.log(`- ${data.questions.length} bilingual questions`);
console.log(`- ${data.axes.length} axes, 16 base types, ${codes.length} reachable result variants`);
console.log(`- ${sampleSize.toLocaleString("en-US")} deterministic response paths simulated`);
console.log(`- distribution σ: ${standardDeviation.toFixed(3)} percentage points`);
console.log(`- widest share: ${sorted[0][0]} ${sorted[0][1].toFixed(3)}%`);
console.log(`- narrowest share: ${sorted.at(-1)[0]} ${sorted.at(-1)[1].toFixed(3)}%`);
console.log("- axis positive shares: " + positiveAxisCounts.map((count, index) => `${data.axes[index].positive} ${(100 * count / sampleSize).toFixed(2)}%`).join(" · "));

