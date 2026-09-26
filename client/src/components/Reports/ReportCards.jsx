import { useTheme } from "../../Context/ThemeContext";

import {
  Trophy,
  TrendingUp,
  Target,
  CheckCircle,
} from "lucide-react";


function PerformanceStats({ stats }) {

  const { darkMode } = useTheme();

  const total = stats?.total || 0;
  const completed = stats?.completed || 0;

  // Calculate directly from total/completed instead of trusting a
  // separate completionRate field that the caller might forget to
  // pass — this was previously always 0% if the parent only sent
  // {total, completed, pending, highPriority} (see ReportCards.jsx).
  const completionRate =
    total > 0 ? Math.round((completed / total) * 100) : 0;


  const cards = [

    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: Target,
      accent: "#4F46E5",
      accentSoft: "rgba(79, 70, 229, 0.12)",
    },

    {
      title: "Completed Tasks",
      value: completed,
      icon: CheckCircle,
      accent: "#10B981",
      accentSoft: "rgba(16, 185, 129, 0.12)",
    },

    {
      title: "High Priority",
      value: stats?.highPriority || 0,
      icon: Trophy,
      accent: "#F43F5E",
      accentSoft: "rgba(244, 63, 94, 0.12)",
    },

    {
      title: "Overall Progress",
      value:
        completionRate >= 80
        ?
        "Excellent"
        :
        completionRate >= 50
        ?
        "Good"
        :
        "Needs Focus",

      icon: TrendingUp,
      accent: "#F59E0B",
      accentSoft: "rgba(245, 158, 11, 0.12)",
    },

  ];




}


export default PerformanceStats;