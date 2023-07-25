import Layout from "@/components/Layout";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";


// we pass in the CURRENT product information IF it exists, since we are using this form for both edit and new products
export default function ProductForm({
    _id, // we pass in the id 
    // we dont want the same names as the state names so we use currentTitle, etc
    title: currentTitle,
    description: currentDescription,
    price: currentPrice
    })
{

    // When the fields are changed on the form, we need to hold its value in useState
    // normally we would have the useState initialized as '' but if it has existing information we will start there

    const [title, setTitle] = useState(currentTitle) 
    const [description, setDescription] = useState(currentDescription)
    const [price, setPrice] = useState(currentPrice)





    const [backToProducts, setBackToProducts] = useState(false) // we want to set a state where we can go back to the products page after submitting the form 
    const router  = useRouter()
    // Function handler which is an async function that makes a post request to the api end point --> products.js
    // We used fetch in the past but here we will use axios to make the request
    const saveProduct = async(event)=>{
        event.preventDefault() // clicking on submit button will submit the form right away, this prevents that 
        const data = {title, description, price}

        if(_id){
            // if we have an id then we should be updating the product 
            await axios.put('/api/products', {...data, _id})// here we use a spread operator to pass in the data OF the specific product
        } else {
            
            await axios.post('/api/products', data) // sample post request format - axios.post(url[, data[, config]])
        }
        setBackToProducts(true) // once done then the user will be sent back to the product page
       
    }

    if (backToProducts === true) {
        // redirect the user back to the products page 
        router.push('/products')
    }


    return(
       <>
            {/* On the form submit we need a function handler */}
            <form onSubmit={saveProduct}>
                {/* The input will be styled from the global css file */}
                <input 
                    type="text"
                    placeholder="New Product"
                    value={title}
                    // onchange we will change the title state with what was added from the event.target
                    onChange = {event => setTitle(event.target.value)}
                />
                <textarea 
                    placeholder="Description"
                    value={description}
                    onChange = {event => setDescription(event.target.value)}
                />
                <input 
                    type="number" 
                    placeholder="Price"
                    value={price}
                    onChange = {event => setPrice(event.target.value)}
                    />
                <button  
                type="submit"
                className="btn-primary">Save</button>
            </form>
        </>
    )
}