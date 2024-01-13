import { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Concerts from "../components/Concerts";
import News from "../components/News";

function Home({ id }: { id: string }) {
  const [homeImage, setHomeImage] = useState("");
  const [homeImageWide, setHomeImageWide] = useState("");
  const storage = getStorage();
  const img = ref(storage, "home.jpg");
  const imgWide = ref(storage, "homeWide.jpg");

  // Fetch image URL from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch image URL from Firebase Storage
        const url = await getDownloadURL(img);
        const urlWide = await getDownloadURL(imgWide);
        setHomeImage(url);
        setHomeImageWide(urlWide);
      } catch (error) {
        console.error(
          "Error connecting to Firestore or accessing Storage:",
          error
        );
      }
    };

    // Call the function to fetch data
    fetchData();
  }, [img, imgWide]); // Dependency on img to re-fetch data when the image changes

  return (
    <div className="h-full" id={id}>
      <h1 className="lg:hidden">Det Nye Norske Storband</h1>
      <img src={homeImage} alt="" className="my-4 sm:hidden" />
      <img src={homeImageWide} alt="" className="my-4 hidden sm:block" />

      {/* Next concert and news */}
      <div className="grid gap-4 lg:grid-cols-2 mx-auto md:w-4/5 lg:mx-0 lg:w-full">
        <div>
          <h2 className="py-2">Neste konsert</h2>
          <Concerts nextOnly={true} id="" />
        </div>
        <div>
          <h2 className="py-2">Nyheter</h2>
          <News />
        </div>
      </div>
    </div>
  );
}

export default Home;
