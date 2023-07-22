import Layout from "@/components/Layout";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
// When the admin clicks the new Product button, they will be led to the new product form page 

export default function NewProduct(){

    // When the fields are changed on the form, we need to hold its value in useState
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [backToProducts, setBackToProducts] = useState(false) // we want to set a state where we can go back to the products page after submitting the form 
    const router  = useRouter()
    // Function handler which is an async function that makes a post request to the api end point --> products.js
    // We used fetch in the past but here we will use axios to make the request
    const createProduct = async (event) => {
        event.preventDefault() // clicking on submit button will submit the form right away, this prevents that 
        const data = {title, description, price}
        await axios.post('/api/products', data) // sample post request format - axios.post(url[, data[, config]])
        
        setBackToProducts(true)
    
    }

    if (backToProducts === true) {
        // redirect the user back to the products page 
        router.push('/products')
    }

    return(
        <Layout>
            {/* On the form submit we need a function handler */}
            <form onSubmit={createProduct}>

            
                <h1>New Product</h1>
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
        </Layout>
    )
}