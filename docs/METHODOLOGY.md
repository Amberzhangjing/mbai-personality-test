# MBAI methodology

## Purpose

MBAI is a transparent entertainment assessment about behavioral preferences around AI. It is designed to generate useful reflection and conversation, not psychometric diagnosis.

## Model

MBAI uses five binary axes in a fixed order:

1. `D/C` — Director / Co-creator
2. `F/I` — Fact / Intuition
3. `P/S` — Pioneer / Stabilizer
4. `O/G` — Open / Guarded
5. `T/U` — Taste-led / Utility-led

The first four letters produce one of 16 core archetypes. The fifth letter changes the result name, tagline, portrait, strengths, risks, and recommended AI workflow, producing 32 total variants.

## Questions

The test contains 30 forced-choice scenarios. Each axis is the primary target of six questions. Most questions also contribute a smaller weight to a second axis. Option direction is intentionally mixed so that the first option does not consistently represent one side.

The browser interface does not expose weights while a person is answering. The repository keeps them public for transparency and community audit.

## Scoring

Each option stores a signed vector in the order `[agency, trust, tempo, boundary, taste]`.

- positive values support `D`, `F`, `P`, `O`, or `T`
- negative values support `C`, `I`, `S`, `G`, or `U`
- magnitude `2` is normally the primary axis
- magnitude `1` is normally a secondary axis

Scores are summed by axis and normalized against the maximum possible absolute score for that axis. A zero score displays as balanced; a designated calibration question resolves the letter without changing the displayed 50/50 score.

## Result construction

The report combines:

- a core archetype based on the first four letters
- a Taste/Utility variant based on the fifth letter
- axis-specific learning and collaboration guidance
- normalized percentages for all five dimensions

No overall rank, AI-readiness score, or “best type” is produced.

## Validation

`validation/validate.mjs` performs four levels of checks:

1. schema and bilingual completeness
2. six primary questions per axis and balanced option directions
3. canonical reachability path for every one of the 32 codes
4. deterministic simulation of 200,000 random answer paths

Simulation is not a substitute for real participant data. It only identifies structural failures such as unreachable types, extreme concentration, accidental axis imbalance, and scoring regressions.

## Interpretation limits

- Results can change with context, recent experience, and question interpretation.
- Forced-choice scenarios simplify real behavior.
- Percentage bars represent scoring position inside this test, not population percentiles.
- The model has not been normed, clinically validated, or tested for employment decisions.

## Versioning

Question or weight changes that can materially alter codes should increment the assessment version in `data/mbai-data.js` and be described in `CHANGELOG.md`.

