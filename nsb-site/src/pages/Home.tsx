import homeImage from "../assets/images/home.jpg";
import News from "../components/News";
import Concerts from "./Concerts";

function Home() {
  return (
    <>
      <img src={homeImage} alt="" className="object-cover h-screen w-full" />

      <div className="px-2 md:px-24 xl:px-40 2xl:px-72 pb-8">
        <div className="grid lg:grid-cols-2 gap-4 ">
          <div>
            <h2 className="py-2 text-center lg:text-start">Neste konsert</h2>
            <Concerts nextOnly={true} />
          </div>
          <div>
            <h2 className="py-2 text-center lg:text-start">Nyheter</h2>
            <News />
          </div>
        </div>

        <br />

        <iframe
          src="https://www.youtube.com/embed/DC63I9B3K9g?autoplay=1&mute=1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="w-full aspect-video rounded-lg"
        ></iframe>
      </div>
    </>
  );
}

export default Home;
