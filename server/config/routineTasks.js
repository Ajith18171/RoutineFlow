// The fixed daily routine for the 90 Day Level Up Challenge.
// Keep this file identical to frontend/src/config/routineTasks.js —
// the backend uses the times to decide when to fire notices, the
// frontend uses the same list to render the schedule section.

export const ROUTINE_TASKS = [
  {
    id: "wake_up",
    label: "WAKE UP",
    start: "06:30",
    end: "07:15",
    detail: "Wake up • Freshen up • Start the day with discipline",
  },
  {
    id: "english",
    label: "ENGLISH",
    start: "07:15",
    end: "07:30",
    detail: "Learn English • Speaking practice • Vocabulary",
  },
  {
    id: "notes",
    label: "NOTES",
    start: "07:30",
    end: "08:00",
    detail: "English notes • Review • Improve communication",
  },
  {
    id: "workout",
    label: "WORKOUT",
    start: "08:00",
    end: "08:30",
    detail: "Exercise • Strength • Fitness • Energy",
  },
  {
    id: "breakfast",
    label: "BREAKFAST",
    start: "08:30",
    end: "09:00",
    detail: "Healthy breakfast • Prepare for the day",
  },
  {
    id: "go_to_shop",
    label: "GO TO SHOP",
    start: "09:00",
    end: "09:30",
    detail: "Travel / prepare for work",
  },
  {
    id: "python_practice",
    label: "PYTHON PRACTICE",
    start: "10:00",
    end: "11:00",
    detail: "Coding practice • Projects • Problem solving",
  },
  {
    id: "shop_work",
    label: "SHOP WORK",
    start: "11:00",
    end: "17:00",
    detail: "Work • Responsibility • Focus",
    subTasks: [
      "PYTHON — 1 to 1.5 hours",
      "VIDEO EDITING COURSE — 1 to 1.5 hours",
      "JOB APPLYING",
    ],
  },
  {
    id: "live_streaming",
    label: "LIVE STREAMING",
    start: "18:00",
    end: "20:00",
    detail: "Content creation • Streaming • Build audience",
  },
  {
    id: "leave_shop",
    label: "LEAVE SHOP / TRAVEL",
    start: "20:15",
    end: "20:45",
    detail: "Finish work • Travel home",
  },
  {
    id: "dinner_routine",
    label: "DINNER + NIGHT ROUTINE",
    start: "20:45",
    end: "21:45",
    detail: "Dinner • Relax • Personal routine • Prepare for tomorrow",
  },
  {
    id: "job_search",
    label: "JOB SEARCH",
    start: "22:00",
    end: "22:30",
    detail: "Find jobs • Apply • Improve career opportunities",
  },
];
