import { useEffect, useState } from "react";
import homeImage from "../assets/images/home.jpg";
import News from "../components/News";
import Concerts from "./Concerts";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Link } from "react-router-dom";

function Home() {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storage = getStorage();
        const videoUrl = await getDownloadURL(ref(storage, "Videos/promo.mp4"));
        setVideoUrl(videoUrl);
      } catch (error) {
        console.error(
          "Error connecting to Firestore or accessing Storage:",
          error
        );
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <img
        src={homeImage}
        alt="Home"
        className="object-cover h-screen w-full sm:hidden"
      />

      <div className="h-screen w-full bg-black hidden sm:block">
        {videoUrl && (
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            className="object-cover h-screen w-full"
          />
        )}
      </div>

      <div className="p-2 lg:w-4/5 xl:w-[1000px] mx-auto pb-8">
        <div className="grid lg:grid-cols-2 gap-4">
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
        <h2 className="py-2 text-center lg:text-start">Spotify</h2>
        <iframe
          src="https://open.spotify.com/embed/artist/07RkGtZNwFOTFyVFEw4cMY?utm_source=generator&theme=0"
          width="100%"
          height="500"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
        <br />
        <div className="flex justify-center">
          <Link to="/music">
            <button>Se alle utgivelser</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
