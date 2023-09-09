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
              <th>ID</th>
              <th>Recipient</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map(order => (
              <tr> 
                <td>{order._id}</td>
                <td> 
                  {order.name} {order.email} <br/>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </Layout>
  )
}

export default OrdersPage