// This will be our category models schema
import mongoose, { model, Schema, models } from "mongoose"

// Mongoose Schema is the blue print that defines the structure of documents that will be stored in MongoDB
const CategorySchema = new Schema({
    name: {type:String, required:true},
    parentCategory: {type:mongoose.Types.ObjectId}, // this is a special data type so we will be using the mongoose object id for the parent category
    
})

// After creating a schema, we created a mongoose model based on that schema 
const Category = models.Category || model('Category', CategorySchema) // here if the category model doesnt exist then create a new mongoose model

export default Category