import { Types } from "mongoose";

import { connectDB } from "@/lib/db/mongoose";
import { Comment } from "@/models/comment";

export async function getComments(devLogId: string) {
  if (!Types.ObjectId.isValid(devLogId)) {
    return [];
  }

  await connectDB();

  const comments = await Comment.find({
    devLog: devLogId,
  })
    .sort({ createdAt: -1 })
    .populate("author", "name username image")
    .lean();

  return comments.map((comment) => {
    const author = comment.author as unknown as {
      _id: Types.ObjectId;
      name: string;
      username: string;
      image?: string;
    };

    return {
      id: comment._id.toString(),
      content: comment.content,
      createdAt: new Date(comment.createdAt).toISOString(),

      author: {
        id: author._id.toString(),
        name: author.name,
        username: author.username,
        image: author.image,
      },
    };
  });
}