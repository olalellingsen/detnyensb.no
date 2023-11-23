import React from "react";
import { Menu } from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="fixed h-24 p-4 flex justify-between w-full">
        <img src={logo} alt="logo" className="bandLogo" />
        <h1 className="hidden">Det Nye Norske Storband</h1>
        <div className="hidden sm:flex gap-8 p-4 text-lg">
          <ul>Hjem</ul>
          <ul>Om oss</ul>
          <ul>Musikk</ul>
          <ul>Kontakt</ul>
        </div>
        <Menu className="sm:hidden w-16 h-16" />
      </nav>
    </>
  );
}

export default Navbar;
