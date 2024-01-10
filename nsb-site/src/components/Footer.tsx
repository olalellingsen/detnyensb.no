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
    <div className="mt-4 py-4 px-4 sm:text-center bg-primary text-white">
      <h3>Våre samarbeidspartnere:</h3>
      <div className="underline font-extralight py-4 grid sm:grid-cols-3 lg:grid-cols-6">
        <a href="https://www.homeworkspace.no/">Home Workspace</a>

        <a href="https://sparebankstiftelsen.no/">Sparebankstiftelsen</a>

        <a href="https://ostnorsk.jazzinorge.no/">Østnorsk Jazzsenter</a>

        <a href="https://jazzforum.jazzinorge.no/">Norsk Jazzforum</a>

        <a href="https://www.kulturdirektoratet.no/">Kulturdirektoratet</a>

        <a href="https://www.oslo.kommune.no/etater-foretak-og-ombud/kulturetaten/#gref">
          Oslo Kommune
        </a>
      </div>
      {/* <div className="p-4 grid px-12 justify-center gap-5 sm:flex flex-wrap">
        <div className="flex gap-2">
          <img src={homeworkspace} alt="Home Workspace" width={100} />
          <img src={sbs} alt="Spareba<nkstiftelsen" width={100} />
        </div>
        <img src={kulturradet} alt="Kulturrådet" width={200} />
        <img src={norskjazzforum} alt="Norsk jazzforum" width={200} />
        <img src={ostnorsk} alt="Østnorsk jazzsenter" width={200} />
        <img src={oslokommune} alt="Oslo kommune" width={200} />
      </div> */}
      <p>© 2023 Det Nye Norske Storband</p>
    </div>
  );
}

export default Footer;
