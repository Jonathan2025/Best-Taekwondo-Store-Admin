import Layout from "@/components/Layout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "axios"
import ProductForm from "@/components/ProductForm"


const EditProductPage = () =>{

    const [productInfo, setProductInfo] = useState(null)
    const router = useRouter()
    //console.log({router}) // We can use the useRouter to access the page's pathname. Theres a query attribute
    const {editProductId} = router.query // From router.query we can access the product id 
    console.log("product info", productInfo)




    useEffect(()=> {

        //If we dont have an id then we should just return 
        if (!editProductId){
            return
        }


        // here we are making a request to ONLY that particular product
        axios.get('/api/products?editProductId='+editProductId).then(response => {
            // then we set the product info to be the response data of that particular product
            setProductInfo(response.data)
        })
    }, [editProductId])


    
    return(
   
        <Layout>
            <h1>Edit Product</h1>
            <ProductForm {...productInfo}/>
        </Layout>
        
        
    )
}

export default EditProductPage