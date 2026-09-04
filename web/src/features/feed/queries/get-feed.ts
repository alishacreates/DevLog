import { Types } from "mongoose";

import { connectDB } from "@/lib/db/mongoose";
import { DevLog } from "@/models/devlog";

import "@/models/project";
import "@/models/user";

const FEED_PAGE_SIZE = 1;

export async function getFeed(cursor?: string) {
  await connectDB();

  const query: {
    isPublic: boolean;
    _id?: { $lt: Types.ObjectId };
  } = {
    isPublic: true,
  };

  if (cursor && Types.ObjectId.isValid(cursor)) {
    query._id = {
      $lt: new Types.ObjectId(cursor),
    };
  }

  const devLogs = await DevLog.find(query)
    .sort({ _id: -1 })
    .limit(FEED_PAGE_SIZE + 1)
    .populate("author", "name username image")
    .populate("project", "title")
    .lean();

  const hasMore = devLogs.length > FEED_PAGE_SIZE;

  const items = hasMore
    ? devLogs.slice(0, FEED_PAGE_SIZE)
    : devLogs;

    const serializedItems = items.map((devLog) => {
  const author = devLog.author as unknown as {
    _id: Types.ObjectId;
    name: string;
    username: string;
    image?: string;
  };

  const project = devLog.project as unknown as {
    _id: Types.ObjectId;
    title: string;
  };

  return {
    id: devLog._id.toString(),
    title: devLog.title,
    content: devLog.content,
    tags: devLog.tags,
    createdAt: new Date(devLog.createdAt).toISOString(),

    author: {
      id: author._id.toString(),
      name: author.name,
      username: author.username,
      image: author.image,
    },

    project: {
      id: project._id.toString(),
      title: project.title,
    },
  };
});

  const nextCursor =
    hasMore && items.length > 0
      ? items[items.length - 1]._id.toString()
      : null;

  return {
  items: serializedItems,
  nextCursor,
};
}