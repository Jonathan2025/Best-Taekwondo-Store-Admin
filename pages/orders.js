import Layout from "@/components/Layout"
import { useState,useEffect } from "react"
import axios from "axios"

// Here for the orders page we will build out a table with all the orders information 
const OrdersPage = () => {

  // Put the order data into a state
  const[orders, setOrders] = useState([])

  // Inside useeffect we make an axios request for the orders data
  useEffect(() => {
    // If we look at the api folder, name of the files equate to the name of route
    axios.get('/api/orders').then(response => {
      setOrders(response.data)
    })

  }, [])
  return (
    <Layout>
        <h1>Orders</h1>
        <table className = "basic">
          <thead>
            <tr> 
              <th>Date</th>
              <th>Recipient</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {/* For each order we map out the order information */}
            {orders && orders.map(order => (
              <tr> 
                <td>{order.createdAt}</td>
                <td> 
                  {order.name} {order.email} <br/>
                  {order.city} {order.zip} <br/>
                  {order.country} {order.address} <br/>
                  {order.address} <br/>

                </td>
                <td> 
                  {/* For the order we will map out the product information  */}
                  {order.cartItems.map(item => (
                    <>
                      {item.price_data?.product_data.name} x {item.quantity}<br/>
                    
                    
                    </>
                  ))}
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </Layout>
  )
}

export default OrdersPage