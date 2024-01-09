import React, { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore"; // Import DocumentData
import { db } from "../firebase";
import Concert, { ConcertProps } from "./Concert";
import { set } from "firebase/database";

interface Props {
  nextOnly?: boolean;
  past?: boolean;
  upcoming?: boolean;
}

function Concerts({ nextOnly, past, upcoming }: Props) {
  const [concertData, setConcertData] = useState<DocumentData[]>([]); // Set the type to DocumentData array
  const [upcomingConcerts, setUpcomingConcerts] = useState<ConcertProps[]>([]);
  const [pastConcerts, setPastConcerts] = useState<ConcertProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Concerts"));
        const concertData = querySnapshot.docs.map((doc) =>
          doc.data()
        ) as DocumentData[]; // Cast to DocumentData[]
        setConcertData(concertData);
      } catch (error) {
        console.error(
          "Error connecting to Firestore or accessing Storage:",
          error
        );
      }
    };
    fetchData();
    filterConcertData();
  }, []); // Dependency on imagesRef to re-fetch data when the image changes

  // Filter concertData into nextConcert, upcomingConcerts and pastConcerts
  function filterConcertData() {
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
            <Concert {...concert} />
          ))}
        </div>
      )}
      {past && (
        <div>
          <h1>Past concerts</h1>
        </div>
      )}
      {/* Render other necessary components */}
    </div>
  );
}

export default Concerts;
