import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: "1076627399050-h6avni2od5vn1gj1nlvifaqqr8vvvbho.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
}

// Instead of exporting default NextAuth, wrap it in a handler for the GET method.
export const GET = NextAuth(authOptions);

// Optionally, add POST and other methods if required
export const POST = NextAuth(authOptions);