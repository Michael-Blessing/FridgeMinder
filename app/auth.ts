import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import { FirestoreAdapter } from "./FirestoreAdapter";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, firebaseAuth } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/signin",
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials, req): Promise<any> {
        try {
          const userCredential = await signInWithEmailAndPassword(
            firebaseAuth,
            (credentials as any).email || "",
            (credentials as any).password || "",
          );

          if (userCredential.user) {
            const uid = userCredential.user.uid;
            const userRef = doc(db, "users", uid);
            const userSnap = await getDoc(userRef);
            const user = userSnap.data();
            const newUser = {
              id: uid,
              name: user?.name,
              image: user?.image,
              cart: user?.cart,
              email: user?.email,
              emailVertified: user?.emailVertified,
            };
            return newUser || null;
          }
        } catch (error) {
          console.error(error);
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
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("user", user);
      console.log("account", account);
      console.log("profile", profile);
      console.log("email", email);
      console.log("credentials", credentials);
      return true;
    },
    jwt({ token, user }) {
      return { ...token, user };
    },
    async session({ session, token, user }) {
      console.log("session", session, token, user);
      if (session.user) {
        session.user.id = user.id;
        session.user.cart = user.cart;
      }
      return session;
    },
  },
  adapter: FirestoreAdapter(db as any),
  secret: process.env.NEXTAUTH_SECRET,
});
