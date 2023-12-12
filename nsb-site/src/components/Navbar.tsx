import React, { useState } from "react";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed h-24 p-4 sm:px-6 flex justify-between w-full bg-white">
        <img src={logo} alt="logo" className="bandLogo" />
        <div className="hidden sm:flex gap-8 p-4 text-lg">
          <ul>Hjem</ul>
          <ul>Om oss</ul>
          {/* <ul>Musikk</ul> */}
          <ul>Kontakt</ul>
        </div>
        <div className="sm:hidden pt-2" onClick={() => setIsMenuOpen(true)}>
          <Menu size={50} />
        </div>
      </nav>
      {isMenuOpen && (
        <div
          className="fixed sm:hidden top-0 left-0 w-screen h-screen bg-primary"
          onClick={closeMenu}
        >
          {/* logo and cross */}
          <div className="h-24 p-4 flex justify-between w-full">
            <img src={logo} alt="logo" className="bandLogo" />
            <div className="flex justify-end pt-2">
              <X size={50} className="stroke-white" />
            </div>
          </div>

          {/* menu */}
          <div className="p-6">
            <ul className="text-5xl text-white grid gap-2">
              <li onClick={closeMenu}>Hjem</li>
              <li onClick={closeMenu}>Om oss</li>
              {/* <li onClick={closeMenu}>Kalender</li> */}
              {/* <li onClick={closeMenu}>Musikk</li> */}
              <li onClick={closeMenu}>Kontakt</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
