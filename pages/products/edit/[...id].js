import Layout from "@/components/Layout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "axios"
import ProductForm from "@/components/ProductForm"


const EditProductPage = () =>{

    const [productInfo, setProductInfo] = useState(null)
    const router = useRouter()
    //console.log({router}) // We can use the useRouter to access the page's pathname. Theres a query attribute
    const {id} = router.query // From router.query we can access the product id 
    useEffect(()=> {
        if (!id){ //If we dont have an id then we should just return 
            return
        }
        // here we are making a request to ONLY that particular product
        axios.get('/api/products?id='+id).then(response => {
            setProductInfo(response.data) // then we set the product info to be the response data of that particular product
        })
    }, [id])


    
    return(
        <Layout>
            <h1>Edit Product</h1>
            {/* A good thing to do is NOT load the edit form UNTIL we have the product info */}
            {productInfo && (
                <ProductForm {...productInfo}/> // the JSX spread operator allows you to pass in props as a whole object. 
            )}
            
        </Layout>
        
        
    )
}

export default EditProductPage