import React from "react";
import imageSrc from "../assets/images/about.jpg";
import about from "../../public/about.json";

function About() {
  return (
    <div className="h-full">
      <h1 className="border-b">Om oss</h1>
      <div className="pt-4 grid gap-4 mx-auto md:w-4/5 xl:w-2/3">
        <img src={imageSrc} alt="About picture" />
        <p>{about[0]}</p>
        <p>{about[1]}</p>
        <p>{about[2]}</p>
      </div>
    </div>
  );
}

export default About;
