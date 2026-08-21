import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { connectDB } from "@/lib/db";
import { User } from "@/models/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],

  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      await connectDB();

      await User.findOneAndUpdate(
        { email: user.email.toLowerCase() },
        {
          $setOnInsert: {
            email: user.email.toLowerCase(),
            name: user.name ?? "Developer",
            image: user.image ?? "",
          },
        },
        {
        upsert: true,
        returnDocument: "after",
        }
      );

      return true;
    },

    async session({ session }) {
      if (!session.user?.email) {
        return session;
      }

      await connectDB();

      const dbUser = await User.findOne({
        email: session.user.email.toLowerCase(),
      }).lean();

      if (dbUser) {
        session.user.id = dbUser._id.toString();
        session.user.name = dbUser.name;
        session.user.image = dbUser.image;
        session.user.username = dbUser.username ?? null;
        session.user.isOnboarded = Boolean(dbUser.username);
      }

      return session;
    },
  },
});