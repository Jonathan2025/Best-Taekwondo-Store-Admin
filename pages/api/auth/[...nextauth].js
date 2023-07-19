import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

console.log("this is the google id", process.env.GOOGLE_ID)


export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ]
})