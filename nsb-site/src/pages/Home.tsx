import React from "react";
import Concerts from "./Concerts";

function Home() {
  return (
    <div className="h-full px-2">
      <h1 className="text-3xl text-center">Det Nye Norske Storband</h1>
      <div>
        {/* <h2>Neste konsert</h2> */}
        <Concerts />
      </div>
    </div>
  );
}

export default Home;
