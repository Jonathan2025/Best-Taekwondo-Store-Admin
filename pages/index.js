import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";


export default function Home() {

  const {data: session} = useSession()
  // capitalize the first letters of each word in the name 
  // the ? optional chaining operator helps prevents the 'undefined' errors in javascript
  const username = session?.user?.name
  .split(' ')
  // using the map function we can apply this to EACH word
  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Pretty much we separate the first letter and the remaining characters and put them back together
  .join(' ')
  
  return <Layout>
    {/* This will push the introduction to the left side and then the name and image to the right side */}
    <div className="text-blue-600 flex justify-between">
      <h2>
        Hello <b>{username}</b>! <br /> Welcome to the Best Taekwondo Online Admin Panel
      </h2>
    
      {/* When we look inside the session we can access things like email, name, and image */}
      <div className="flex bg-gray-200 gap-1 text-black p-2 rounded-2xl">
        <img src={session?.user?.image}  className ="w-8 h-8 rounded-2xl"/>

        {username} 
      </div>
      
    </div>
  </Layout>
}
