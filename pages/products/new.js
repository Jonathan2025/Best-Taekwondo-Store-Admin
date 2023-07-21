import Layout from "@/components/Layout";

// When the admin clicks the new Product button, they will be led to the new product form page 

export default function NewProduct(){
    return(
        <Layout>
            <form onSubmit={}>

            
                <h1>New Product</h1>
                {/* The input will be styled from the global css file */}
                <input 
                    type="text"
                    placeholder="New Product"
                    value={title}
                
                />
                <textarea 
                    placeholder="Description"
                    value={description}
                />
                <input 
                    type="number" 
                    placeholder="Price"
                    value={price}
                    
                    />
                <button  
                type="submit"
                className="btn-primary">Save</button>
            </form>
        </Layout>
    )
}