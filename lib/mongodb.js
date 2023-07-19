// 1 Pasted the code below from the documentation https://authjs.dev/reference/adapter/mongodb
// Wrapper for mongo db connection, for serverless functions we try to REUSE existing connections. 
// This file is setting up a connection to a MongoDB Database using the MongoClient Library and exporting a promise that resolves to a connected MongoDB client
// Eventually this will be a typescript file 
// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb

import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise

// 2 Here we see that if the client doesnt already exist, then it will create a new client and create a connection, otherwise it will use an existing connection
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a separate module, the client can be shared across functions.
export default clientPromise