import { useState } from "react";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import { Link } from "react-scroll";
import SoMe from "./SoMe";
import { useRandomColor } from "../RandomColorContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuOptions, setMenuOptions] = useState([
    { name: "Hjem", link: "home" },
    { name: "Om oss", link: "about" },
    { name: "Musikk", link: "music" },
    { name: "Konserter", link: "concerts" },
    { name: "Kontakt", link: "footer" },
  ]);
  const logos = [logo1, logo2, logo3];
  const logo = logos[1]; // just to avoid errors

  // const { randomColor, randomValue } = useRandomColor(); // random color
  // const logo = logos[randomValue]; // random logo

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function clickLink() {
    setTimeout(() => {
      closeMenu();
    }, 200); // Replace 1000 with the number of milliseconds you want to wait
  }

  return (
    <>
      <nav className="fixed h-16 sm:h-24 p-2 sm:p-4 sm:px-6 flex justify-between w-full bg-primaryBg">
        <div className="flex">
          <Link to="home" smooth={true} duration={800} offset={-100}>
            <img
              src={logo}
              alt="logo"
              className="w-12 sm:w-16 hover:scale-105 hover:cursor-pointer transition-transform"
            />
          </Link>
          <h1 className={`pt-3.5 px-4 hidden lg:flex`}>
            Det Nye Norske Storband
          </h1>
        </div>
        <div className="hidden sm:flex gap-8 p-4 text-lg">
          {menuOptions.map((option) => (
            <Link
              to={option.link}
              smooth={true}
              duration={800}
              offset={-100}
              className="navLink"
            >
              {option.name}
            </Link>
          ))}
        </div>
        <div className="sm:hidden" onClick={() => setIsMenuOpen(true)}>
          <Menu size={48} />
        </div>
      </nav>
      {isMenuOpen && (
        <div className="menuOpen">
          {/* logo and cross */}
          <div className="h-16 p-2 flex justify-between w-full">
            <img src={logo} alt="logo" className="w-12" />
            <div className="flex justify-end">
              <X size={50} className="stroke-white" onClick={closeMenu} />
            </div>
          </div>

          {/* mobile menu */}
          <div className="p-3 pt-0">
            <ul className="text-5xl text-white grid gap-3">
              {menuOptions.map((option) => (
                <Link
                  to={option.link}
                  smooth={true}
                  duration={800}
                  offset={-100}
                  className="hover:underline"
                  onClick={clickLink}
                >
                  {option.name}
                </Link>
              ))}
            </ul>
          </div>
          <div className="absolute bottom-4 w-full px-8">
            <div className="flex justify-between gap-4">
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
