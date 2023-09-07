// From the frontend we pasted over the orders model to be used in admin panel
import mongoose, { model, Schema, models } from "mongoose"

const OrderSchema = new Schema({
    cartItems: Object,
    name: String, 
    email: String, 
    city: String, 
    zip: String, 
    state: String,
    address: String, 
    country: String, 
    paid: Boolean
}, {
    timestamps:true,
})  

// After creating a schema, we created a mongoose model based on that schema 
const Order = models.Order || model('Order', OrderSchema) // here if the order model doesnt exist then create a new mongoose model

export default Order