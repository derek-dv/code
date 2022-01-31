import { useState, useEffect } from "react";
import Link from "next/link";
import { MenuItem, Button, Container, IconButton } from "@material-ui/core";
import { AccountCircle, Menu } from "@material-ui/icons";

function Navbar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [user, setUser] = useState()

  // useEffect(()=>{
  //   if(localStorage.getItem("user")) {
  //     const userInfo = JSON.parse(localStorage.getItem("user"))
  //     setUser(userInfo)
  //   }
  // }, [])

  const guestMenu = (
    <div className="z-20 absolute -text-white rounded w-44 flex flex-col m-0 p-0 bg-slate-500">
      <MenuItem>
        <Link href="/file/public">
          <a className="w-full p-2">Public files</a>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href="/myfiles">
          <a className="w-full p-2">Files I added</a>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href="/file/new">
          <a className="w-full p-2">Add file</a>
        </Link>
      </MenuItem>
    </div>
  )
  const loggedInMenu = (
    <div className="z-20 absolute -text-white rounded w-44 flex flex-col m-0 p-0 bg-slate-500">
      <MenuItem>
        <Link href="/file/public">
          <a className="w-full p-2">Public files</a>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href="/myfiles">
          <a className="w-full p-2">My files</a>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href="/file/new">
          <a className="w-full p-2">Add files</a>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href="/logout">
          <a className="w-full p-2">Logout</a>
        </Link>
      </MenuItem>
    </div>
  );
  return (
    <nav className="w-full bg-blue-400 text-white py-2 shadow-lg">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <Link href="/">
              <a className="font-bold">Code Sharing App</a>
            </Link>
          </div>
          {user ? (
            <div>
              <Link href="/">
                <a className="hover:text-gray-100">{user.username}</a>
              </Link>
              <IconButton
                className="relative"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <AccountCircle className="text-white" />
              </IconButton>
              {menuOpen && loggedInMenu}
            </div>
          ) : (
            <div>
              <Link href="/login">
                <a className="mr-3 hover:text-gray-100">Login</a>
              </Link>
              <Link href="/signup">
                <a className="hover:text-gray-100">Sign up</a>
              </Link>
              <IconButton
                className="relative"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Menu className="text-white" />
              </IconButton>
              {menuOpen && guestMenu}
            </div>
          )}
        </div>
      </Container>
    </nav>
  );
}
export default Navbar;
