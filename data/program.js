/*
 * gymlog — program content.
 *
 * Everything the app displays lives in this file. Edit freely; the UI in
 * js/app.js reads it at load time. Keep it valid JavaScript (commas, quotes).
 *
 * Text fields support a tiny bit of formatting:
 *   **bold**   *italic*   [link text](https://example.com)
 *
 * Tables are { columns: [...], rows: [[...], ...] }.
 */
(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // Exercise images (from yuhonas/free-exercise-db, public domain / Unlicense).
  // match: "exact" | "close" | "approximate" — approximate ones are listed in
  // README.md so they can be replaced. "source" is the dataset's exercise id.
  // ---------------------------------------------------------------------------
  var IMG = "images/exercises/";
  var images = {
    "bench-press": {
      source: "Barbell_Bench_Press_-_Medium_Grip", match: "exact",
      files: [IMG + "bench-press-0.jpg", IMG + "bench-press-1.jpg"],
      alt: "Barbell bench press: lying on a flat bench, lowering and pressing a barbell over the chest"
    },
    "chest-supported-row": {
      source: "Dumbbell_Incline_Row", match: "close",
      files: [IMG + "chest-supported-row-0.jpg", IMG + "chest-supported-row-1.jpg"],
      alt: "Chest-supported row: chest on an incline bench, rowing two dumbbells up to the sides"
    },
    "neutral-lat-pulldown": {
      source: "V-Bar_Pulldown", match: "close",
      files: [IMG + "neutral-lat-pulldown-0.jpg", IMG + "neutral-lat-pulldown-1.jpg"],
      alt: "Neutral-grip lat pulldown: seated at a cable station pulling a V-bar handle down to the chest"
    },
    "incline-db-press": {
      source: "Incline_Dumbbell_Press", match: "exact",
      files: [IMG + "incline-db-press-0.jpg", IMG + "incline-db-press-1.jpg"],
      alt: "Incline dumbbell press: lying on an incline bench pressing two dumbbells upward"
    },
    "db-lateral-raise": {
      source: "Side_Lateral_Raise", match: "exact",
      files: [IMG + "db-lateral-raise-0.jpg", IMG + "db-lateral-raise-1.jpg"],
      alt: "Dumbbell lateral raise: standing, raising dumbbells out to the sides to shoulder height"
    },
    "db-biceps-curl": {
      source: "Dumbbell_Bicep_Curl", match: "exact",
      files: [IMG + "db-biceps-curl-0.jpg", IMG + "db-biceps-curl-1.jpg"],
      alt: "Dumbbell biceps curl: standing, curling two dumbbells up toward the shoulders"
    },
    "cable-pushdown": {
      source: "Triceps_Pushdown", match: "exact",
      files: [IMG + "cable-pushdown-0.jpg", IMG + "cable-pushdown-1.jpg"],
      alt: "Cable triceps pushdown: standing at a high pulley pushing a bar down until the arms are straight"
    },
    "machine-chest-press": {
      source: "Leverage_Chest_Press", match: "approximate",
      note: "Machine chest press, but the handle grip shown is not necessarily neutral.",
      files: [IMG + "machine-chest-press-0.jpg", IMG + "machine-chest-press-1.jpg"],
      alt: "Machine chest press: seated, pressing the machine handles forward"
    },
    "cable-lateral-raise": {
      source: "Cable_Seated_Lateral_Raise", match: "approximate",
      note: "Shows a seated two-cable lateral raise rather than a standing cable lateral raise.",
      files: [IMG + "cable-lateral-raise-0.jpg", IMG + "cable-lateral-raise-1.jpg"],
      alt: "Cable lateral raise: seated between two low pulleys, raising the handles out to the sides"
    },
    "reverse-pec-deck": {
      source: "Reverse_Machine_Flyes", match: "exact",
      files: [IMG + "reverse-pec-deck-0.jpg", IMG + "reverse-pec-deck-1.jpg"],
      alt: "Reverse pec deck: seated facing the machine, pulling the handles out and back in an arc"
    },
    "rope-pushdown": {
      source: "Triceps_Pushdown_-_Rope_Attachment", match: "exact",
      files: [IMG + "rope-pushdown-0.jpg", IMG + "rope-pushdown-1.jpg"],
      alt: "Rope triceps pushdown: standing at a high pulley pushing a rope down and apart"
    },
    "goblet-squat": {
      source: "Goblet_Squat", match: "close",
      note: "Shown with a kettlebell; a dumbbell held at the chest is the same movement.",
      files: [IMG + "goblet-squat-0.jpg", IMG + "goblet-squat-1.jpg"],
      alt: "Goblet squat: holding a weight at the chest and squatting down"
    },
    "seated-leg-curl": {
      source: "Seated_Leg_Curl", match: "exact",
      files: [IMG + "seated-leg-curl-0.jpg", IMG + "seated-leg-curl-1.jpg"],
      alt: "Seated leg curl: seated in the machine, bending the knees to pull the pad down"
    },
    "split-squat": {
      source: "Split_Squats", match: "approximate",
      note: "Bodyweight split stance with no hand support shown (the dataset entry also describes a jumping variation).",
      files: [IMG + "split-squat-0.jpg", IMG + "split-squat-1.jpg"],
      alt: "Split squat: one foot forward, one back, lowering the back knee toward the floor"
    },
    "leg-extension": {
      source: "Leg_Extensions", match: "exact",
      files: [IMG + "leg-extension-0.jpg", IMG + "leg-extension-1.jpg"],
      alt: "Leg extension: seated in the machine, straightening the knees to lift the pad"
    },
    "standing-calf-raise": {
      source: "Standing_Calf_Raises", match: "close",
      note: "Shown on a shoulder-pad calf machine; any standing calf raise matches the plan.",
      files: [IMG + "standing-calf-raise-0.jpg", IMG + "standing-calf-raise-1.jpg"],
      alt: "Standing calf raise: standing on the balls of the feet and rising up onto the toes"
    },
    "bird-dog": {
      source: "Dead_Bug", match: "approximate",
      note: "No bird dog in the dataset. Dead bug is the same opposite-arm/opposite-leg pattern, but lying on your back instead of on hands and knees.",
      files: [IMG + "bird-dog-0.jpg", IMG + "bird-dog-1.jpg"],
      alt: "Placeholder for bird dog: dead bug exercise, lying on the back extending opposite arm and leg"
    },
    "side-plank": {
      source: "Side_Bridge", match: "approximate",
      note: "Shows a full side bridge from the feet, not a modified (knees-down) side plank.",
      files: [IMG + "side-plank-0.jpg", IMG + "side-plank-1.jpg"],
      alt: "Side plank: lying on one side, propped on the forearm, lifting the hips off the floor"
    },
    "glute-bridge": {
      source: "Butt_Lift_Bridge", match: "exact",
      files: [IMG + "glute-bridge-0.jpg", IMG + "glute-bridge-1.jpg"],
      alt: "Glute bridge: lying on the back with knees bent, lifting the hips off the floor"
    }
  };

  // ---------------------------------------------------------------------------
  // Workouts
  // ---------------------------------------------------------------------------
  var upperWarmupSteps = [
    "Treadmill or stationary bike: 3 minutes, easy pace.",
    "Band external rotations: 2 × 12 per arm.",
    "Light cable face pulls: 1 × 15.",
    "Bench press warm-up sets: use the empty bar, then progressively heavier sets before your working weight."
  ];

  var workouts = {
    monday: {
      session: "Upper A — strength",
      goal: "Build your chest, back, shoulders, and arms while gradually improving your pressing and pulling strength.",
      duration: "65–80 minutes",
      warmup: {
        duration: "8–10 minutes",
        steps: upperWarmupSteps,
        note: "Warm-up exercises should be comfortable. Don't force your shoulder through painful ranges."
      },
      exercises: [
        {
          n: 1, name: "Barbell bench press", sets: 3, reps: "5–8", rest: "2–3 min", image: "bench-press",
          note: "If this exercise causes back pain, start with a light load and a comfortable setup. Keep your rib cage and pelvis controlled without forcing your back flat or arching excessively.",
          sub: "If pain persists, switch to a machine chest press with a comfortable grip and range of motion."
        },
        {
          n: 2, name: "Chest-supported row", sets: 3, reps: "6–10", rest: "2 min", image: "chest-supported-row",
          note: "Preferred over unsupported bent-over rows because it reduces the need to hold your torso in a bent position."
        },
        { n: 3, name: "Neutral-grip lat pulldown", sets: 3, reps: "8–12", rest: "90 sec", image: "neutral-lat-pulldown" },
        {
          n: 4, name: "Incline dumbbell press", sets: 2, reps: "8–12", rest: "90–120 sec", image: "incline-db-press",
          note: "Start with a low incline and light weights.",
          sub: "If your shoulder doesn't tolerate it, substitute a comfortable machine chest press."
        },
        { n: 5, name: "Dumbbell lateral raises", sets: 3, reps: "12–20", rest: "60 sec", image: "db-lateral-raise" },
        { n: 6, name: "Dumbbell biceps curls", sets: 2, reps: "8–12", rest: "60 sec", image: "db-biceps-curl" },
        { n: 7, name: "Cable triceps pushdowns", sets: 2, reps: "10–15", rest: "60 sec", image: "cable-pushdown" }
      ],
      notes: [
        {
          title: "Important adjustments",
          body: [
            { list: [
              "*Bench press:* If this exercise causes back pain, start with a light load and a comfortable setup. Keep your rib cage and pelvis controlled without forcing your back flat or arching excessively. If pain persists, switch to a machine chest press with a comfortable grip and range of motion.",
              "*Incline dumbbell press:* Start with a low incline and light weights. If your shoulder doesn't tolerate it, substitute a comfortable machine chest press.",
              "Chest-supported rows are preferred over unsupported bent-over rows because they reduce the need to hold your torso in a bent position."
            ] },
            "Don't increase the load on a painful movement simply because you can complete the prescribed repetitions."
          ]
        }
      ]
    },

    tuesday: {
      session: "Lower A — quads and core",
      goal: "Develop your quadriceps, hamstrings, glutes, and trunk strength without making heavy barbell squats or deadlifts the foundation of your program.",
      duration: "60–75 minutes",
      warmup: {
        duration: "8–10 minutes",
        steps: [
          "Stationary bike: 4 minutes.",
          "Bodyweight sit-to-stand or comfortable shallow squats: 2 × 8.",
          "Unloaded glute bridges: 1 × 12.",
          "A light practice set of your first leg exercise."
        ]
      },
      exercises: [
        {
          n: 1, name: "Goblet squat to a comfortable depth", sets: 3, reps: "8–12", rest: "2 min", image: "goblet-squat",
          note: "Use a box or bench as a depth target if that helps you maintain control. Start with bodyweight squats if needed."
        },
        { n: 2, name: "Seated leg curl", sets: 3, reps: "10–15", rest: "90 sec", image: "seated-leg-curl" },
        {
          n: 3, name: "Supported split squat", sets: 2, reps: "8–10 per leg", rest: "90 sec", image: "split-squat",
          note: "Keep a hand on a stable support to improve balance."
        },
        { n: 4, name: "Leg extension", sets: 2, reps: "10–15", rest: "60–90 sec", image: "leg-extension" },
        { n: 5, name: "Standing calf raises", sets: 3, reps: "12–20", rest: "60 sec", image: "standing-calf-raise" },
        {
          n: 6, name: "Bird dog", sets: 2, reps: "6–8 per side", rest: "45–60 sec", image: "bird-dog",
          sub: "Stop if it causes back pain, radiating pain, or other symptoms."
        },
        {
          n: 7, name: "Side plank, modified if necessary", sets: 2, reps: "15–30 sec per side", rest: "45–60 sec", image: "side-plank",
          sub: "Stop if it causes back pain, radiating pain, or other symptoms."
        }
      ],
      notes: [
        {
          title: "Why these exercises?",
          body: [
            { list: [
              "**Goblet squats:** Let you practice the squat pattern with relatively light loads. Use a box or bench as a depth target if that helps you maintain control.",
              "**Seated leg curls:** Train your hamstrings without requiring you to lift a weight from the floor.",
              "**Supported split squats:** Train each leg independently, with a hand on a stable support to improve balance.",
              "**Leg extensions:** Add quadriceps work without requiring a squat.",
              "**Bird dogs and side planks:** Provide a starting point for trunk-strengthening work."
            ] },
            "Start with bodyweight squats if needed. You do not need to add weight until the movement feels comfortable and controlled.",
            "For the core exercises, stop if they cause back pain, radiating pain, or other symptoms. A physiotherapist can help tailor these exercises to your individual symptoms.",
            "**No leg press is required.** It is an optional exercise, not a prerequisite for building strong legs."
          ]
        }
      ]
    },

    thursday: {
      session: "Upper B — balanced upper body",
      goal: "Build your back, chest, shoulders, and arms while getting a second weekly exposure to your main upper-body muscle groups.",
      duration: "60–75 minutes",
      warmup: {
        duration: "8–10 minutes",
        intro: "Repeat Monday's warm-up, adjusting the shoulder movements according to how you feel.",
        steps: upperWarmupSteps,
        note: "Warm-up exercises should be comfortable. Don't force your shoulder through painful ranges."
      },
      exercises: [
        {
          n: 1, name: "Neutral-grip machine chest press", sets: 3, reps: "8–12", rest: "2 min", image: "machine-chest-press",
          note: "Use the machine chest press only if it is comfortable for your shoulder and back.",
          sub: "If it hurts, try an alternative with a comfortable range of motion, or omit pressing until you've had your shoulder assessed."
        },
        { n: 2, name: "Chest-supported row", sets: 3, reps: "8–12", rest: "90–120 sec", image: "chest-supported-row" },
        { n: 3, name: "Neutral-grip lat pulldown", sets: 3, reps: "8–12", rest: "90 sec", image: "neutral-lat-pulldown" },
        { n: 4, name: "Cable lateral raises", sets: 3, reps: "12–20", rest: "60 sec", image: "cable-lateral-raise" },
        { n: 5, name: "Reverse pec deck", sets: 2, reps: "12–15", rest: "60 sec", image: "reverse-pec-deck" },
        { n: 6, name: "Dumbbell biceps curls", sets: 3, reps: "10–12", rest: "60 sec", image: "db-biceps-curl" },
        { n: 7, name: "Rope triceps pushdowns", sets: 3, reps: "10–15", rest: "60 sec", image: "rope-pushdown" }
      ],
      notes: [
        {
          title: "Machine chest press",
          body: [
            "Use the machine chest press only if it is comfortable for your shoulder and back. If it hurts, try an alternative with a comfortable range of motion, or omit pressing until you've had your shoulder assessed."
          ]
        },
        {
          title: "What about overhead presses?",
          body: [
            "Heavy overhead pressing is deliberately left out of the initial program.",
            "It isn't inherently a bad exercise, but it can aggravate a sensitive or previously painful shoulder. You can build strong shoulders with lateral raises, reverse pec deck, and comfortable pressing movements.",
            "Once your shoulder tolerates your current routine consistently, you can consider introducing a light, pain-free overhead press."
          ]
        }
      ]
    },

    saturday: {
      session: "Lower B — legs and posterior chain",
      goal: "Train your glutes, hamstrings, quadriceps, calves, and core while complementing Tuesday's workout.",
      intro: "This session is also a good place to build lower-body strength without rushing into heavy spinal loading.",
      duration: "55–70 minutes",
      warmup: {
        duration: "8–10 minutes",
        steps: [
          "Stationary bike: 4 minutes.",
          "Bodyweight sit-to-stand: 1 × 10.",
          "Unloaded glute bridges: 1 × 12.",
          "One light set of your first two exercises."
        ]
      },
      exercises: [
        {
          n: 1, name: "Supported split squat", sets: 3, reps: "8–10 per leg", rest: "90–120 sec", image: "split-squat",
          note: "Keep a hand on a stable support to improve balance."
        },
        { n: 2, name: "Seated leg curl", sets: 3, reps: "10–15", rest: "90 sec", image: "seated-leg-curl" },
        {
          n: 3, name: "Glute bridge", sets: 3, reps: "10–15", rest: "90 sec", image: "glute-bridge",
          note: "Begin with bodyweight before considering any additional load."
        },
        { n: 4, name: "Leg extension", sets: 2, reps: "12–15", rest: "60–90 sec", image: "leg-extension" },
        { n: 5, name: "Standing calf raises", sets: 3, reps: "12–20", rest: "60 sec", image: "standing-calf-raise" },
        {
          n: 6, name: "Bird dog", sets: 2, reps: "6–8 per side", rest: "45–60 sec", image: "bird-dog",
          sub: "Stop if it causes back pain, radiating pain, or other symptoms."
        },
        {
          n: 7, name: "Side plank, modified if necessary", sets: 2, reps: "15–30 sec per side", rest: "45–60 sec", image: "side-plank",
          sub: "Stop if it causes back pain, radiating pain, or other symptoms."
        }
      ],
      notes: [
        {
          title: "What about deadlifts?",
          body: [
            "Possibly, but there is no need to rush.",
            "A Romanian deadlift, for example, can train the hamstrings and glutes effectively, but it also requires you to control your trunk while holding a load. If you have back symptoms, have a physiotherapist assess your movement and advise you on an appropriate progression first.",
            "In the meantime, glute bridges and leg curls allow you to train much of the same musculature.",
            "You can build considerable lower-body strength without performing conventional deadlifts."
          ]
        }
      ]
    }
  };

  // ---------------------------------------------------------------------------
  // Week schedule (Monday first). type: "workout" | "rest" | "optional"
  // ---------------------------------------------------------------------------
  var week = [
    { id: "monday",    label: "Monday",    time: "06:30",    type: "workout",  session: "Upper A — strength" },
    { id: "tuesday",   label: "Tuesday",   time: "06:30",    type: "workout",  session: "Lower A — quads and core" },
    { id: "wednesday", label: "Wednesday", time: "—",        type: "rest",     session: "Rest" },
    { id: "thursday",  label: "Thursday",  time: "06:30",    type: "workout",  session: "Upper B — balanced upper body" },
    { id: "friday",    label: "Friday",    time: "—",        type: "rest",     session: "Rest" },
    { id: "saturday",  label: "Saturday",  time: "Flexible", type: "workout",  session: "Lower B — legs and posterior chain",
      tag: "Can move to Sunday" },
    { id: "sunday",    label: "Sunday",    time: "Flexible", type: "optional", session: "Optional running, swimming, or rest" }
  ];

  // ---------------------------------------------------------------------------
  // Info pages
  // ---------------------------------------------------------------------------
  var schedule = {
    intro: "Consistency matters more than maximizing the number of exercises.",
    sessionLength: "Each gym session should take approximately **55–80 minutes**, including your warm-up.",
    notes: [
      "Saturday's lower-body session can be moved to Sunday if necessary. If you miss a workout, just continue the sequence rather than trying to squeeze two sessions into one day."
    ]
  };

  var restDays = {
    wednesday: { next: "thursday" },
    friday: { next: "saturday" },
    sunday: {
      intro: "Optional running, swimming, or rest. Saturday's lower-body session can be moved to Sunday if necessary.",
      next: "monday"
    },
    tip: "If your back tends to hurt after long periods of sitting, get up periodically, walk around, and change positions. You don't need an elaborate mobility routine; short movement breaks throughout the day are a practical starting point."
  };

  var safety = {
    intro: "This is a conservative starting template for training around back and shoulder sensitivity, not a medically cleared rehabilitation program.",
    rules: [
      "Arrange a physiotherapy or sports-medicine assessment before progressing to heavy compound lifts.",
      "Keep your spine in a comfortable, controlled position; don't force an exaggerated arch during bench pressing.",
      "Stop any exercise that reproduces or increases your back or shoulder pain. Substitute a comfortable movement rather than pushing through it.",
      "Start with approximately **3–4 repetitions in reserve (RIR)**, meaning you finish each set feeling you could do another 3–4 good repetitions.",
      "Don't test your maximum lifts or train to failure during the first few weeks."
    ],
    rulesSource: "Staying active and selecting exercises that suit your individual symptoms are consistent with current low-back-pain guidance. [NICE](https://www.nice.org.uk/guidance/ng59/chapter/Recommendations)",
    warning: {
      title: "Warning signs — seek urgent medical assessment",
      items: [
        "New or worsening leg weakness",
        "Significant numbness",
        "Numbness around the groin or saddle area",
        "New bladder or bowel dysfunction"
      ],
      text: "Seek urgent medical assessment if you develop new or worsening leg weakness, significant numbness, numbness around the groin or saddle area, or new bladder or bowel dysfunction. These symptoms can indicate a serious spinal problem. [nhs.uk](https://www.nhs.uk/conditions/back-pain/)"
    },
    stopSet: {
      title: "When should you stop a set?",
      intro: "End the set when:",
      items: [
        "Your technique begins to deteriorate.",
        "You can no longer maintain the intended movement.",
        "You feel sharp or increasing pain.",
        "You develop radiating pain, numbness, or unusual weakness."
      ],
      outro: "If a movement repeatedly provokes symptoms, stop using it and get professional guidance rather than repeatedly testing it."
    },
    adjustments: {
      title: "Back and shoulder adjustments",
      groups: [
        {
          title: "Bench press (Monday)",
          text: "If this exercise causes back pain, start with a light load and a comfortable setup. Keep your rib cage and pelvis controlled without forcing your back flat or arching excessively.",
          sub: "If pain persists, switch to a machine chest press with a comfortable grip and range of motion."
        },
        {
          title: "Incline dumbbell press (Monday)",
          text: "Start with a low incline and light weights.",
          sub: "If your shoulder doesn't tolerate it, substitute a comfortable machine chest press."
        },
        {
          title: "Machine chest press (Thursday)",
          text: "Use the machine chest press only if it is comfortable for your shoulder and back.",
          sub: "If it hurts, try an alternative with a comfortable range of motion, or omit pressing until you've had your shoulder assessed."
        },
        {
          title: "Rows",
          text: "Chest-supported rows are preferred over unsupported bent-over rows because they reduce the need to hold your torso in a bent position."
        },
        {
          title: "Core exercises",
          text: "For the core exercises, stop if they cause back pain, radiating pain, or other symptoms. A physiotherapist can help tailor these exercises to your individual symptoms."
        },
        {
          title: "Overhead pressing",
          text: "Heavy overhead pressing is deliberately left out of the initial program because it can aggravate a sensitive shoulder. Once your shoulder tolerates your current routine consistently, you can consider introducing a light, pain-free overhead press."
        },
        {
          title: "Deadlifts and heavy spinal loading",
          text: "Heavy deadlifts and back squats are not mandatory exercises. If you have back symptoms, have a physiotherapist assess your movement and advise you on an appropriate progression before introducing a Romanian deadlift. In the meantime, glute bridges and leg curls allow you to train much of the same musculature."
        },
        {
          title: "Warming up",
          text: "For your shoulder, gradual loading is particularly important. For your back, avoid starting a workout immediately after getting out of bed and jumping into demanding movements."
        },
        {
          title: "Sitting",
          text: "If your back tends to hurt after long periods of sitting, get up periodically, walk around, and change positions. You don't need an elaborate mobility routine; short movement breaks throughout the day are a practical starting point."
        }
      ],
      outro: "Don't increase the load on a painful movement simply because you can complete the prescribed repetitions."
    }
  };

  var progression = {
    intro: [
      "This is one of the most important parts of your program.",
      "You don't need to change your exercises every week. You need to gradually do more work with good technique."
    ],
    double: {
      title: "Double progression",
      example: "Suppose your workout prescribes: **Bench press: 3 × 5–8**",
      tableIntro: "Your progression might look like this:",
      table: {
        columns: ["Session", "Set 1", "Set 2", "Set 3"],
        rows: [
          ["1", "6", "6", "5"],
          ["2", "7", "6", "6"],
          ["3", "8", "7", "6"],
          ["4", "8", "8", "8"]
        ]
      },
      after: [
        "You keep the same weight while gradually increasing your repetitions.",
        "Once you can perform all three sets of eight with good technique, sufficient repetitions in reserve, and no worsening symptoms, increase the weight slightly.",
        "Then work your way up through the repetition range again.",
        "For smaller exercises, such as curls and lateral raises, you can use the same principle with a range of 10–15 or 12–20 repetitions."
      ]
    },
    effort: {
      title: "How hard should sets feel?",
      rir: "Start with approximately **3–4 repetitions in reserve (RIR)**, meaning you finish each set feeling you could do another 3–4 good repetitions.",
      target: "Your target effort is approximately 6–7 out of 10 for the first two weeks.",
      after: [
        "Every repetition should be controlled, and you should finish each set with several good repetitions still available.",
        "There is no benefit to testing your limits while you're still learning how your back and shoulder respond to the program.",
        "Don't test your maximum lifts or train to failure during the first few weeks."
      ]
    },
    starting: {
      title: "How to choose your starting weights",
      intro: [
        "Don't worry about finding the perfect weight on day one. Your first two weeks are about learning the movements, finding comfortable ranges, and establishing a baseline.",
        "Here is how to approach your starting loads."
      ],
      table: {
        columns: ["Exercise", "Starting approach"],
        rows: [
          ["Bench press", "Your current working weight is a useful reference, but start lighter if needed to eliminate back discomfort."],
          ["Chest-supported row", "Start with a load you can control for 10 repetitions without moving your torso."],
          ["Lat pulldown", "Choose a load that permits 8–12 controlled repetitions without leaning back excessively."],
          ["Dumbbell curls", "Start with a weight you already find comfortable, if you can complete the prescribed repetitions with strict form."],
          ["Goblet squat", "Start with bodyweight, then try a light dumbbell if comfortable."],
          ["Split squat", "Begin with bodyweight and use a support for balance."],
          ["Leg curl and leg extension", "Start near the lighter end of the machine's range and adjust based on technique and comfort."],
          ["Glute bridge", "Begin with bodyweight before considering any additional load."]
        ]
      }
    },
    increments: {
      title: "How much weight should you add?",
      items: [
        "Upper-body compound exercises: typically 1–2.5 kg total.",
        "Lower-body exercises: typically 2.5–5 kg total, depending on the exercise and available increments.",
        "Dumbbell isolation exercises: use the smallest available increase."
      ],
      after: [
        "These are examples, not targets you must hit every week.",
        "For exercises that affect your back or shoulder, **symptom-free, controlled progress takes priority over adding weight**."
      ]
    },
    firstWeeks: {
      title: "Your first four weeks",
      intro: "Here's how to introduce the program.",
      table: {
        columns: ["Week", "Focus"],
        rows: [
          ["Week 1", "Learn the exercises, establish comfortable ranges, and use light loads."],
          ["Week 2", "Repeat the movements and gradually improve repetitions where comfortable."],
          ["Week 3", "Increase weights slightly on exercises where you've met the progression criteria."],
          ["Week 4", "Continue progressing where appropriate; reduce the load or volume if recovery or symptoms require it."]
        ]
      },
      after: [
        "You don't need a mandatory deload in week four if you're recovering well. Equally, you don't need to progress every exercise every week.",
        "**The most important goal for your first month is to establish a sustainable routine without aggravating your back or shoulder.**"
      ]
    }
  };

  var cardio = {
    title: "Weekend cardio",
    intro: [
      "Cardio is scheduled on weekends to keep weekdays manageable.",
      "Start with one or two flexible sessions."
    ],
    options: [
      {
        key: "A", title: "Running", duration: "20–30 minutes",
        body: [
          "Start with 20–30 minutes at an easy, conversational pace.",
          "If you haven't run recently, alternate jogging and walking as needed. Increase the duration gradually rather than trying to hit a particular distance."
        ]
      },
      {
        key: "B", title: "Swimming", duration: "20–40 minutes",
        body: [
          "Start with 20–40 minutes at a comfortable pace.",
          "Swimming is a useful way to work on cardiovascular fitness without the repetitive impact of running. However, some strokes or positions may aggravate back or shoulder symptoms, so choose comfortable movements."
        ]
      },
      {
        key: "C", title: "A flexible weekend",
        body: ["You don't have to do both."],
        table: {
          columns: ["Saturday", "Sunday"],
          rows: [
            ["Lower-body workout", "Easy run or swim"],
            ["Optional easy walk", "Or complete rest"]
          ]
        },
        after: ["If you want to run on Saturday instead, move the lower-body workout to Sunday."]
      }
    ],
    recommendation: "**Recommendation:** begin with one easy cardio session per weekend. After a few weeks, add a second if your recovery, schedule, and symptoms allow it.",
    outro: "The goal is to maintain fitness and enjoy the activity, not to turn every weekend into another demanding training block."
  };

  var nutrition = {
    title: "Nutrition: gain weight gradually",
    intro: [
      "Gaining weight gradually is a reasonable goal if you want to build muscle.",
      "If you find it hard to eat enough, don't begin with an aggressive bulking diet or an unnecessarily complicated calorie-tracking routine."
    ],
    targets: {
      title: "Your initial targets",
      table: {
        columns: ["Metric", "Starting target"],
        rows: [
          ["Daily protein", "Approximately 1.6–2.0 g per kg of body weight"],
          ["Rate of weight gain", "Around 0.1–0.25 kg per week"],
          ["Sleep", "Aim for 7.5–8 hours when possible"]
        ]
      },
      after: [
        "A protein intake of approximately 1.6–2.0 g/kg of body weight is a reasonable target for resistance training.",
        "You don't have to hit the target perfectly every day."
      ]
    },
    shake: {
      title: "How to eat more without forcing yourself",
      intro: "Instead of adding several large meals, start by adding one easy, calorie-dense snack or shake. For example:",
      ingredients: ["300 ml milk", "1 banana", "40–60 g oats", "1 tablespoon peanut butter"],
      method: "Blend everything together.",
      after: [
        "Depending on the ingredients and quantities, this provides roughly 450–650 calories and a useful amount of protein.",
        "If you tolerate milk well, this can be an easy way to increase your intake without feeling like you have to eat another full meal."
      ],
      foods: "Other useful foods include eggs, rice, potatoes, chicken, fish, yogurt, cheese, nuts, beans, and olive oil."
    },
    weighIn: {
      title: "Do you need to track calories?",
      intro: "Not necessarily at first. Instead, do this:",
      steps: [
        "Weigh yourself in the morning, after using the bathroom and before breakfast, on 3–4 days each week.",
        "Calculate your average weekly weight.",
        "Eat roughly the same amount each day, including your additional snack.",
        "Compare your weekly averages over 2–3 weeks.",
        "If your average weight isn't increasing, add another small snack or increase your portions."
      ],
      after: "If you want to track calories later, estimate your maintenance intake and set a starting target."
    },
    reflux: "If you get reflux symptoms, avoid forcing large meals or drinking a large shake immediately before lying down. Smaller, more frequent meals may be more comfortable."
  };

  var routine = {
    title: "Morning routine at 06:30",
    intro: [
      "The program should be easy to follow even when you're tired.",
      "Here's a realistic morning:"
    ],
    table: {
      columns: ["Time", "Activity"],
      rows: [
        ["06:20", "Arrive and get ready"],
        ["06:30–06:40", "Warm-up"],
        ["06:40–07:35", "Main workout"],
        ["07:35–07:45", "Finish accessories or core work"],
        ["07:45–08:00", "Change and leave"],
        ["Afterward", "Breakfast"]
      ]
    },
    after: [
      "You don't need to stretch every muscle before lifting or spend 20 minutes warming up.",
      "Instead, do a short general warm-up, prepare the joints involved in that day's movements, and perform progressively heavier warm-up sets for your first exercise.",
      "For your shoulder, gradual loading is particularly important. For your back, avoid starting a workout immediately after getting out of bed and jumping into demanding movements."
    ],
    adjustment: {
      title: "One adjustment worth making",
      body: [
        "If your back tends to hurt after long periods of sitting, try this.",
        "Throughout the day, get up periodically, walk around, and change positions. You don't need an elaborate mobility routine; short movement breaks throughout the day are a practical starting point.",
        "General guidance for low back pain emphasizes remaining active and choosing exercise suited to your individual needs. [NICE](https://www.nice.org.uk/guidance/ng59/chapter/Recommendations)"
      ]
    }
  };

  var tracking = {
    title: "What to track each week",
    intro: [
      "Keep your tracking simple. You don't need a complicated spreadsheet or a fitness app with dozens of metrics.",
      "Record these four things:"
    ],
    table: {
      columns: ["Metric", "Frequency"],
      rows: [
        ["Body weight", "3–4 mornings per week"],
        ["Exercises, weights, and repetitions", "Every workout"],
        ["Back and shoulder symptoms", "Before and after each workout"],
        ["Sleep duration", "Daily, approximately"]
      ]
    },
    after: [
      "Your primary measure of progress will be whether you can perform more repetitions or use more weight while maintaining good technique and tolerating the exercises well.",
      "You should also monitor your general energy levels and whether your performance is improving across several weeks.",
      "If you're consistently tired, losing weight, or experiencing worsening pain, don't simply add more training volume."
    ]
  };

  window.PROGRAM = {
    title: "gymlog",
    footer: "Personal training template, not medical advice. Get physio clearance before heavy spinal loading.",
    images: images,
    week: week,
    workouts: workouts,
    schedule: schedule,
    restDays: restDays,
    safety: safety,
    progression: progression,
    cardio: cardio,
    nutrition: nutrition,
    routine: routine,
    tracking: tracking
  };
})();
