import { useEffect, useState } from "react";
import imageSrc from "../assets/images/about.jpg";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { set } from "firebase/database";

function About() {
  const [bio1, setBio1] = useState("");
  const [bio2, setBio2] = useState("");
  const [bio3, setBio3] = useState("");

  // Fetch about text from database

  useEffect(() => {
    const checkFirestoreConnection = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "About"));
        const bioData = querySnapshot.docs.map((doc) => doc.data())[0];

        console.log("About text fetched from database");

        setBio1(bioData.P1);
        setBio2(bioData.P2);
        setBio3(bioData.P3);
      } catch (error) {
        console.error("Error connecting to Firestore:", error);
      }
    };

    // Call the function to check connection
    checkFirestoreConnection();
  }, []); // Empty dependency array ensures the useEffect runs only once on mount

  return (
    <div className="h-full">
      <h1 className="border-b">Om oss</h1>
      <div className="pt-4 grid gap-4 mx-auto md:w-4/5 xl:w-2/3">
        <img src={imageSrc} alt="About picture" />
        <p>{bio1}</p>
        <p>{bio2}</p>
        <p>{bio3}</p>
      </div>
    </div>
  );
}

export default About;
