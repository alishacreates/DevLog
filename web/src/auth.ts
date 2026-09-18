import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { connectDB } from "@/lib/db/mongoose";
import { User } from "@/models/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,

  providers: [GitHub, Google],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      await connectDB();

      await User.findOneAndUpdate(
        {
          email: user.email.toLowerCase(),
        },
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

    async jwt({ token }) {
      if (!token.email) {
        return token;
      }

      /*
       * Only populate our application user fields when they
       * are not already present in the JWT.
       */
      if (!token.userId) {
        await connectDB();

        const dbUser = await User.findOne({
          email: token.email.toLowerCase(),
        })
          .select("_id name image username")
          .lean();

        if (dbUser) {
          token.userId = dbUser._id.toString();
          token.name = dbUser.name;
          token.picture = dbUser.image;
          token.username = dbUser.username ?? null;
          token.isOnboarded = Boolean(dbUser.username);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.name = token.name ?? session.user.name;
        session.user.image =
          (token.picture as string | undefined) ??
          session.user.image;

        session.user.username =
          (token.username as string | null) ?? null;

        session.user.isOnboarded =
          Boolean(token.isOnboarded);
      }

      return session;
    },
  },
});