import { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore"; // Import DocumentData
import { db } from "../firebase";
import Concert, { ConcertProps } from "./Concert";
import { ArrowDown, ArrowRight } from "lucide-react";

interface Props {
  nextOnly?: boolean;
  id: string;
}

function Concerts({ nextOnly, id }: Props) {
  const [concertData, setConcertData] = useState<DocumentData[]>([]);
  const [upcomingConcerts, setUpcomingConcerts] = useState<ConcertProps[]>([]);
  const [pastConcerts, setPastConcerts] = useState<ConcertProps[]>([]);
  const [showPast, setShowPast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Concerts"));
        const newConcertData = querySnapshot.docs.map((doc) =>
          doc.data()
        ) as DocumentData[];
        setConcertData(newConcertData);
      } catch (error) {
        console.error(
          "Error connecting to Firestore or accessing Storage:",
          error
        );
      }
    };

    fetchData();
  }, [id]); // Add 'id' as a dependency to refetch data when 'id' changes

  useEffect(() => {
    filterConcertData();
  }, [concertData]); // Update the filtered data whenever concertData changes

  function filterConcertData() {
    const today = new Date();

    const upcomingConcerts = concertData
      .sort((a, b) => {
        const aDate = new Date(a.date.toDate());
        const bDate = new Date(b.date.toDate());
        return aDate.getTime() - bDate.getTime(); // Sort by nearest date
      })
      .filter((concert) => {
        const concertDate = new Date(concert.date.toDate());
        return concertDate > today;
      })
      .map((concert) => ({
        title: concert.title.toString(),
        date: concert.date.toDate().toLocaleDateString(),
        time: concert.date.toDate().toLocaleTimeString().slice(0, -3),
        location: concert.location,
        locationLink: concert.locationLink,
        ticketLink: concert.ticketLink,
        description: concert.description,
      }));

    const pastConcerts = concertData
      .sort((a, b) => {
        const aDate = new Date(a.date.toDate());
        const bDate = new Date(b.date.toDate());
        return bDate.getTime() - aDate.getTime(); // Sort in most recent order
      })
      .filter((concert) => {
        const concertDate = new Date(concert.date.toDate());
        return concertDate < today;
      })
      .map((concert) => ({
        title: concert.title,
        date: concert.date.toDate().toLocaleDateString("no-NO"),
        location: concert.location,
      }));

    // Set the state variables
    setUpcomingConcerts(upcomingConcerts);
    setPastConcerts(pastConcerts);
  }

  return (
    <div id={id}>
      {/* Render components using concertData */}
      {nextOnly && (
        <div>
          <Concert
            title={upcomingConcerts[0]?.title}
            date={upcomingConcerts[0]?.date}
            time={upcomingConcerts[0]?.time}
            location={upcomingConcerts[0]?.location}
            locationLink={upcomingConcerts[0]?.locationLink}
            description={upcomingConcerts[0]?.description}
            ticketLink={upcomingConcerts[0]?.ticketLink}
          />
        </div>
      )}
      {!nextOnly && (
        <div>
          <div>
            <h2>Kommende konserter:</h2>
            <div className="grid gap-4 md:grid-cols-2 mt-2 mx-auto 2xl:w-2/3">
              {upcomingConcerts.map((concert) => (
                <Concert {...concert} />
              ))}
            </div>
          </div>
          <div className="pt-8 mt-2 mx-auto 2xl:w-2/3">
            <button onClick={() => setShowPast(!showPast)} className="flex">
              {showPast ? (
                <>
                  <h2 className="underline">Tidligere konserter</h2>
                  <ArrowDown height={35} />
                </>
              ) : (
                <>
                  <h2 className="flex underline hover:mr-1">
                    Vis tidligere konserter
                  </h2>
                  <ArrowRight height={35} />
                </>
              )}
            </button>
            {showPast && (
              <ul className="pt-2">
                {pastConcerts.map((concert) => (
                  <li>
                    <div className="flex py-1">
                      <p>
                        {concert.date} - {concert.title} - {concert.location}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Render other necessary components */}
    </div>
  );
}

export default Concerts;
