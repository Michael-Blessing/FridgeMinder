import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import { FirestoreAdapter } from "./FirestoreAdapter";
import { db } from "./firebase";
import {
  collection,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { MyUser } from "../types/UserType";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials, req) {
        const user = { id: "42", name: "admin", password: "123" };
        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    Twitter({
      clientId: process.env.TWITTER_ID as string,
      clientSecret: process.env.TWITTER_SECRET as string,
    }),
    /*Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      scope: 'read:user',
    }),*/
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async session({ session, token, user }) {
      const newUser = user as any as MyUser;
      if (session.user) {
        session.user.id = newUser.id as string;
        session.user.cart = newUser.cart;
      }
      return session;
    },
  },
  adapter: FirestoreAdapter(db as any),
});
