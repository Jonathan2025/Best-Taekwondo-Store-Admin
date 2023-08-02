// Just like api/products.js, this will be api/categories which will be the endpoint for categories 
// And will be the handler depending on the req.body method
import Category from "@/models/Category"
import mongooseConnect from "@/lib/mongoose"

const categoryHandler = async(req, res) => {
    const {method} = req // basically accessing req.method
    await mongooseConnect()



    // Now if we have a get method then we just return the categories and show them 
    if (method === 'GET'){
        res.json(await Category.find())
    }
   
    if (method === "POST"){
        console.log("this is req body", req.body)
        const {name, parentCategory} = req.body
         // If we have a post method then we want to create a category using what is pass from req.body
        const categoryDoc = await Category.create({name, parentCategory})
        // We will want to make a connection with mongoose database and send this categoryDoc
        res.json(categoryDoc)
    }
}

export default categoryHandler