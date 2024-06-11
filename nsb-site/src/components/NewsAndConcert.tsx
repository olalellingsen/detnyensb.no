import Concerts from "../pages/Concerts";
import News from "./News";

function NewsAndConcert() {
  return (
    <div className="grid gap-4 lg:grid-cols-2 mx-auto md:w-4/5 lg:mx-0 lg:w-full">
      <div>
        <h2 className="py-2 text-center lg:text-start">Neste konsert</h2>
        <Concerts nextOnly={true} id="" />
      </div>
      <div>
        <h2 className="py-2 text-center lg:text-start">Nyheter</h2>
        <News />
      </div>
    </div>
  );
}

export default NewsAndConcert;
