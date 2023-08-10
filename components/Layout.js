// We can resuse the code base that we have when a user is logged in 
import NavBar from "./Nav"
import { useSession, signIn, signOut } from "next-auth/react"

// When we pass in children, whatever was inputted from index.js, products.js, etc where we called Layout, will be shown here
export default function Layout({children}) {
    // User authentication session 
    const { data: session } = useSession()
    // if the user is not logged in, then show them a login screen
    if(!session){
      return(
        // Background blue and takes up the entire screen, items are centered
        <div className = {'bg-sky-600 w-screen h-screen flex items-center'}>
        <div className = 'text-center w-full'> 
        {/* rounded button with padding all sides and extra padding on L and R */}
          {/* When user clicks on button, they will have chance to login with google */}
          <button onClick={()=> signIn('google')} className="bg-white p-2 rounded-md px-3">
            Login with Google
          </button>
        </div>
        
      </div>
          )
    }


    return(
      
      <div className = "bg-sky-600 min-h-screen"> 
        {/* // Otherwise if we are logged in then show the user. Minimum height to be screen */}
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
        </button>
        
        <div className=' flex'> 
          {/* Add the navbar component */}
          <NavBar /> 
          {/* name section to take up the entire right side availiable space, margin right, top and bottom of 2, with rounded corners*/}
          <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-5">{children}</div>
        </div> 
      </div>
    )
  
}