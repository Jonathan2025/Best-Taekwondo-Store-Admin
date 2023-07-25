// this page will ask the user to confirm if they actually want to delete the product
import axios from "axios"
import Layout from "@/components/Layout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const DeleteProductPage = () => {

    const router = useRouter() // We can use the useRouter to access the page's pathname. Theres a query attribute
    const [productInfo, setProductInfo] = useState()
    const {id} = router.query  // From router.query we can access the product id
   
    
    useEffect(() => {
        // If no product id then just return 
        if(!id){
            return
        }

        // If there is a product id
        axios.get('/api/products?id='+id).then(response => {
            // then we set the product info to be the response data of that particular product
            setProductInfo(response.data)
        })
    }, [id])

    // IF the user clicks NO, then they will be returned to the products page 
    const previousPage = () => {
        router.push('/products')
    }

    // If they click yes then delete the product 
    const deleteProduct = () =>  {
        axios.delete('/api/products?id='+id)
        previousPage() // after we are done return to the products page
    }



    return(
        // the ? is used in case we dont have anything in product info
        <Layout>
                {/* Accessing the title requires us to get the 0 index of the object */}
                <h1 className="text-center">Are you sure you want to delete "{productInfo[0]?.title}"</h1>
                {/* add space between the two buttons and center it */ }
                <div className = "flex gap-2 justify-center"> 
                    <button onClick={deleteProduct} className="btn-red">Yes</button>
                    <button className="btn-default" onClick={previousPage}>No</button>
                </div>
        </Layout>
    )
}


export default DeleteProductPage