import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from "../../../lib/mongodb"
import { MongoDBAdapter } from "@auth/mongodb-adapter" 
import { getServerSession } from 'next-auth'
// 1 Here we are setting up the authentication configuration for the application
// We are using Google as the auth provider and then the adapter Mongo DB, specifies the data storage mechanism for data and session information

const adminEmails = [process.env.ADMIN_EMAILS]

export const authOptions = {
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
}


export default NextAuth(authOptions)

export const isAdminRequest = async(req, res) => {
// here we check if the session is including an admin user email otherwise we will throw an error
  const session = await getServerSession(req,res,authOptions)
  if (!adminEmails.includes(session?.user?.email)){
    throw 'Not an Admin User'
  }
}