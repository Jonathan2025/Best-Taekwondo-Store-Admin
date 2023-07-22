import Layout from "@/components/Layout"
import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"


export default function Products() {
    const [products, setProducts] = useState([])


    // useEffect will run the response only once when loaded
    useEffect(() => {
        axios.get('/api/products').then(response => {
            setProducts(response.data)
        })
    }, [])
    return(
        <Layout>
            {/* A link that looks like a button here that will allow the admin to add a new product */}
            <Link className="bg-orange-400 text-white rounded-md p-2" href={'/products/new'}>Add New Product</Link>
            <table className="productTable mt-5">
                {/* head of the table */}
                <thead>
                    <tr>
                        <td>Product Name</td>
                        <td></td>
                    </tr>
                </thead>
                {/* Here we will use a map function to map EACH product and show it  */}
                {products.map(product=> (
                    <tr> 
                        <td>{product.title}</td>
                        <td>
                            Button
                        </td>
                    </tr>
                ))}
                <body>

                </body>
            </table>
        </Layout>
    )
}