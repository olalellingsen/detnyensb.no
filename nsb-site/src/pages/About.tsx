import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import aboutImg from "..//assets/images/about.jpg";
import MembersCollage from "../components/MembersCollage";

function About() {
  const [bioParagraphs, setBioParagraphs] = useState([]);

  // Fetch about text and image URL from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch text data from Firestore
        const querySnapshot = await getDocs(collection(db, "About"));
        const bioData = querySnapshot.docs.map((doc) => doc.data())[0];
        setBioParagraphs(bioData.Text.split("\n"));
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
    <section className="mainContent">
      <h1>Om oss</h1>
      <div className="grid gap-4">
        <div className="pt-4 grid gap-4">
          <img src={aboutImg} alt="About picture" />
        </div>

        <div>
          {bioParagraphs.map((paragraph, index) => (
            <p className="my-4" key={index}>
              {paragraph}
            </p>
          ))}
        </div>

        <MembersCollage />
      </div>
    </section>
  );
}

export default About;
