import React, { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore"; // Import DocumentData
import { db } from "../firebase";
import Concert, { ConcertProps } from "./Concert";
import { set } from "firebase/database";

interface Props {
  nextOnly?: boolean;
  past?: boolean;
  upcoming?: boolean;
  id: string;
}

function Concerts({ nextOnly, past, upcoming, id }: Props) {
  const [concertData, setConcertData] = useState<DocumentData[]>([]);
  const [upcomingConcerts, setUpcomingConcerts] = useState<ConcertProps[]>([]);
  const [pastConcerts, setPastConcerts] = useState<ConcertProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Concerts"));
        const concertData = querySnapshot.docs.map((doc) =>
          doc.data()
        ) as DocumentData[];
        setConcertData(concertData);
        filterConcertData(concertData); // Call filterConcertData after data is fetched
      } catch (error) {
        console.error(
          "Error connecting to Firestore or accessing Storage:",
          error
        );
      }
    };

    fetchData();
  }, []); // Dependency on imagesRef to re-fetch data when the image changes

  // Filter concertData into nextConcert, upcomingConcerts and pastConcerts
  function filterConcertData(concertData: DocumentData[]) {
    // Filter upcoming concerts
    const upcomingConcerts = concertData.filter((concert) => {
      const concertDate = new Date(concert.date.toDate());
      const today = new Date();
      return concertDate > today;
    });

    // Filter past concerts
    const pastConcerts = concertData.filter((concert) => {
      const concertDate = new Date(concert.date.toDate());
      const today = new Date();
      return concertDate < today;
    });

    upcomingConcerts.forEach((concert) => {
      setUpcomingConcerts((c) =>
        c.concat({
          title: concert.title.toString(),
          date: concert.date.toDate().toLocaleDateString(),
          time: concert.date.toDate().toLocaleTimeString().slice(0, -3),
          location: concert.location,
          locationLink: concert.locationLink,
          ticketLink: concert.ticketLink,
          description: concert.description,
        })
      );
    });

    pastConcerts.forEach((concert) => {
      setPastConcerts((c) =>
        c.concat({
          title: concert.title,
          date: concert.date.toDate().toLocaleDateString("no-NO"),
          location: concert.location,
        })
      );
    });
  }

  return (
    <div>
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
      {upcoming && (
        <div>
          <h1>Upcoming concerts</h1>

          {upcomingConcerts.map((concert) => (
            <div className="m-4">
              <Concert {...concert} />
            </div>
          ))}
        </div>
      )}
      {past && (
        <div>
          <h1>Past concerts</h1>
          <ul>
            {pastConcerts.map((concert) => (
              <li>
                <div className="flex gap-8">
                  <p>{concert.title}</p>
                  <p>{concert.location}</p>
                  <p>{concert.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Render other necessary components */}
    </div>
  );
}

export default Concerts;
