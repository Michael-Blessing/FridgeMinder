import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, firebaseAuth } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
      // create user in db if not exists after account provider sign in with google twitter or github
      if (account) {
        if (account.provider === "google") {
          const userRef = doc(db, "users", user.id);
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) {
            const newUser = {
              id: user.id,
              name: user.name,
              image: user.image,
              cart: [],
              email: user.email,
              emailVertified: null,
            };
            await setDoc(userRef, newUser);
          }
        } else if (account.provider === "twitter") {
          const userRef = doc(db, "users", user.id);
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) {
            const newUser = {
              id: user.id,
              name: user.name,
              image: user.image,
              cart: [],
              email: null,
              emailVertified: null,
            };
            await setDoc(userRef, newUser);
          }
        } else if (account.provider === "github") {
          const userRef = doc(db, "users", user.id);
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) {
            const newUser = {
              id: user.id,
              name: user.name,
              image: user.image,
              cart: [],
              email: user.email,
              emailVertified: null,
            };
            await setDoc(userRef, newUser);
          }
        } else {
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        if (session.cart) {
          token.cart = session.cart;
          return {
            ...token,
            ...session,
          };
        }
      }

      if (user) {
        token = {
          ...token,
          ...user,
        };
      }

      return token;
    },
    async session({ session, token, user }) {
      if (session.user && user) {
        session.user.id = user.id;
        session.user.cart = user.cart;
      }

      if (session.user && token) {
        // fetch user from db
        // check if cart is in token
        session.user.id = token.sub as string;
        if (token.cart) {
          session.user.cart = token.cart as Array<any>;
        } else {
          const userRef = doc(db, "users", token.sub as string);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const user = userSnap.data();
            session.user.cart = user?.cart;
          }
        }
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
