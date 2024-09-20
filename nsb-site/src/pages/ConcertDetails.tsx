import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Concert } from "../types";

function ConcertDetails() {
  const { id } = useParams();
  const [concertDetails, setConcertDetails] = useState<Concert | null>(null);

  useEffect(() => {
    const fetchConcertDetails = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, "Concerts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Convert Firestore Timestamp to JavaScript Date
          const concertData = {
            ...data,
            date: data.date.toDate().toLocaleDateString(), // Convert to readable date string
            time: data.date.toDate().toLocaleTimeString().slice(0, -3), // Convert to readable time string

            // Convert Spotify URL to embed URL
            spotify: data.spotify.replace(
              "https://open.spotify.com/artist/",
              "https://open.spotify.com/embed/artist/"
            ),
          };
          setConcertDetails(concertData as Concert);
        }
      } catch (error) {
        console.error("Error fetching concert details:", error);
      }
    };

    fetchConcertDetails();
  }, [id]);

  if (!concertDetails) {
    return <div className="h-screen">Loading...</div>;
  }

  return (
    <section className="mainContent grid gap-4">
      <h1>{concertDetails.title}</h1>

      {concertDetails.imageURL && (
        <img
          src={concertDetails.imageURL}
          alt={"Image of " + concertDetails.title}
        />
      )}

      <div className="p-2 py-4 text-center">
        <h2 className="font-bold text-primary">
          {concertDetails.date.toString()} kl {concertDetails.time}
        </h2>
        <h3>
          <a
            href={concertDetails.locationLink}
            target="blank"
            className="hover:underline text-primary"
          >
            {concertDetails.location}
          </a>
        </h3>
        <br />
        <a href={concertDetails.ticketLink} target="blank">
          <button className="btn1">Kjøp billetter</button>
        </a>
      </div>

      <p>{concertDetails.description}</p>

      {concertDetails.spotify && (
        <iframe
          src={concertDetails.spotify}
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      )}

      {concertDetails.youtube && (
        <iframe
          src={concertDetails.youtube}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="w-full aspect-video py-2"
        ></iframe>
      )}
    </section>
  );
}

export default ConcertDetails;
