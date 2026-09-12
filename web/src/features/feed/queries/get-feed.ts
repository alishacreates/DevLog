import { Types } from "mongoose";
import type { PipelineStage } from "mongoose";

import { connectDB } from "@/lib/db/mongoose";
import { DevLog } from "@/models/devlog";

const FEED_PAGE_SIZE = 10;

export async function getFeed(
  cursor?: string,
  currentUserId?: string
) {
  await connectDB();

  const pipeline: PipelineStage[] = [];

  if (cursor && Types.ObjectId.isValid(cursor)) {
    pipeline.push({
      $match: {
        _id: {
          $lt: new Types.ObjectId(cursor),
        },
      },
    });
  }

  pipeline.push(
    {
      $sort: {
        _id: -1,
      },
    },

    {
      $lookup: {
        from: "projects",
        localField: "project",
        foreignField: "_id",
        as: "project",
      },
    },

    {
      $unwind: "$project",
    },

    {
      $match: {
        "project.isPublic": true,
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },

    {
      $unwind: "$author",
    },

      {
    $lookup: {
      from: "likes",
      localField: "_id",
      foreignField: "devLog",
      as: "likes",
    },
  },

  {
  $lookup: {
    from: "comments",
    localField: "_id",
    foreignField: "devLog",
    as: "comments",
  },
},
    {
      $limit: FEED_PAGE_SIZE + 1,
    }
  );

  const devLogs = await DevLog.aggregate(pipeline);

  const hasMore = devLogs.length > FEED_PAGE_SIZE;

  const items = hasMore
    ? devLogs.slice(0, FEED_PAGE_SIZE)
    : devLogs;

  const serializedItems = items.map((devLog) => ({
  id: devLog._id.toString(),
  title: devLog.title,
  content: devLog.content,
  tags: devLog.tags,
  createdAt: new Date(devLog.createdAt).toISOString(),

  likesCount: devLog.likes?.length ?? 0,

likedByCurrentUser: currentUserId
  ? (devLog.likes ?? []).some(
      (like: { user: Types.ObjectId }) =>
        like.user.toString() === currentUserId
    )
  : false,
  commentsCount: devLog.comments?.length ?? 0,

  author: {
    id: devLog.author._id.toString(),
    name: devLog.author.name,
    username: devLog.author.username,
    image: devLog.author.image,
  },

  project: {
    id: devLog.project._id.toString(),
    title: devLog.project.title,
  },
}));

  const nextCursor =
    hasMore && items.length > 0
      ? items[items.length - 1]._id.toString()
      : null;

  return {
    items: serializedItems,
    nextCursor,
  };
}