# NeuroHabit

**A habit tracker built around your brain's four reward chemicals — not a checklist, a compass.**

🔗 **Live (beta):** [aufthority.github.io/neurohabitbeta](https://aufthority.github.io/neurohabitbeta) — custom domain pending
🏗️ **Built by:** [Aufthority](https://www.aufthority.com)

---

## What it is

Most habit trackers treat every habit the same — one checkbox, one streak. NeuroHabit is built on a different premise: your brain runs on four distinct reward chemicals, each triggered by different kinds of behaviour, and none of them stay elevated for long. You don't get to "solve" motivation with one good habit — you need variety across all four.

NeuroHabit organizes daily habits into four categories, sometimes shorthanded as **DOSE**:

| Category | What it governs | Example habits |
|---|---|---|
| **Dopamine** | Drive & reward | Deep work sessions, morning sunlight, screen-free blocks |
| **Serotonin** | Stability & mood | Sleep duration, prayer/dhikr, 5-a-day, protein-rich meals |
| **Oxytocin** | Connection & trust | Active socialising, sincere appreciation, physical touch |
| **Endorphin** | Resilience & movement | Exercise tiered by intensity, cold exposure, creative play |

The app isn't just a tracker — it's a **compass**: it doesn't only record what you did, it surfaces *why* certain days feel stronger than others, which habits are quietly doing the most work for you, and how your patterns hold up over weeks.

## How scoring actually works

This is the part that separates NeuroHabit from a generic habit app: every habit in the masterlist is individually reviewed against literature and assigned both a **tier** and an **evidence strength**, not just brainstormed into the app.

**Habit tiers:**
- **Foundational** — a gate habit; completing it (or its OR-gate partner) unlocks full scoring for that category
- **Secondary** — high-impact, weight 2
- **Bonus** — supplementary, weight 1

**OR-gate design.** Early versions had a single foundational habit per category — a problem on days that habit genuinely isn't achievable (e.g. a housebound day with no in-person socialising). The masterlist was revised so each category is unlocked by *either* of two habits, not one:
- Dopamine: Deep Work **OR** Morning Sunlight
- Serotonin: Sleep **OR** Prayer (closes a loophole where a single weak-but-easy habit could unlock full score alone)
- Oxytocin: Active Socialising **OR** Sincere Appreciation

**Evidence tiering per habit.** Each habit's weight is backed by a literature review, not intuition — and where the evidence is only moderate, the weight reflects that rather than treating every habit as equally justified:

| Habit | Category | Evidence | Representative source |
|---|---|---|---|
| Sleep duration (7–9 hrs) | Serotonin | Strong | Meta-analytic evidence on sleep quality and mental health |
| Active socialising (20+ min, in-person) | Oxytocin | Strong | Holt-Lunstad, *World Psychiatry* 2024 |
| Exercise, tiered by intensity | Endorphin | Strong | Singh et al., *BJSM* 2023 (97 reviews, n=128,119) |
| Morning sunlight (10–15 min) | Dopamine | Strong | Circadian/SCN literature (Leproult & Van Cauter) |
| Nature walk | Serotonin | Strong | Bratman et al. 2015, *PNAS* |
| Oxytocin anchor (hug/touch, 20s+) | Oxytocin | Moderate | Touch-based oxytocin release literature — duration claim intentionally softened in-app to "sustained contact" since the specific 20-second figure lacks definitive RCT support |
| Cold shower / contrast therapy | Endorphin | Moderate | Noradrenaline surge is well-supported; the endorphin link is extrapolated rather than directly measured — flagged as such |

Where evidence for a habit's specific claim is thinner than its neighbours, the in-app copy is softened rather than presented with false confidence — the same evidence-integrity principle used across Aufthority's other tools, applied here to behavioural science instead of clinical formulas.

**Culturally adapted, not generically Western.** Several foundational and bonus habits are written for a Malaysian/Muslim daily rhythm specifically — *Solat 5 waktu* (daily prayer) and dhikr as serotonin-stabilising practices, *Qailullah* (post-Dhuhr power nap, hard-capped at 25 minutes to protect night sleep) — sitting alongside habits with no cultural specificity (deep work, exercise, sleep). This isn't a Western framework with a translation layer bolted on; the habit set itself was designed around a Malaysian daily structure.

## Progression system

- **28-day lock**, based on habit-formation research (Lally 2010, Keller 2021) rather than the commonly-cited but less rigorous "21 days" claim
- **Brain phases**: Ready → Awakening → Warming Up → Foundation Active → Thriving → Enlightened — each transition is framed in the Coach feed with *which* chemical shifted and why, not just a label change
- **Coach feed**: contextual cards across several types — science (psychoeducation), nudge, reflect, quote, weekly summary, and a "valley" card that proactively names the Valley of Disappointment (Clear) during the typical days 5–20 dropout window, before the user hits it
- **"Your journey, so far"**: a GitHub-style contribution grid, one cell per day, coloured by that day's dominant neurochemical category and shaded by score intensity — turns raw logs into a visual self-portrait rather than a table of ticks

## Design philosophy

- **Compassion over gamification.** Struggling-day coaching is framed through cortisol ("your stress response is high, let's find a small win to reset it"), not failure or streak-shaming.
- **ADHD-friendly by design.** Deliberately understated micro-celebrations, no overwhelming fanfare, information hidden-by-default and revealed on demand rather than front-loaded.
- **"Tend," not "always."** Any pattern-analysis language uses tendency framing ("you tend to have stronger Sundays") rather than evaluative framing ("your performance peaks on Sundays") — the goal is curiosity, not judgement.

## Tech stack

- Vanilla HTML/CSS/JS — no framework
- **PWA**: installable, standalone display, offline-first
- **Firebase** Auth + Analytics
- **State**: localStorage (`nh_pwa_state`), keyed by local date — no backend database; per-device by design (a known architectural limitation, not yet solved with Firestore sync)
- **Service worker**: network-first for `index.html` (deliberately `cache: 'no-store'` — an earlier version let deployed changes silently fail to show up for returning users), cache-first for Firebase SDK and Google Fonts CDN assets
- Chart.js for the weekly trend line

## Status

Beta. Currently hosted at `aufthority.github.io/neurohabitbeta`; custom domain migration pending.

**Roadmap (not yet built):**
- Keystone habit identification (surfacing which single habit most strongly correlates with a user's high-score days)
- Struggling-user coaching flow
- Push notifications (requires Firebase Cloud Functions)
- Google Play Store packaging (TWA/Bubblewrap)

## Disclaimer

NeuroHabit is a habit-tracking and psychoeducation tool, not a mental health treatment. It does not diagnose or treat anxiety, depression, ADHD, or any clinical condition. Coaching language draws on published behavioural and neuroscience literature but is not personalised clinical advice.
