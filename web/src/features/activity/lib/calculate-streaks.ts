
import type { DailyActivity } from "@/features/activity/types/activity";

type StreakResult = {
  currentStreak: number;
  longestStreak: number;
};

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function toUTCDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function calculateStreaks(
  days: DailyActivity[],
  now: Date = new Date()
): StreakResult {
  // 1. Collect unique active dates
  const activeDates = new Set(
    days
      .filter((day) => day.total > 0)
      .map((day) => day.date)
  );

  if (activeDates.size === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
    };
  }

  // 2. Sort active dates chronologically
  const sortedDates = [...activeDates].sort();

  // 3. Calculate longest streak
  let longestStreak = 0;
  let consecutiveDays = 0;
  let previousDate: string | null = null;

  for (const date of sortedDates) {
    if (previousDate === null) {
      consecutiveDays = 1;
    } else {
      const previousTime = Date.parse(
        `${previousDate}T00:00:00.000Z`
      );

      const currentTime = Date.parse(
        `${date}T00:00:00.000Z`
      );

      if (currentTime - previousTime === DAY_IN_MS) {
        consecutiveDays++;
      } else {
        consecutiveDays = 1;
      }
    }

    longestStreak = Math.max(longestStreak, consecutiveDays);
    previousDate = date;
  }

  // 4. Calculate current streak
  const todayUTC = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );

  const today = toUTCDateKey(new Date(todayUTC));
  const yesterday = toUTCDateKey(
    new Date(todayUTC - DAY_IN_MS)
  );

  // Today's activity counts immediately.
  // Otherwise, yesterday can still anchor the streak.
  const startingDate = activeDates.has(today)
    ? todayUTC
    : activeDates.has(yesterday)
      ? todayUTC - DAY_IN_MS
      : null;

  let currentStreak = 0;

  if (startingDate !== null) {
    let cursor = startingDate;

    while (
      activeDates.has(toUTCDateKey(new Date(cursor)))
    ) {
      currentStreak++;
      cursor -= DAY_IN_MS;
    }
  }

  return {
    currentStreak,
    longestStreak,
  };
}
