// This will pretty much be 

import mongoose from "mongoose"
import Product from "@/models/Product"
import mongooseConnect from "@/lib/mongoose"

const handler = async(req, res) => {
    // If send a post request from new.js, therefore the method will be post
    const {method} = req // we can access the specific method post, put etc like this 

    await mongooseConnect() // call the mongoose connect function we created in mongoose.js
    

    // When we have a get request, we want to get all the Products
    if (method === 'GET'){
        res.json(await Product.find()) // We use mongoose's model.find to get all products
    }



    if (method === "POST"){ 
        const {title, description, price} = req.body // we can get the title, desc, etc from the request.body
        // If we have a post method then we want to create a product using what is pass from req.body
        const productDoc = await Product.create({
            title, description, price
        })


        // We will want to make a connection with mongoose database and send this productDoc
        res.json(productDoc)
        
    
        }
       
}


export default handler