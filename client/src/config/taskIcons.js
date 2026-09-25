// One emoji per routine task, keyed by task_id (not by label — so
// renaming a task via the pencil-edit feature doesn't lose its icon).

export const TASK_ICONS = {
  wake_up: "🌅",
  english: "🗣️",
  notes: "📝",
  workout: "🏋️",
  breakfast: "🍳",
  go_to_shop: "🚶",
  python_practice: "💻",
  shop_work: "🏪",
  live_streaming: "🎥",
  leave_shop: "🚗",
  dinner_routine: "🍽️",
  job_search: "📄",
};

export const getTaskIcon = (taskId) => TASK_ICONS[taskId] || "✅";
