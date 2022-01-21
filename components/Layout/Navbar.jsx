import React, {useState} from "react";
import Link from "next/link";
import { Button, Container, IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";


import { MenuBars, Files, Add, IdCard, USFlag, Logout } from "../icons";

const Navbar = () => {
  const [show, setShow] = useState(false)
  const menu = (
    <div style={{width: '10rem'}} className="absolute text-left z-20 bg-white py-2 right-0 border border-gray-200 rounded-sm -mt-1">
      <Link href="/">
        <Button startIcon={<Files/>} className="w-full button-left">Manage files</Button>
      </Link>
      <Link href="/">
        <Button startIcon={<Add/>} className="w-full button-left">Add files</Button>
      </Link>
      <Link href="/">
        <Button startIcon={<IdCard/>} className="w-full button-left">Profile</Button>
      </Link>
      <Link href="/">
        <Button startIcon={<Logout/>} className="w-full button-left">Logout</Button>
      </Link>
    </div>
  )
  return (
    <header className="bg-blue-500"><Container>
      <div className="h-14 flex items-center justify-between">
        <div className="flex-1 flex">
          <Link href="/">
            <a>
              <h1 className="text-white text-lg font-bold">
                Code Sharing Application
              </h1>
            </a>
          </Link>
        </div>
        <div className="relative">
          <Link href="/login">
            <a className="mx-2 text-white font-bold" href="/login">Login</a>
          </Link>
          <Link href="/login">
            <a className="mx-2 text-white font-bold" href="/register">Register</a>
          </Link>
          <IconButton onClick={()=>setShow(!show)}>
            <Menu className="text-white"/>
          </IconButton>
          {show && menu}
        </div>
      </div></Container>
    </header>
  );
};

export default Navbar;
