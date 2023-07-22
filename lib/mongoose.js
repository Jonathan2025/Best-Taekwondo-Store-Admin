import mongoose from "mongoose"

// Here we are making our own mongoose connect function that will connect to the mongoose uri string that will be used in api/products.js


const mongooseConnect = () => {
    // the ready state is a property that represents the current state of the mongoDB connection 0 means disconnected, 1 means connected,
    if (mongoose.connection.readyState === 1){
        return mongoose.connection.asPromise()
    } else {
        const uri = process.env.MONGODB_URI
        return mongoose.connect(uri) // Returns a promise that resolves when this connection successfully connects to MongoDB, or rejects if this connection failed to connect.
    }
}

export default mongooseConnect