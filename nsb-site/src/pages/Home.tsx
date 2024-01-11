import { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Concerts from "../components/Concerts";

function Home({ id }: { id: string }) {
  const [homeImage, setHomeImage] = useState("");
  const [homeImageWide, setHomeImageWide] = useState("");
  const storage = getStorage();
  const img = ref(storage, "home.jpg");
  const imgWide = ref(storage, "homeWide.jpg");

  // Fetch about text and image URL from database
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
      <div>
        <h2 className="flex justify-center my-2">Neste konsert:</h2>
        <div className="md:w-2/3 xl:w-1/2 mx-auto">
          <Concerts nextOnly={true} id="" />
        </div>
        <div>{/* Spotify player here */}</div>
      </div>
    </div>
  );
}

export default Home;
