// This will pretty much be 
import Product from "@/models/Product"
import mongooseConnect from "@/lib/mongoose"


const handler = async(req, res) => {
    // If send a post request from new.js, therefore the method will be post
    const {method} = req // we can access the specific method post, put etc like this 

    await mongooseConnect() // call the mongoose connect function we created in mongoose.js
    

    // When we have a get request, we want to get all the Products
    if (method === 'GET'){
        // NOW if we have a specific product id, then we should only return that product
        // When we use findone, we will use the id as the editProductId
        if(req.query?.id){
            res.json(await Product.findOne({_id:req.query.id}))
        }
        res.json(await Product.find()) // We use mongoose's model.find to get all products if we are not requesting a specific id
    }

    // create a product
    if (method === "POST"){ 
        const {title, description, price, images, category} = req.body // we can get the title, desc, etc from the request.body
        // If we have a post method then we want to create a product using what is pass from req.body
        const productDoc = await Product.create({
            title, description, price, images, category
        })
        // We will want to make a connection with mongoose database and send this productDoc
        res.json(productDoc)
    }

    // Edit a product 
    if (method === 'PUT'){
        const {title, description, price, _id, images, category} = req.body // we want to make sure to get the id 
        await Product.updateOne({_id}, {title, description, price, images, category}) // using the mongoose updateone function we use _id as the filter and then the title, descr is the info we want to update

        res.json(true) // the update has been made
    }


    // Delete a product
    if (method === 'DELETE'){
        if (req.query?.id){
            await Product.deleteOne({_id:req.query?.id})
            res.json(true) // the update has been made
        }
    }
       
}


export default handler