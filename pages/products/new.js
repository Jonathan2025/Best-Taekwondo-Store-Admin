import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";

// When the admin clicks the new Product button, they will be led to the new product form page 

export default function NewProduct(){
    return(
        <Layout>
            <h1>New Product</h1>
            <ProductForm />
        </Layout>
        
    )
}