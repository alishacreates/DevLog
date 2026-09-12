import { connectDB } from "@/lib/db/mongoose";
import { User } from "@/models/user";

export async function searchUsers(query: string) {
  const q = query.trim();

  if (!q) {
    return [];
  }

  await connectDB();

  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const users = await User.find({
    $or: [
      {
        username: {
          $regex: escaped,
          $options: "i",
        },
      },
      {
        name: {
          $regex: escaped,
          $options: "i",
        },
      },
    ],
  })
    .select(
      "_id name username image bio location skills techStack"
    )
    .limit(20)
    .lean();

  return users.map((user) => ({
    id: user._id.toString(),
    name: user.name,
    username: user.username,
    image: user.image ?? "",
    bio: user.bio ?? "",
    location: user.location ?? "",
    skills: user.skills ?? [],
    techStack: user.techStack ?? [],
  }));
}