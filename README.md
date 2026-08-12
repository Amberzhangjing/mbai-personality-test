# MBAI — AI Era Personality Test

> What kind of person are you in the age of AI?

[简体中文](README.zh-CN.md) · [Live test](https://amberzhangjing.github.io/mbai-personality-test/)

MBAI (Mindset & Behavior in the AI Era Indicator) is an open, bilingual personality quiz about how people direct, trust, adopt, share, and curate AI. It turns 30 short scenarios into a five-letter code and one of 32 shareable result variants.

MBAI is an entertainment and self-reflection project. It is not a clinical assessment, hiring tool, or measure of intelligence, creativity, or AI proficiency.

## The five dimensions

| Axis | Positive pole | Negative pole | What it asks |
| --- | --- | --- | --- |
| AI agency | **D** Director | **C** Co-creator | Do you direct AI or think with it? |
| Trust mode | **F** Fact | **I** Intuition | Do you verify through evidence or explore through patterns? |
| Adoption tempo | **P** Pioneer | **S** Stabilizer | Do you try the frontier or wait for reliability? |
| Digital boundary | **O** Open | **G** Guarded | Do you share workflows or protect context? |
| Output standard | **T** Taste-led | **U** Utility-led | Do you optimize for voice and originality or speed and usefulness? |

Example: `DFPOT` means Director · Fact · Pioneer · Open · Taste-led.

The last axis does **not** measure “good taste versus bad taste.” It measures how much aesthetic judgment enters the final decision after an AI output is already useful.

## What is included

- 30 original scenarios in Chinese and English
- hidden cross-dimensional scoring in the UI
- 16 core archetypes × 2 output modes = 32 result variants
- name input and Chinese/English language selection before the quiz
- dimension percentages and a personalized result report
- copy, native share, and downloadable result-card actions
- deterministic validation for type reachability and simulated distribution
- no backend, account, analytics, or answer upload

## Run locally

Open `index.html` directly in a modern browser. No build step or external dependency is required.

For a local server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Validate the assessment

Node.js 18+ is recommended.

```bash
npm test
```

The validator checks schema integrity, bilingual completeness, all 32 canonical paths, axis coverage, and a deterministic simulation of 200,000 response paths.

## Project structure

```text
.
├── index.html                 # product shell
├── assets/
│   ├── styles.css             # responsive visual system
│   └── app.js                 # quiz, scoring, report and share card
├── data/
│   └── mbai-data.js           # dimensions, 30 questions and 32 results
├── docs/
│   ├── METHODOLOGY.md         # model and validation notes
│   └── QUESTIONNAIRE.md       # human-readable question map
└── validation/
    └── validate.mjs           # zero-dependency validator
```

## Contributing

Ideas for clearer scenarios, culturally natural translations, fairer weights, accessibility, and result writing are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request.

## Originality note

MBAI borrows the general product rhythm common to lightweight personality quizzes — short questions → scoring → result → sharing. Its dimensions, questions, weights, type system, result copy, and visual design are original to this repository. No SBTI questions, result copy, illustrations, or visual assets are included.

## License

- Source code: [MIT License](LICENSE)
- Questions, dimension definitions, result copy, documentation, and original media: [CC BY 4.0](LICENSE-CONTENT.md)
- The MBAI name and official brand identifiers are governed by [TRADEMARKS.md](TRADEMARKS.md)

