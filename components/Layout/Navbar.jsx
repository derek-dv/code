import React, { useState } from "react";
import Link from "next/link";
import { Button, Container, IconButton } from "@material-ui/core";
import { Close, Menu } from "@material-ui/icons";

import { MenuBars, Files, Add, IdCard, USFlag, Logout } from "../icons";
import { Transition } from "@headlessui/react";

const navLink = [
  {
    text: "Home",
    link: "/",
    id: "1",
    active: "true",
  },
  {
    text: "My files",
    link: "/myfiles",
    id: "2",
    active: "true",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <a href="/" style={{ color: "white", fontWeight: "bold" }}>
                  Code sharing
                </a>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLink.map((link) => (
                  <Link
                    className="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                    href={link.link}
                    key={link.id}
                  ><a href={link.link}>
                    {link.name}></a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <IconButton
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? <Menu /> : <Close />}
            </IconButton>
          </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="md:hidden" id="mobile-menu">
            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#"
                className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </a>

              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                My files
              </a>
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
};
export default Navbar;
