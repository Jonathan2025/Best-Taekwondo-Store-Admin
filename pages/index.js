import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
     // Background blue and takes up the entire screen, items are centered
     <div className = {'bg-blue-400 w-screen h-screen flex items-center'}>
    
     <div className = 'text-center w-full'> 
     {/* rounded button with padding all sides and extra padding on L and R */}
       <button className="bg-white p-2 rounded-md px-3">
         Login with Google
       </button>
     </div>
     
   </div>
  )
}
