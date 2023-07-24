import Layout from "@/components/Layout"
import { useRouter } from "next/router"
import { useEffect } from "react"
import axios from "axios"
import ProductForm from "@/components/EditForm"

const EditProductPage = () =>{

    const router = useRouter()
    //console.log({router}) // We can use the useRouter to access the page's pathname. Theres a query attribute tht
    const {editProductId} = router.query // From router.query we can access the product id 



    useEffect(()=> {

        //If we dont have an id then we should just return 
        if (!editProductId){
            return
        }


        // here we are making a request to ONLY that particular product
        axios.get('api/products?editProductId=' + editProductId).then(response =>{
            console.log(response.data)
        })
    }, [editProductId])

    return(
        
        <ProductForm />
        
    )
}

export default EditProductPage