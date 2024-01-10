import { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Concert from "../components/Concert";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Concerts from "../components/Concerts";

function Home({ id }: { id: string }) {
  const [homeImage, setHomeImage] = useState("");
  const storage = getStorage();
  const imagesRef = ref(storage, "home.jpg");

  // Fetch about text and image URL from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch image URL from Firebase Storage
        const url = await getDownloadURL(imagesRef);
        setHomeImage(url);
      } catch (error) {
        console.error(
          "Error connecting to Firestore or accessing Storage:",
          error
        );
      }
    };

    // Call the function to fetch data
    fetchData();
  }, [imagesRef]); // Dependency on imagesRef to re-fetch data when the image changes

  return (
    <div className="h-full px-2" id={id}>
      <h1 className="lg:hidden">Det Nye Norske Storband</h1>
      <img src={homeImage} alt="" className="my-4" />
      <div className="grid md:grid-cols-2">
        <div className="mt-8">
          <h2 className="flex justify-center my-2 md:justify-start">
            Neste konsert:
          </h2>
          <Concerts nextOnly={true} id="" />
        </div>
        <div>{/* Spotify player here */}</div>
      </div>
    </div>
  );
}

export default Home;
