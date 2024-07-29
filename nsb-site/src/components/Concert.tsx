import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface ConcertProps {
  id: string;
  title?: string;
  subtitle?: string;
  image?: string;
  date?: string;
  time?: string;
  location?: string;
  locationLink?: string;
  ticketLink?: string;
  description?: string;
}

function Concert({
  title,
  subtitle,
  date,
  id,
  time,
  location,
  locationLink,
  description,
  ticketLink,
  image,
}: ConcertProps) {
  const [fetchedImage, setFetchedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (image) {
        try {
          const storage = getStorage();
          const imgRef = ref(storage, `Concerts/${image}`);
          // Fetch image URL from Firebase Storage
          const url = await getDownloadURL(imgRef);
          setFetchedImage(url);
        } catch (error) {
          console.error(
            "Error connecting to Firestore or accessing Storage:",
            error
          );
        }
      }
    };

    fetchData();
  }, [image]);

  return (
    <div className="bg-primary text-white">
      {fetchedImage && <img src={fetchedImage} alt={"Image of " + title} />}

      <div className="p-4 grid gap-4">
        <p>{date}</p>

        <h2 className="flex justify-start">{title}</h2>

        {subtitle && <h3>{subtitle}</h3>}

        <div className="flex gap-4">
          {ticketLink && (
            <a href={ticketLink} target="_blank">
              <button className="btn2">Kjøp billetter</button>
            </a>
          )}
          <Link to={`/concert/${id}`} className="underline my-2">
            Les mer
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Concert;
