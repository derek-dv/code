import React, { useState } from "react";
import Link from "next/link";

// Components
import Backdrop from "./Backdrop";

const IconButton = ({ icon: Icon, onClick, menu }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`relative ${menuOpen ? "z-20" : ""}`}>
      <button
        className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full overflow-hidden"
        onClick={() => {
          setMenuOpen((prev) => !prev);
          onClick && onClick();
        }}
      >
        <Icon size={1.6} color="#fff" />
      </button>
      {menuOpen && (
        <div className="absolute bg-white py-2 right-0 w-64 border border-gray-200 rounded-sm -mt-1">
          {menu && (
            <ul>
              {menu.map((item) => {
                const Icon = item.icon;

                console.log("aaaa Icon  >>", Icon);

                return (
                  <li
                    key={item.id}
                    className="py-2 px-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setMenuOpen(false);
                      item.onClick && item.onClick();
                    }}
                  >
                    {item.navigate ? (
                      <Link href={item.navigate}>
                        <a className="h-full w-full flex items-center">
                          {Icon && (
                            <div className="mr-1">
                              <Icon size={2.4} />
                            </div>
                          )}
                          {item.text}
                        </a>
                      </Link>
                    ) : (
                      <span className="flex w-full h-full items-center">
                        {Icon && (
                          <div className="mr-1">
                            <Icon size={1.8} />
                          </div>
                        )}
                        {item.text}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
      {menuOpen && <Backdrop onClick={() => setMenuOpen(false)} />}
    </div>
  );
};

export default IconButton;
