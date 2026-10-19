
import "server-only";

import { Types } from "mongoose";

import { connectDB } from "@/lib/db/mongoose";
import { Project } from "@/models/project";
import { DevLog } from "@/models/devlog";

import { calculateStreaks } from "@/features/activity/lib/calculate-streaks";
import type {
  DailyActivity,
  ActivitySummary,
} from "@/features/activity/types/activity";

type DailyCount = {
  _id: string;
  count: number;
};

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export async function getActivity(
  userId: string,
  now: Date = new Date()
): Promise<ActivitySummary> {
  if (!Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  await connectDB();

  const ownerId = new Types.ObjectId(userId);

  // Only public projects contribute to public activity.
  const publicProjectIds = await Project.distinct("_id", {
    owner: ownerId,
    isPublic: true,
  });

  // Aggregate all-time project and post activity.
  const [projectCounts, postCounts] = await Promise.all([
    Project.aggregate<DailyCount>([
      {
        $match: {
          owner: ownerId,
          isPublic: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: "UTC",
            },
          },
          count: { $sum: 1 },
        },
      },
    ]),

    DevLog.aggregate<DailyCount>([
      {
        $match: {
          author: ownerId,
          project: { $in: publicProjectIds },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: "UTC",
            },
          },
          count: { $sum: 1 },
        },
      },
    ]),
  ]);

  // Combine contributions from both collections.
  const activityMap = new Map<string, DailyActivity>();

  function addCounts(
    counts: DailyCount[],
    field: "projects" | "posts"
  ) {
    for (const item of counts) {
      const existing = activityMap.get(item._id) ?? {
        date: item._id,
        projects: 0,
        posts: 0,
        total: 0,
      };

      existing[field] += item.count;
      existing.total += item.count;

      activityMap.set(item._id, existing);
    }
  }

  addCounts(projectCounts, "projects");
  addCounts(postCounts, "posts");

  const allDays = [...activityMap.values()].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  // All-time statistics.
  const totalContributions = allDays.reduce(
    (sum, day) => sum + day.total,
    0
  );

  const { currentStreak, longestStreak } =
    calculateStreaks(allDays, now);

  // Calendar window: last 12 months including today.
  const todayUTC = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );

  const startDate = new Date(todayUTC);
  startDate.setUTCFullYear(startDate.getUTCFullYear() - 1);
  startDate.setUTCDate(startDate.getUTCDate() + 1);

  const startTime = startDate.getTime();

  const visibleDays: DailyActivity[] = [];

  for (
    let time = startTime;
    time <= todayUTC;
    time += DAY_IN_MS
  ) {
    const date = new Date(time).toISOString().slice(0, 10);

    visibleDays.push(
      activityMap.get(date) ?? {
        date,
        projects: 0,
        posts: 0,
        total: 0,
      }
    );
  }

  return {
    days: visibleDays,
    stats: {
      totalContributions,
      currentStreak,
      longestStreak,
    },
  };
}
