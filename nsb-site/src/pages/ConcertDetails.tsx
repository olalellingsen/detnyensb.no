import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ConcertProps } from "../components/Concert";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

function ConcertDetails() {
  const { id } = useParams();
  const [fetchedImage, setFetchedImage] = useState<string | null>(null);
  const [concertDetails, setConcertDetails] = useState<ConcertProps | null>(
    null
  );

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
          };
          setConcertDetails(concertData as ConcertProps);

          if (data.image) {
            const storage = getStorage();
            const imgRef = ref(storage, `Concerts/${data.image}`);
            const url = await getDownloadURL(imgRef);
            setFetchedImage(url);
          }
        } else {
          console.error("No such document!");
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
    <div className="mainContent">
      <h1>{concertDetails.title}</h1>
      <br />
      {fetchedImage && (
        <img src={fetchedImage} alt={"Image of " + concertDetails.title} />
      )}

      <div className="py-8 flex justify-between">
        <div>
          <h2 className="font-bold text-primary">
            {concertDetails.date} kl {concertDetails.time}
          </h2>
          <a
            href={concertDetails.locationLink}
            target="blank"
            className="hover:underline text-primary"
          >
            <p>{concertDetails.location}</p>
          </a>
        </div>
        <a href={concertDetails.ticketLink} target="blank">
          <button className="btn1">Kjøp billetter</button>
        </a>
      </div>

      <p>{concertDetails.description}</p>
    </div>
  );
}

export default ConcertDetails;
