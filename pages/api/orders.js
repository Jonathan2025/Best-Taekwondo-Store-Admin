import mongooseConnect from "@/lib/mongoose"
import Order from "@/models/Order"

// For the order handler function we need to connect to the mongoose database and return the orders data
const orderHandler = async(req,res) => {
    
    await mongooseConnect()
    // return the orders in reverse order, so 
    res.json(await Order.find().sort({createdAt:-1}))
  

}

export default orderHandler