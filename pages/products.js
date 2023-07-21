import Layout from "@/components/Layout";
import Link from "next/link"

export default function Products() {
    return(
        <Layout>
            {/* A link that looks like a button here that will allow the admin to add a new product */}
            <Link className="bg-orange-400 text-white rounded-md p-2" href={'/products/new'}>Add New Product</Link>
        </Layout>
    )
}