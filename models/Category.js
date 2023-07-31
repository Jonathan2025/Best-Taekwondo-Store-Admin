// This will be our category models schema
import { model, Schema, models } from "mongoose"

// Mongoose Schema is the blue print that defines the structure of documents that will be stored in MongoDB
const CategorySchema = new Schema({
    name: {type:String, required:true}, 
    
})

// After creating a schema, we created a mongoose model based on that schema 
const Category = models.Category || model('Category', CategorySchema) // here if the category model doesnt exist then create a new mongoose model

export default Category