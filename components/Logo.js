import Link from "next/link"
const Logo = () => {
    // Store icon and words are fitted on one line, placed some space between the logo and the rest of nav bar */}
    return(
        <Link href='/' className ="flex gap-1 pl-10"> 
            <img 
                src="https://besttaekwondo.org/wp-content/uploads/sites/885/2018/10/best-logo.png"
                width="150"
                height="80"
                class="border-2 border-sky-500"
            />
        </Link>
        )

}

export default Logo