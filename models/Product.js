// This will be our products model schema 


import mongoose, { model, Schema, models } from "mongoose"

// Mongoose Schema is the blue print that defines the structure of documents that will be stored in MongoDB
const ProductSchema = new Schema({
    title: {type:String, required:true}, 
    description: String, 
    price: {type:Number, required:true},
    images: [{type:String}],
    category: {type:mongoose.Types.ObjectId, ref:'Category'}, // reference refers to what we are adding, which is the category model
    properties: {type:Object}
}, {
    timestamps: true,
})

// After creating a schema, we created a mongoose model based on that schema 
const Product = models.Product || model('Product', ProductSchema) // here if the product model doesnt exist then create a new mongoose model

export default Product