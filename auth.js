// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   trustHost: true,
//   providers: [
//     Credentials({
//       name: "Credentials",
//       async authorize(credentials) {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               email: credentials.email,
//               password: credentials.password,
//             }),
//           }
//         );

//         const data = await res.json();

//         if (!res.ok || !data?.data?.user) return null;

//         const user = data.data.user;

//         return {
//           id: user.id,
//           name: user.firstName + " " + user.lastName,
//           email: user.email,
//           image: user.avatarUrl,
//           role: user.role,
//           accessToken: data.data.accessToken,
//         };
//       },
//     }),
//   ],

//   pages: {
//     signIn: "/login",
//   },

//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       // First login time: attach data from user
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//         token.image = user.image;
//         token.role = user.role;
//         token.accessToken = user.accessToken;
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       if (token) {
//         session.user = {
//           id: token.id,
//           name: token.name,
//           email: token.email,
//           image: token.image,
//           role: token.role,
//           accessToken: token.accessToken,
//         };
//       }
//       return session;
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// });
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok || !data?.data?.user) return null;

        const user = data.data.user;

        return {
          id: user.id,
          name: user.firstName + " " + user.lastName,
          email: user.email,
          image: user.avatarUrl,
          role: user.role,
          accessToken: data.data.accessToken,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        // Call your backend /auth/oauth-login to create/update user and get tokens
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth-login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              image: user.image,
            }),
          }
        );

        if (!res.ok) return false; // signIn failed

        const data = await res.json();

        // Attach backend tokens/user data to user object to use in jwt callback
        user.id = data.data.user.id;
        user.role = data.data.user.role;
        user.accessToken = data.data.accessToken;
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role;
        token.accessToken = user.accessToken || null;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.image,
          role: token.role,
          accessToken: token.accessToken,
        };
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});
