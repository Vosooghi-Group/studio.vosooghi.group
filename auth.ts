import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "./lib/user";
import { Role } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages : {
    signIn : "/auth",
    signOut : "/auth",
    error : "/auth/error"
  },
  events : {
    async linkAccount({user}) {
      await db.user.update({
        where : { id : user.id} ,
        data : {emailVerified : new Date()}
      })
    },
  },
  callbacks: {
    // if user.emailVerfied is false cant login
    // async signIn({ user }) {
    //   const exsitingUser = await getUserById(user.id);
    //   if (!exsitingUser || !exsitingUser.emailVerified) {
    //     return false;
    //   }
    //   return true;
    // },
    async session({ token, session }) {
      console.log({ sessionToken: token });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const exsitingUser = await getUserById(token.sub);
      if (!exsitingUser) return token;
      token.role = exsitingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  trustHost: true,
});
