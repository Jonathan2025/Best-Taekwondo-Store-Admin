import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from "../../../lib/mongodb"
import { MongoDBAdapter } from "@auth/mongodb-adapter" 
// 1 Here we are setting up the authentication configuration for the application
// We are using Google as the auth provider and then the adapter Mongo DB, specifies the data storage mechanism for data and session information

const adminEmails = [process.env.ADMIN_EMAILS]


export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ], 
  adapter: MongoDBAdapter(clientPromise),

  // Callbacjs are async functions that can be used to control what happens when an action is performed 
  // So in this case we can implement to allow certain users to be able to access 
  callbacks: {
    session: ({session, token, user}) => {

      if(adminEmails.includes(session?.user?.email)){
        return session
      } else {
        return false 
      }
    }
  }
})