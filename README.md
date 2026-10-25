# gymlog

A static, mobile-first website for a weekly gym program: the weekly schedule, each workout day with tappable set checkboxes, safety and form notes, progression rules, and cardio and nutrition guidance.

## Editing the program

All content is in **`data/program.js`**. You don't need to touch the UI code.

- **Exercises:** `workouts.<day>.exercises`. Each entry looks like this:
  ```js
  { n: 1, name: "Barbell bench press", sets: 3, reps: "5–8", rest: "2–3 min",
    image: "bench-press",
    note: "Shown under the exercise in muted text.",
    sub: "Shown in the amber 'If it hurts' box." }
  ```
  `sets` must be a number because it sets how many checkboxes appear. `reps` and `rest` are free text, for example `"8–10 per leg"` or `"15–30 sec per side"`.
- **Warm-up:** `workouts.<day>.warmup.steps` holds the steps in order. Upper A and Upper B share the `upperWarmupSteps` list.
- **Day notes:** `workouts.<day>.notes` is a list of `{ title, body }`. In `body`, each string becomes a paragraph and `{ list: [...] }` becomes a bullet list.
- **Schedule:** the `week` array. Its `type` is `"workout"`, `"rest"` or `"optional"`.
- **Info pages:** the `safety`, `progression`, `cardio`, `nutrition`, `routine` and `tracking` objects. Tables use `{ columns: [...], rows: [[...]] }`.
- **Formatting in text:** `**bold**`, `*italic*`, `[link](https://…)`.
- **Images:** the `images` object maps a key such as `"bench-press"` to its files, alt text, the source dataset id and match quality. To swap a picture, drop a new file into `images/exercises/` and update `files` (and `alt`) for that key.

Use en dashes (`–`) for ranges and `×` for sets × reps so everything reads consistently.

## Exercise images: credits and license

The photos come from **[free-exercise-db](https://github.com/yuhonas/free-exercise-db)** by yuhonas, released under **The Unlicense** (public domain; see the dataset's `LICENSE.md`). Attribution isn't required but is given here anyway. The images were downloaded into this repo, not hotlinked, and renamed to short slugs (`<exercise>-0.jpg` is the start position and `-1.jpg` is the end position).

| Exercise in program | File slug | Dataset entry | Match |
|---|---|---|---|
| Barbell bench press | `bench-press` | `Barbell_Bench_Press_-_Medium_Grip` | exact |
| Chest-supported row | `chest-supported-row` | `Dumbbell_Incline_Row` | close |
| Neutral-grip lat pulldown | `neutral-lat-pulldown` | `V-Bar_Pulldown` | close |
| Incline dumbbell press | `incline-db-press` | `Incline_Dumbbell_Press` | exact |
| Dumbbell lateral raises | `db-lateral-raise` | `Side_Lateral_Raise` | exact |
| Dumbbell biceps curls | `db-biceps-curl` | `Dumbbell_Bicep_Curl` | exact |
| Cable triceps pushdowns | `cable-pushdown` | `Triceps_Pushdown` | exact |
| Neutral-grip machine chest press | `machine-chest-press` | `Leverage_Chest_Press` | **approximate** |
| Cable lateral raises | `cable-lateral-raise` | `Cable_Seated_Lateral_Raise` | **approximate** |
| Reverse pec deck | `reverse-pec-deck` | `Reverse_Machine_Flyes` | exact |
| Rope triceps pushdowns | `rope-pushdown` | `Triceps_Pushdown_-_Rope_Attachment` | exact |
| Goblet squat | `goblet-squat` | `Goblet_Squat` | close |
| Seated leg curl | `seated-leg-curl` | `Seated_Leg_Curl` | exact |
| Supported split squat | `split-squat` | `Split_Squats` | **approximate** |
| Leg extension | `leg-extension` | `Leg_Extensions` | exact |
| Standing calf raises | `standing-calf-raise` | `Standing_Calf_Raises` | close |
| Bird dog | `bird-dog` | `Dead_Bug` | **approximate / missing** |
| Side plank, modified | `side-plank` | `Side_Bridge` | **approximate** |
| Glute bridge | `glute-bridge` | `Butt_Lift_Bridge` | exact |

Warm-up drills (band external rotations, face pulls, etc.) don't have images.

### Approximate or missing matches (worth replacing)

- **Bird dog → Dead bug.** The dataset has no bird dog. Dead bug uses the same opposite-arm/opposite-leg pattern, but lying on your back instead of on hands and knees. This is the weakest match.
- **Side plank, modified → Side bridge.** It shows a full side bridge from the feet, not the knees-down modified version.
- **Supported split squat → Split squats.** It shows a bodyweight split stance with no hand on a support. The dataset entry also describes a jumping version, which isn't what the plan means.
- **Neutral-grip machine chest press → Leverage chest press.** It is a machine chest press, but the grip shown isn't clearly neutral.
- **Cable lateral raises → Cable seated lateral raise.** It shows a seated two-cable version rather than a standing one.

Close matches, which are the right movement with a different implement or detail:

- **Chest-supported row → Dumbbell incline row.** Chest on an incline bench with dumbbells, not a machine.
- **Neutral-grip lat pulldown → V-bar pulldown.** The grip is neutral and the handle is narrow.
- **Goblet squat:** shown with a kettlebell rather than a dumbbell.
- **Standing calf raises:** shown on a shoulder-pad calf machine.
