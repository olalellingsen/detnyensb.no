import React from "react";
import { Link } from "react-router-dom";
import homeworkspace from "../assets/images/sponsor-icons/homeworkspace.png";
import kulturradet from "../assets/images/sponsor-icons/kulturrådet.png";
import norskjazzforum from "../assets/images/sponsor-icons/norsk-jazzforum.png";
import ostnorsk from "../assets/images/sponsor-icons/ostnorsk-logo.png";
import sbs from "../assets/images/sponsor-icons/sbs-logo-positive.png";
import oslokommune from "../assets/images/sponsor-icons/Oslo-logo-sort-RGB.png";

function Footer() {
  return (
    <div className="bg-primary/20">
      {/* <div className="flex flex-wrap">
        <img src={homeworkspace} alt="Home Workspace" />
        <img src={sbs} alt="Sparebankstiftelsen" />
        <img src={kulturradet} alt="Kulturrådet" />
        <img src={norskjazzforum} alt="Norsk jazzforum" />
        <img src={ostnorsk} alt="Østnorsk jazzsenter" />
        <img src={oslokommune} alt="Oslo kommune" />
      </div> */}
      <p className="text-center">© 2023 Det Nye Norske Storband</p>
    </div>
  );
}

export default Footer;
