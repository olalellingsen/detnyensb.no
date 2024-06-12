import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import LazyImage from "../components/LazyImage";
import aboutImg from "..//assets/images/about.jpg";

function About() {
  const [bio1, setBio1] = useState("");
  const [bio2, setBio2] = useState("");
  const [bio3, setBio3] = useState("");

  // Fetch about text and image URL from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch text data from Firestore
        const querySnapshot = await getDocs(collection(db, "About"));
        const bioData = querySnapshot.docs.map((doc) => doc.data())[0];

        setBio1(bioData.P1);
        setBio2(bioData.P2);
        setBio3(bioData.P3);
      } catch (error) {
        console.error(
          "Error connecting to Firestore or accessing Storage:",
          error
        );
      }
    };

    // Call the function to fetch data
    fetchData();
  }, []); // Dependency on imagesRef to re-fetch data when the image changes

  return (
    <div className="mainContent">
      <h1 className="border-b">Om oss</h1>
      <div className="pt-4 grid gap-4">
        <LazyImage src={aboutImg} alt="About picture" />
        <p>{bio1}</p>
        <p>{bio2}</p>
        <p>{bio3}</p>
      </div>
    </div>
  );
}

export default About;
