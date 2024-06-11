import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { ArrowRight, Calendar, X, Clock, MapPin, Ticket } from "lucide-react";
import { useEffect, useState } from "react";

export interface ConcertProps {
  title?: string;
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
  date,
  time,
  location,
  locationLink,
  description,
  ticketLink,
  image,
}: ConcertProps) {
  const [showDescription, setShowDescription] = useState(false);
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
    <div className="card grid gap-2">
      <h2 className="flex justify-start">{title}</h2>
      {/* image */}
      {fetchedImage && <img src={fetchedImage} alt={"Image of " + title} />}
      <div className="grid gap-4 py-2">
        <div>
          {/* date, time, location, ticketLink */}
          <div className="flex flex-wrap gap-4 ">
            <div className="flex gap-1">
              <Calendar />
              {date}
            </div>
            <div className="flex gap-1">
              <Clock />
              {time}
            </div>
            <div className="flex gap-1">
              <MapPin />
              <a
                className={locationLink !== " " ? "underline" : ""}
                href={locationLink}
                target="_blank"
              >
                {location}
              </a>
            </div>

            {ticketLink && (
              <div className="flex gap-1">
                <Ticket />
                <a className="underline" href={ticketLink} target="_blank">
                  Kjøp billetter
                </a>
              </div>
            )}
            <div>
              {description && (
                <p
                  className={`${
                    showDescription || description === "" ? "hidden" : ""
                  }`}
                >
                  {description.slice(0, 150) + "..."}
                </p>
              )}
            </div>
            {description && (
              <button
                onClick={() => setShowDescription(!showDescription)}
                className={`flex underline ${
                  showDescription ? "" : "mr-1 hover:gap-1 hover:mr-0"
                }`}
              >
                <X className={`${showDescription ? "" : "hidden"}`} />
                {showDescription ? "Lukk" : "Les mer"}
                <ArrowRight className={`${showDescription ? "hidden" : ""}`} />
              </button>
            )}
          </div>
        </div>
      </div>
      {description !== "" && showDescription && (
        <p className="border-t my-4 pt-2">{description}</p>
      )}
    </div>
  );
}

export default Concert;
