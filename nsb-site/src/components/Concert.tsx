import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { ArrowRight, Calendar, X } from "lucide-react";
import { Clock } from "lucide-react";
import { MapPin } from "lucide-react";
import { Ticket } from "lucide-react";
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
  const storage = getStorage();
  const img = ref(storage, "Concerts/" + image);
  const [fetchedImage, setFetchedImage] = useState("");

  // Fetch image URL from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch image URL from Firebase Storage
        const url = await getDownloadURL(img);
        setFetchedImage(url);
      } catch (error) {
        console.error(
          "Error connecting to Firestore or accessing Storage:",
          error
        );
      }
    };

    // Call the function to fetch data
    fetchData();
  }, [img]); // Dependency on img to re-fetch data when the image changes

  return (
    <div className="card grid gap-2">
      <h2 className="flex justify-start">{title}</h2>
      {/* image */}
      {image !== undefined && image !== "" && (
        <img src={fetchedImage} alt={"Image of " + title} />
      )}
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

            {ticketLink !== undefined && ticketLink !== "" && (
              <div className="flex gap-1">
                <Ticket />
                <a className="underline" href={ticketLink} target="_blank">
                  Kjøp billetter
                </a>
              </div>
            )}
            <div>
              <p
                className={`${
                  showDescription || description == "" ? "hidden" : ""
                }`}
              >
                {description?.slice(0, 150) + "..."}
              </p>
            </div>
            {description !== "" && (
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
