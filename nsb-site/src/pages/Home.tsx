import React from "react";
import Concerts from "../components/Concerts";
import homeImage from "../assets/images/home.jpg";

function Home() {
  return (
    <div className="h-full px-2">
      <h1 className="text-3xl text-center">Det Nye Norske Storband</h1>
      <img src={homeImage} alt="" />
      <div className="mt-8">
        <h2 className="flex justify-center my-2">Neste konsert:</h2>
        <Concerts nextConcertOnly />
      </div>
    </div>
  );
}

export default Home;
