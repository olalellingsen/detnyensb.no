import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import logo from "../assets/logo2.png";
import { Link } from "react-router-dom";
import SoMe from "./SoMe";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuOptions] = useState([
    { label: "Hjem", path: "/" },
    { label: "Om oss", path: "/about" },
    { label: "Musikere", path: "/members" },
    { label: "Media", path: "/media" },
    { label: "Utgivelser", path: "/music" },
    { label: "Konserter", path: "/concerts" },
  ]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function clickLink() {
    setTimeout(() => {
      closeMenu();
    }, 200);
  }

  return (
    <>
      <nav className="fixed h-16 p-2 lg:px-6 flex justify-between w-full bg-primaryBg z-10">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-12 hover:scale-105 hover:cursor-pointer transition-transform"
          />
        </Link>
        <div className="flex">
          <h2 className="text-lg xs:text-2xl text-center my-auto sm:hidden">
            Det Nye Norske Storband
          </h2>
          <h1 className="hidden sm:block lg:fixed lg:left-24 mt-1.5">
            Det Nye Norske Storband
          </h1>
        </div>

        <div className="hidden lg:flex gap-6 pt-2 text-lg">
          {menuOptions.map((option) => (
            <Link to={option.path} key={option.label} className="navLink">
              {option.label}
            </Link>
          ))}
        </div>
        <div className="lg:hidden" onClick={() => setIsMenuOpen(true)}>
          <Menu
            size={40}
            strokeWidth={1}
            className="stroke-primary h-full hover:cursor-pointer"
          />
        </div>
      </nav>
      {isMenuOpen && (
        <div className="menuOpen z-50">
          {/* logo and cross */}
          <div className="h-16 p-2 lg:px-6 flex justify-between w-full">
            <Link to="/" onClick={closeMenu}>
              <img
                src={logo}
                alt="logo"
                className="w-12 hover:cursor-pointer"
              />
            </Link>
            <div className="flex justify-end">
              <X
                size={40}
                strokeWidth={1}
                className="stroke-white h-full hover:cursor-pointer"
                onClick={closeMenu}
              />
            </div>
          </div>

          {/* mobile menu */}
          <div className="pt-8 text-center font-extralight">
            <ul className="text-5xl text-white grid gap-4">
              {menuOptions.map((option) => (
                <Link
                  to={option.path}
                  className="hover:underline hover:cursor-pointer"
                  onClick={clickLink}
                >
                  {option.label}
                </Link>
              ))}
            </ul>
          </div>
          <div className="absolute bottom-6 w-full">
            <div className="flex justify-center gap-8">
              <SoMe face={true} size={50} />
              <SoMe insta={true} size={50} />
              <SoMe yt={true} size={50} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
