import Layout from "@/components/Layout";
import { useState } from "react";

// When the admin clicks the new Product button, they will be led to the new product form page 

export default function NewProduct(){

    // When the fields are changed on the form, we need to hold its value in useState
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
 



    return(
        <Layout>
            {/* On the form submit we need a function handler */}
            <form onSubmit={}>

            
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