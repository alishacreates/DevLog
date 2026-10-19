
export type DailyActivity = {
  date: string; // YYYY-MM-DD in UTC
  projects: number;
  posts: number;
  total: number;
};

export type ActivityStats = {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
};

export type ActivitySummary = {
  days: DailyActivity[];
  stats: ActivityStats;
};
