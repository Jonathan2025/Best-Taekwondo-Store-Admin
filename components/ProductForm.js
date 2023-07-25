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
    price: currentPrice,
    images: currentImages
    })
{

    // When the fields are changed on the form, we need to hold its value in useState
    // normally we would have the useState initialized as '' but if it has existing information we will start there

    const [title, setTitle] = useState(currentTitle) 
    const [description, setDescription] = useState(currentDescription)
    const [price, setPrice] = useState(currentPrice)
    const [images, setImages] = useState(currentImages)





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

    // When we select a file to be uploaded, its information will be in the event
    const uploadImages = async(event) => {
        const files = event.target?.files //Inside the event we have the target attribute which has the name of file
        if (files?.length > 0){
            // We may have multiple images
            const data = new FormData() // this is a constructor in js that creates a new instance of FormData object and allows you to construct and handle HTML form data to be sent to server
            // such as through HTTP requests

            files.forEach(file => data.append('file', file)) // append the data to each file 
            const response = await axios.post('/api/upload', data) // Not updating our product we are just uploading photos 
            console.log(response.data)
        }
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
                <div className="mt-2 mb-2">
                    {/* For the upload button center the items and place some space in between */}
                    {/* we use label instead of button because we have the input tag, with file upload */}
                    <label className="w-32 h-32 cursor-pointer text-center flex items-center justify-center gap-1 text-gray-500 rounded-lg bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        Upload
                        <input type="file" onChange = {uploadImages} className="hidden"/>
                    </label>
                   
                    {!images?.length && (
                        <div>No Photos in this product</div>
                    )}
                </div>


               
               
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