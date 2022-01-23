import {useState} from "react"
import Link from "next/link"
import {Menu, MenuItem, Button, Container, IconButton} from "@material-ui/core"
import {AccountCircle} from "@material-ui/icons"

function Navbar() {
  const [menuOpen, setMenuOpen]=useState(false)
  const menu = (
    <div className="z-20 absolute -text-white rounded w-44 flex flex-col m-0 p-0 bg-slate-500">
      <Link href="myfiles">
        <a className="w-full hover:bg-blue-400 p-2">
          My files
        </a></Link>
      <Link href="/file/new">
        <a className="w-full hover:bg-blue-400 p-2">
        Add files
      </a></Link>
      <Link href="/logout">
        <a className="w-full hover:bg-blue-400 p-2">
        Logout
      </a></Link>
      <Link href="/">
        <a className="w-full hover:bg-blue-400 p-2">
        Languages
      </a></Link>
    </div>
  )
  return (
    <nav className="w-full bg-blue-400 text-white py-2 shadow-lg">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <Link href="/">
              <a className="font-bold">Code Sharing App</a>
            </Link>
          </div>
          <div>
            <Link href="/login">
              <a className="mr-3 hover:text-gray-100">Login</a>
            </Link>
            <Link href="/signup">
              <a className="hover:text-gray-100">Sign up</a>
            </Link>
            <IconButton className="relative" onClick={()=>setMenuOpen(!menuOpen)}>
              <AccountCircle className="text-white"/>
            </IconButton>
            {menuOpen && menu} 
          </div>
        </div>
      </Container>
    </nav>
  )
}
export default Navbar