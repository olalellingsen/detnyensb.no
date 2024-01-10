import React, { useState } from "react";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-scroll";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed h-24 p-4 sm:px-6 flex justify-between w-full bg-white">
        <div className="flex">
          <img src={logo} alt="logo" className="bandLogo" />
          <h1 className="pt-3.5 px-4 hidden lg:flex">
            Det Nye Norske Storband
          </h1>
        </div>
        <div className="hidden sm:flex gap-8 p-4 text-lg">
          <Link
            to="home"
            smooth={true}
            duration={800}
            offset={-100}
            className="hover:underline hover:cursor-pointer"
          >
            Hjem
          </Link>
          <Link
            to="about"
            smooth={true}
            duration={800}
            offset={-100}
            className="hover:underline hover:cursor-pointer"
          >
            Om oss
          </Link>
          <Link
            to="music"
            smooth={true}
            duration={800}
            offset={-100}
            className="hover:underline hover:cursor-pointer"
          >
            Musikk
          </Link>
          <Link
            to="concerts"
            smooth={true}
            duration={800}
            offset={-100}
            className="hover:underline hover:cursor-pointer"
          >
            Kalender
          </Link>
          <Link
            to="contact"
            smooth={true}
            duration={800}
            offset={-100}
            className="hover:underline hover:cursor-pointer"
          >
            Kontakt
          </Link>
        </div>
        <div className="sm:hidden pt-2" onClick={() => setIsMenuOpen(true)}>
          <Menu size={50} />
        </div>
      </nav>
      {isMenuOpen && (
        <div className="fixed sm:hidden top-0 left-0 w-screen h-screen bg-primary">
          {/* logo and cross */}
          <div className="h-24 p-4 flex justify-between w-full">
            <img src={logo} alt="logo" className="bandLogo" />
            <div className="flex justify-end pt-2">
              <X size={50} className="stroke-white" onClick={closeMenu} />
            </div>
          </div>

          {/* menu */}
          <div className="p-6">
            <ul className="text-5xl text-white grid gap-4">
              <Link
                to="home"
                smooth={true}
                duration={800}
                offset={-100}
                onClick={closeMenu}
              >
                Hjem
              </Link>
              <Link
                to="about"
                smooth={true}
                duration={800}
                offset={-100}
                onClick={closeMenu}
              >
                Om oss
              </Link>
              <Link
                to="music"
                smooth={true}
                duration={800}
                offset={-100}
                onClick={closeMenu}
              >
                Musikk
              </Link>
              <Link
                to="concerts"
                smooth={true}
                duration={800}
                offset={-100}
                onClick={closeMenu}
              >
                Kalender
              </Link>
              <Link
                to="contact"
                smooth={true}
                duration={800}
                offset={-100}
                onClick={closeMenu}
              >
                Kontakt
              </Link>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
